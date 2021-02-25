import React from 'react'; 
// import axios from 'axios'; 

export default function Registration({form, setForm}){

const onChange= event =>{
    const{name, value, type } = event.target
    setForm(...form)
}

    return(
        <div>
            <h1>Registration</h1>
            <form>
                <label> Name
                    <input 
                    type="text"
                    name="name"
                    value={form.name}
                    />
                </label>
                <label> Username
                    <input 
                    type="text"
                    name="username"
                    value={form.username}
                    />
                </label>
                <label> Email
                    <input 
                    type="email"
                    name="email"
                    value={form.email}
                    />
                </label>
                <label> Password
                    <input 
                    type="password"
                    name="password"
                    value={form.password}
                    />
                </label>
                <label> Role
                    <select name="role" 
                    value={form.role}>
                        <option value="">---Please Select your Role---</option>
                        <option value="client">Client</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </label>
            </form>
        </div>
    )
}