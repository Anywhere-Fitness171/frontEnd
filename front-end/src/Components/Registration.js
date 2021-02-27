import React from 'react'; 
import axios from 'axios'; 
import styled from 'styled-components'; 

// Styling 
const FormStyle = styled.form`
display: flex; 
flex-direction: column; 
`


export default function Registration({form, setForm, formReset,checkErrors, disabled}){
// Change Handler 
const onChange= event =>{
    const {name, value } = event.target
    checkErrors(name, value)
    setForm({...form,[name]:value})
}
// Handle Submit
const onSubmit= event => {
    event.preventDefault()
    const newUser={name:form.name.trim(),username:form.username.trim(),email:form.email.trim(),password:form.password.trim(),role:form.role.trim()}
    axios.post(`https://anywhere-fitness-171.herokuapp.com/api/users/register/`, newUser) 
    .then((response) => {
        console.log(response.data);
        setForm(formReset); 
    })
    .catch((error) => {
        console.log(error)
    })
}

    return(
        <div>
            <h1>Registration</h1>
            <FormStyle onSubmit={onSubmit}>
                <label> Name&nbsp;&nbsp;
                    <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    />
                </label>
                
                <label> Username&nbsp;&nbsp;
                    <input 
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    />
                </label>
                
                <label> Email&nbsp;&nbsp;
                    <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    />
                </label>
                
                <label> Password&nbsp;&nbsp;
                    <input 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    />
                </label>
                
                <label> Role&nbsp;&nbsp;
                    <select name="role" 
                    value={form.role}
                    onChange={onChange}>
                        <option value="">---Please Select your Role---</option>
                        <option value="client">Client</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </label>
                
                <button style={{width:'10%', margin:'0 auto' }} disabled={disabled}>Submit!</button>
            </FormStyle>
        </div>
    )
}