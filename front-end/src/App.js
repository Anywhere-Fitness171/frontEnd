import './App.css';
import {BrowserRouter as Route, Switch, Link} from 'react-router-dom';
import Registration from './Components/Registration';
import {useState, useEffect } from 'react';
import axios from 'axios';
import fitPhoto from './Photos/workout-photo.jpg';

function App() {
  const initialForm= {
    name: '',
    username:'',
    email:'',
    password:'',
    role:''
  }
// Slices of State 
  const [userForm, setUserForm]= useState(initialForm); // State to handle Form
  const [users, setUsers]= useState([]); // State to keep track of users. Type ARRAY



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
        <Route exact path='/registration'> 
          <Registration 
          form={userForm} 
          setForm={setUserForm} 
          formReset={initialForm}
          setUsers={setUsers}
          users={users}
          />
        </Route>
        <Route path='/login'> </Route>
      </Switch>
    </div>
  );
}

export default App;
