import axios from 'axios'; 
import {useHistory} from 'react-router-dom';

export default function Class({form,setForm,formReset, checkErrors}){
// Change Handler for updating Class Specs
const classOnChange= event =>{
    const {name, value } = event.target
    checkErrors(name,value)
    setForm({...form,[name]:value})
}
// Event Handler for Submission & Reset 
const ClassSubmit= event => {
    event.preventDefault()
    const newClass={name:form.name.trim(),
    type:form.type.trim(),
    date_time:form.date_time.trim(),
    duration:form.duration.trim(),
    intensity:form.intensity.trim(),
    location:form.location.trim(),
    max_size:form.max_size.trim()
}
    axios.post('https://anywhere-fitness-171.herokuapp.com/api/classes/', newClass) 
    .then((response) => {
        console.log(response.data);
        setForm(formReset); 
        
    })
    .catch((error) => {
        console.log(error)
    })
}
let history = useHistory();
const signOut = () =>{
    localStorage.removeItem('anywhere-fitness-token');
    localStorage.removeItem('anywhere-fitness-userid');
    history.push('/login');
} 
    return(
        <div>
            <button onClick={signOut}>Sign Out</button>
           <h1>Class Specs</h1>
            <form onSubmit={ClassSubmit}>
                <label> Class Name&nbsp;&nbsp;
                    <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={classOnChange}
                    />
                </label>
                <label> Type&nbsp;&nbsp;
                    <select name="type" 
                    value={form.type}
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
                    value={form.date_time}
                    onChange={classOnChange}
                    />
                </label>
                
                <label> Duration&nbsp;&nbsp;
                    <input 
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={classOnChange}
                    />
                </label>
                <label> Intensity&nbsp;&nbsp;
                    <select name="intensity" 
                    value={form.intensity}
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
                    value={form.location}
                    onChange={classOnChange}
                    />
                </label>
                <label> Max Class Size&nbsp;&nbsp;
                    <input 
                    type="number"
                    name="max_size"
                    value={form.max_size}
                    onChange={classOnChange}
                    />
                </label>
                <br/>
                <br/>
                &nbsp;&nbsp;
                <button style={{width:'10%', margin:'0 auto' }} >Submit!</button> 
            </form>
        </div>
    )
}