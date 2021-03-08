import './App.css';
import {Route, Switch, Link} from 'react-router-dom';
import Registration from './Components/Registration';
import {useState, useEffect } from 'react';
import { UserSchema } from './Components/Schemas';
import * as yup from 'yup';
import Class from './Components/Class';
import LoginForm from './Components/Login';
import PrivateRoute from './Utils/PrivateRoute';
import Home from './Components/Home';



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
  

  
// Slices of State 
  const [userForm, setUserForm]= useState(initialForm); // State to handle Form
  const [errors, setErrors]= useState(formErrors);
  const [disabled, setDisabled]=useState(true);
  
  
// Validate User Registration Errors 
  const validateFormErrors = (name, value ) => {
    yup.reach(UserSchema, name).validate(value)
    .then(() => setErrors({...errors, [name]:''}))
    .catch((error) => setErrors({...errors,[name]: error.errors[0]}))
  }
  useEffect(() => {
    UserSchema.isValid(userForm).then(valid => setDisabled(!valid))
  },[userForm])

  

  
  return (
    <div className="App">
     
      <Link to='/'>
        <button style={{marginTop:'2rem'}}>Home</button>
      </Link>
      
      <br/>
      <br/>
      <br/>
      <div className=''>
       <Link to='/login'>
          <button>Login  </button>
       </Link>
        &nbsp;&nbsp;
       <Link to='/registration'>
          <button>Registration  </button>
       </Link>
       <br/>
       <br/>
      </div>
      <Switch>
        <Route exact path='/'> <Home/> </Route>
        <PrivateRoute exact path='/class' component={Class} /> 
        <Route exact path='/registration/'> 
          <div style={{color: 'red'}}> 
            <div>{errors.name}</div><div>{errors.username}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.role}</div>
          </div>
          <Registration 
          form={userForm} 
          setForm={setUserForm} 
          formReset={initialForm}
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