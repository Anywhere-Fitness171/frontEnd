import './App.css';
import {BrowserRouter as Route, Switch, Link} from 'react-router-dom';
import Registration from './Components/Registration';
import {useState, useEffect } from 'react';
import fitPhoto from './Assets/workout-photo.jpg';
import { UserSchema, ClassSchema } from './Components/Schemas';
import * as yup from 'yup';
import Class from './Components/Class';
import LoginForm from './Components/Login';

// Component where Instructor can see it's individually created classes.
// Component where one can see a list of all created classes This component has the ability to register for the classes. 
// Work on error validation in Class Schema
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
  const classErrors={
    name:'',
    type:'',
    date_time:'',
    duration:'',
    intensity:'',
    location:'',
    max_size:''
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
  const [errorsClass, setErrorsClass]= useState(classErrors)
  const [disabled, setDisabled]=useState(true);
  const [classForm, setClassForm]=useState(classFormat)
  
// Validate User Registration Errors 
  const validateFormErrors = (name, value ) => {
    yup.reach(UserSchema, name).validate(value)
    .then(() => setErrors({...errors, [name]:''}))
    .catch((error) => setErrors({...errors,[name]: error.errors[0]}))
  }
  useEffect(() => {
    UserSchema.isValid(userForm).then(valid => setDisabled(!valid))
  },[userForm])

  // Validate Class Creation Errors 

  const validateClassErrors = (name, value ) => {
    yup.reach(ClassSchema, name).validate(value)
    .then(() => setErrorsClass({...errorsClass, [name]:''}))
    .catch((error) => setErrorsClass({...errorsClass,[name]: error.errors[0]}))
  }
  useEffect(() => {
    ClassSchema.isValid(classForm).then(valid => setDisabled(!valid))
  },[classForm])

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
        <Route exact path='/'> <App/> </Route>
        <Route  path='/class'>
          <Class 
            form={classForm} 
            setForm={setClassForm} 
            formReset={classFormat}
            checkErrors={validateClassErrors}/>
        </Route> {/*Temporary Placement for testing Accessing Component*/}
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