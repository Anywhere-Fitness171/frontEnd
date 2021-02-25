import './App.css';
import {BrowserRouter as Route, Switch, Link} from 'react-router-dom';
import fitPhoto from './Photos/workout-photo.jpg';
import Registration from './Components/Registration';
import {useState, useEffect, axios } from 'react';

function App() {
  const initialForm= {
    name: '',
    username:'',
    email:'',
    password:'',
    role:''
  }
  const [userForm, setUserForm]= useState(initialForm);

  return (
    <div className="App">
      <h1>Anywhere Fitness</h1>
      <h2>Fitness NOW? Fitness Anywhere...</h2>
      <img src={fitPhoto} alt="Man working out" style={{width:'25%'}}/>
      <br/>
      <br/>
      <div>
        <Link to='/Login'>
          <button>Login</button>
        </Link>
        &nbsp;&nbsp;
        <Link to='/Registration'>
          <button>Registration</button>
        </Link>
      </div>
      <Switch>
        <Route exact path='/Login'> </Route>
        <Route exact path='/Registration'> <Registration form={userForm} setForm={setUserForm} /></Route>
      </Switch>
    </div>
  );
}

export default App;
