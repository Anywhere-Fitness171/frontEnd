import React from 'react'; 
import axios from 'axios'; 

export default function Registration({form, setForm, formReset,setUsers,users}){
// Change Handler 
const onChange= event =>{
    const {name, value } = event.target
    setForm({...form,[name]:value})
}
// Handle Submit
const onSubmit= event => {
    event.preventDefault()
    const newUser={name:form.name.trim(),username:form.username.trim(),email:form.email.trim(),password:form.password.trim(),role:form.role.trim()}
    axios.post(`https://reqres.in/api/users/`, newUser)
    .then((response) => {
        console.log(response.data);
        setUsers([...users, response.data])
        setForm(formReset); 
        
    })
    .catch((error) => {
        console.log(error)
    })
}

    return(
        <div>
            <h1>Registration</h1>
            <form onSubmit={onSubmit}>
                <label> Name
                    <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    />
                </label>
                <label> Username
                    <input 
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    />
                </label>
                <label> Email
                    <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    />
                </label>
                <label> Password
                    <input 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    />
                </label>
                <label> Role
                    <select name="role" 
                    value={form.role}
                    onChange={onChange}>
                        <option value="">---Please Select your Role---</option>
                        <option value="client">Client</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </label>
                <button> Submit!</button>
            </form>
        </div>
    )
}