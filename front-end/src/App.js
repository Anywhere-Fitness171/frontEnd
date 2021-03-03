import './App.css';
import {BrowserRouter as Route, Switch, Link} from 'react-router-dom';
import Registration from './Components/Registration';
import {useState, useEffect } from 'react';
import fitPhoto from './Assets/workout-photo.jpg';
import Schema from './Components/Schema';
import * as yup from 'yup';
import Class from './Components/Class';
import LoginForm from './Components/Login';



function App() {
  const initialForm= {
    name: '',
    username:'',
    email:'',
    password:'',
    role:''
  }
  const formErrors={
    name: '',
    username:'',
    email:'',
    password:'',
    role:''
  }
  const classFormat={
    name:'',
    type:'',
    date_time:'',
    duration:'',
    intensity:'',
    location:'',
    max_size:''
// `Current number of registered attendees`
  }
// Slices of State 
  const [userForm, setUserForm]= useState(initialForm); // State to handle Form
  const [users, setUsers]= useState([]); // State to keep track of users. Type ARRAY
  const [errors, setErrors]= useState(formErrors);
  const [disabled, setDisabled]=useState(true);
  const [classForm, setClassForm]=useState(classFormat)
  const [classes, setClasses]=useState([]);
  

  const validateFormErrors = (name, value ) => {
    yup.reach(Schema, name).validate(value)
    .then(() => setErrors({...errors, [name]:''}))
    .catch((error) => setErrors({...errors,[name]: error.errors[0]}))
  }
  useEffect(() => {
    Schema.isValid(userForm).then(valid => setDisabled(!valid))
  },[userForm])

  return (
    <div className="App">
       <h1>Anywhere Fitness</h1>
      <h2>Fitness NOW? Fitness Anywhere...</h2>
      <img src={fitPhoto} alt="Man working out" style={{width:'40%'}}/>
      <br/>
      <br/>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <br/>
      <Link to='/class'>
       <button>Class</button> {/*Temporary Placement for testing Accessing Component*/}
      </Link>
      <br/>
      <div>
       <Link to='/login'>
          <button>Login</button>
       </Link>
        &nbsp;&nbsp;
       <Link to='/registration'>
          <button>Registration</button>
       </Link>
      </div>
      <Switch>
        <Route exact path='/'> </Route>
        <Route  path='/class'><Class form={classForm} setForm={setClassForm} classes={classes} setClases={setClasses}formReset={classFormat}/></Route> {/*Temporary Placement for testing Accessing Component*/}
        <Route exact path='/registration/'> 
          <div style={{color: 'red'}}> 
            <div>{errors.name}</div><div>{errors.username}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.role}</div>
          </div>
          <Registration 
          form={userForm} 
          setForm={setUserForm} 
          formReset={initialForm}
          setUsers={setUsers}
          users={users}
          checkErrors={validateFormErrors}
          disabled={disabled}
          />
        </Route>
        <Route path='/login'> <LoginForm/> </Route>
      </Switch>
    </div>
  );
}

export default App;