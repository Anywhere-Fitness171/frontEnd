 import {useState, useEffect } from 'react';
import {axiosWithAuth} from '../helpers/axiosWithAuth'; 
import { ClassSchema } from './Schemas';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import Clientclass from './Clientclass';

export default function Class(){

    const classFormat={
        name:'',
        type:'',
        date_time:'',
        duration:'',
        intensity:'',
        location:'',
        max_size:''
      }
      const classErrors={
        name:'',
        type:'',
        date_time:'',
        duration:'',
        intensity:'',
        location:'',
        max_size:''
      }

      const [classForm, setClassForm]=useState(classFormat)
      const [errorsClass, setErrorsClass]= useState(classErrors)
      const [disabled, setDisabled]=useState(true);
      const [allClasses, setAllClasses] = useState([]);
      const [showUpdateButton, setShowUpdateButton] = useState(false);
      const [classId, setClassId] = useState(0);
      const [updateCards, setUpdateCards] = useState(false);
      const [totalAttendees, setTotalAttendees] = useState(0);
      const [registeredClients, setRegisteredClients] = useState([]);

      // Validate Class Creation Errors 

      const validateClassErrors = (name, value ) => {
        yup.reach(ClassSchema, name).validate(value)
        .then(() => setErrorsClass({...errorsClass, [name]:''}))
        .catch((error) => setErrorsClass({...errorsClass,[name]: error.errors[0]}))
      }
      useEffect(() => {
        ClassSchema.isValid(classForm).then(valid => setDisabled(!valid));
      },[classForm])
      
      useEffect(() => {
        axiosWithAuth().get('/classes')
        .then((response) => {
            const userId = localStorage.getItem('anywhere-fitness-userid');
            console.log(response.data);
            const items = response.data.filter((item) => (
                item.user_id === parseInt(userId)
            ));
            setAllClasses(items);
        })
        .catch((response) => {
            console.log(response.data);
        })
      },[updateCards])

    // Change Handler for updating Class Specs
const classOnChange= event =>{
    const {name, value } = event.target
    validateClassErrors(name,value)
    setClassForm({...classForm,[name]:value})
}
// Event Handler for Submission & Reset 
const ClassSubmit= event => {
    event.preventDefault();
    const userId = localStorage.getItem('anywhere-fitness-userid');
    const newClass={
        name:classForm.name.trim(),
        type:classForm.type.trim(),
        date_time:classForm.date_time.trim(),
        duration:classForm.duration.trim(),
        intensity:classForm.intensity.trim(),
        location:classForm.location.trim(),
        max_size:classForm.max_size.trim(),
        instructor_id:userId
    }   
    axiosWithAuth().post('/classes/', newClass) 
    .then((response) => {
        console.log(response.data);
        setClassForm(classFormat); 
        setUpdateCards(updateCards => !updateCards);  
    })
    .catch((error) => {
        console.log(error)
    })
}
let history = useHistory();
const signOut = () =>{
    localStorage.removeItem('anywhere-fitness-token');
    localStorage.removeItem('anywhere-fitness-userid');
    localStorage.removeItem('user-type');
    history.push('/login');
} 
const endMembership = () =>{
    const userId = localStorage.getItem('anywhere-fitness-userid');
    axiosWithAuth().delete(`/users/${userId}`)
        .then((response) => {
            console.log(response.data);
            localStorage.removeItem('anywhere-fitness-token');
            localStorage.removeItem('anywhere-fitness-userid');
            localStorage.removeItem('user-type');
            history.push('/login');
        })
        .catch((error) => {
            console.log(error);
        })
}

const setClassDetails = (classId) =>{
    const currentClass = allClasses.filter((item) =>(item.id === parseInt(classId)));
    setClassForm({
        name: currentClass[0].name,
        type: currentClass[0].type,
        date_time: currentClass[0].date_time,
        duration: currentClass[0].duration,
        intensity: currentClass[0].intensity,
        location: currentClass[0].location,
        max_size: currentClass[0].max_size
    })
    setShowUpdateButton(true);
    setClassId(classId);
    axiosWithAuth().get(`/classes/${classId}/attendeesNum`)
        .then((response) => {
            setTotalAttendees(response.data[0].attendees_amount);
        })
        .catch((error) => {
            console.log(error);
        })
    axiosWithAuth().get(`/classes/${classId}/attendees`)
        .then((response) => {
            setRegisteredClients(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const updateClassDetails = event => {
    event.preventDefault();
    const userId = localStorage.getItem('anywhere-fitness-userid');
    const currentClass ={
        name:classForm.name.trim(),
        type:classForm.type.trim(),
        date_time:classForm.date_time.trim(),
        duration:classForm.duration.trim(),
        intensity:classForm.intensity.trim(),
        location:classForm.location.trim(),
        max_size:classForm.max_size,
        instructor_id:userId
    } 
    axiosWithAuth().put(`/classes/${classId}`,currentClass)
        .then((response) => {
            console.log(response.data);
            setUpdateCards(updateCards => !updateCards);
        })
        .catch((error) => {
            console.log(error);
        })
}

const deleteClass = (classId) => {
    axiosWithAuth().delete(`/classes/${classId}`)
    .then((response) => {
        console.log(response.data);
        setUpdateCards(updateCards => !updateCards);
        setClassForm(classFormat);
    })
    .catch((error) => {
        console.log(error);
    })
}

const showSubmitButton = event =>{
    event.preventDefault();
    setShowUpdateButton(false);
    setClassForm(classFormat);
}

const userType = localStorage.getItem('user-type');
    return(
        <div>
            <button onClick={signOut}>Sign Out</button>
            <button onClick={endMembership}>End Membership</button>
            {userType === 'instructor' ?
            <div>
           <h1>Instructor Dashboard</h1>
            <form onSubmit={ClassSubmit}>
                <label> Class Name&nbsp;&nbsp;
                    <input 
                    type="text"
                    name="name"
                    value={classForm.name}
                    onChange={classOnChange}
                    />
                </label>
                <label> Type&nbsp;&nbsp;
                    <select name="type" 
                    value={classForm.type}
                    onChange={classOnChange}>
                        <option value="">---Please Select a Type---</option>
                        <option value="HIIT">HIIT</option>
                        <option value="cardio">Cardio</option>
                        <option value="dance">Dance</option>
                        <option value="yoga">Yoga</option>
                    </select>
                </label>
                <label> Start Time&nbsp;&nbsp;
                    <input 
                    type="datetime-local"
                    name="date_time"
                    value={classForm.date_time}
                    onChange={classOnChange}
                    />
                </label>
                
                <label> Duration&nbsp;&nbsp;
                    <input 
                    type="number"
                    name="duration"
                    value={classForm.duration}
                    onChange={classOnChange}
                    />
                </label>
                <label> Intensity&nbsp;&nbsp;
                    <select name="intensity" 
                    value={classForm.intensity}
                    onChange={classOnChange}>
                        <option value="">---Please Select an Intensity---</option>
                        <option value="low">Low Intensity</option>
                        <option value="moderate">Moderate Intensity</option>
                        <option value="high">High Intensity</option>
                        <option value="extreme">Extreme</option>
                    </select>
                </label>
                <label> Location&nbsp;&nbsp;
                    <input 
                    type="text"
                    name="location"
                    value={classForm.location}
                    onChange={classOnChange}
                    />
                </label>
                <label> Max Class Size&nbsp;&nbsp;
                    <input 
                    type="number"
                    name="max_size"
                    value={classForm.max_size}
                    onChange={classOnChange}
                    />
                </label>
                <div className="row">
                    { totalAttendees > 0 ?
                        <div className="column">
                            <p>Total Num of Attendees:</p> 
                            <strong>{totalAttendees}</strong>
                        </div>
                        :
                        <span></span>
                    }
                    <div className="column">
                    {
                        showUpdateButton ?
                        <div>
                            <button onClick={updateClassDetails}>Update!</button> 
                            <br/>
                            <button onClick={showSubmitButton}>Add New Class!</button> 
                        </div>
                        :
                        <div>
                            <br/>
                            <button disabled={disabled}>Submit!</button> 
                        </div>
                    }
                    </div>
                    {
                        registeredClients.length > 0 ?
                        <div className="column">
                            <p>Registered Clients:</p>
                            {registeredClients.map((item,index) => (
                                <li className="attendeeNames" key={index}>{item.attendee_name}</li>
                            ))}
                        </div>
                        :
                        <span></span>
                    }
                </div>
            </form>
            <div>
                <h3>Your Classes</h3>
                <div className="cards">
                {
                    allClasses.map((item,index) => (
                        <div className="card instructorCard" key={index} onClick={() => setClassDetails(item.id)}>
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                            <p>{item.date_time}</p>
                            <p>{item.duration}</p>
                            <p>{item.location}</p>
                            <button onClick={() => deleteClass(item.id)}>Delete</button>
                        </div>
                    ))
                }
                </div>
            </div>
            </div>:
            <div><Clientclass/></div>
            }
        </div>
    )
}