import axios from 'axios'; 
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

      // Validate Class Creation Errors 

      const validateClassErrors = (name, value ) => {
        yup.reach(ClassSchema, name).validate(value)
        .then(() => setErrorsClass({...errorsClass, [name]:''}))
        .catch((error) => setErrorsClass({...errorsClass,[name]: error.errors[0]}))
      }
      useEffect(() => {
        ClassSchema.isValid(classForm).then(valid => setDisabled(!valid))
      },[classForm])
    

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
        instructor:userId
    }   
    axios.post('https://anywhere-fitness-171.herokuapp.com/api/classes/', newClass) 
    .then((response) => {
        console.log(response.data);
        setClassForm(classFormat); 
        
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
                <br/>
                <br/>
                &nbsp;&nbsp;
                <button style={{width:'10%', margin:'0 auto' }}  disabled={disabled}>Submit!</button> 
            </form>
            </div>:
            <div><Clientclass/></div>
            }
        </div>
    )
}