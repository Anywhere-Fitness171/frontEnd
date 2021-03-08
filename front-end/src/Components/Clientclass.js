import {useState, useEffect} from 'react';
import {axiosWithAuth} from '../helpers/axiosWithAuth';


export default function Clientclass(){

    const searchForm={
        type:'',
        date_time:'',
        duration:'',
        intensity:'',
        location:''
      }

    const [allClasses, setAllClasses] = useState([]);
    const [clientClasses, setClientClasses] = useState([]);
    const [idToRemove, setIdToRemove] = useState([]);
    const [updateCards, setUpdateCards] = useState(false);
    const [search, setSearch] = useState(searchForm);
    const [disabled, setDisabled] = useState(false);
    const userId = localStorage.getItem('anywhere-fitness-userid');
    
    useEffect(() => {
        axiosWithAuth().get('/classes')
        .then((response) => {
            setAllClasses(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [updateCards])

    useEffect(() => {
        const user_id = localStorage.getItem('anywhere-fitness-userid');
        axiosWithAuth().get(`/users/${user_id}/attendee`)
        .then((response) => {
            setClientClasses(response.data);
            setIdToRemove(response.data.map((item) => item.class_id));
        })
        .catch((error) => {
            console.log(error);
        })
    }, [updateCards])

    const registerToClass = (classId) =>{
        axiosWithAuth().post(`/classes/${classId}/attendees`,{user_id:userId})
        .then((response) => {
            console.log(response.data);
            setUpdateCards(updateCards => !updateCards);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const unregisterFromClass = (classId) => {
        const userIdNum = parseInt(userId);
        const classIdNum = parseInt(classId);
        axiosWithAuth().delete(`/classes/${classIdNum}/attendees`,{data:{user_id:userIdNum}})
        .then((response) => {
            console.log(response.data);
            setUpdateCards(updateCards => !updateCards);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const searchFormChange = (event) =>{
        const {name, value} = event.target
        setSearch({...search,[name]:value});
    }

    const searchSubmit = (event) =>{
        event.preventDefault();
        console.log(search.date_time.substring(0,search.date_time.length - 6));
        const items = allClasses.filter((item => {
            if(search.type !== ''){
                return item.type.includes(search.type);
            }
            if( search.date_time !== ''){
                return item.date_time.substring(0,search.date_time.length - 6).includes(search.date_time.substring(0,search.date_time.length - 6));
            }
            if(search.intensity !== ''){
                return item.intensity.includes(search.intensity);
            }
            if(search.duration !== ''){
                return parseInt(item.duration) === parseInt(search.duration);
            }
            if(search.location !== ''){
                return item.location.toLowerCase().includes(search.location.toLowerCase());
            }
        }));
        setSearch(searchForm);
        setDisabled(true);
        setAllClasses(items);
    }

    const resetForm = (event) =>{
        event.preventDefault();
        setSearch(searchForm);
        setUpdateCards(updateCards => !updateCards);
        setDisabled(false);
    }

    const availableClasses = allClasses.filter((item) =>{
        return !idToRemove.includes(item.id);
    })

    return(
        <div>
            <h1>Client Dashboard</h1>  
            <form onSubmit={searchSubmit}>
                <label> Type&nbsp;&nbsp;
                    <select name="type" 
                    value={search.type}
                    onChange={searchFormChange}>
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
                    value={search.date_time}
                    onChange={searchFormChange}
                    />
                </label>               
                <label> Duration&nbsp;&nbsp;
                    <input 
                    type="number"
                    name="duration"
                    value={search.duration}
                    onChange={searchFormChange}
                    />
                </label>
                <label> Intensity&nbsp;&nbsp;
                    <select name="intensity" 
                    value={search.intensity}
                    onChange={searchFormChange}>
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
                    value={search.location}
                    onChange={searchFormChange}
                    />
                </label>
                <button disabled={disabled}>Search</button>
                <button onClick={resetForm}>Reset</button>
            </form>      
            <div className="cards-container">
                {   
                    availableClasses.length>0 ?
                    <h3>Available Classes</h3>
                    :<span></span>
                }
                    <div>
                    <div className="cards">
                        {
                            availableClasses.map((item,index) => (
                                <div className="card" key={index}>
                                    <p>{item.name}</p>
                                    <p>{item.type}</p>
                                    <p>{item.date_time}</p>
                                    <p>{item.duration}</p>
                                    <p>{item.location}</p>
                                    <button onClick={() =>registerToClass(item.id)}>Register</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {
                        clientClasses.length>0 ?
                        <div>
                        <h3>Registered Classes</h3>
                            <div className="cards">
                            {
                                clientClasses.map((item,index) => (
                                    <div className="card" key={index}>
                                        <p>{item.name}</p>
                                        <p>{item.type}</p>
                                        <p>{item.date_time}</p>
                                        <p>{item.duration}</p>
                                        <p>{item.location}</p>
                                        <button onClick={() =>unregisterFromClass(item.class_id)}>UnRegister</button>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        :<span></span>
                    }
                </div>
            </div>
        </div>
    )
}

