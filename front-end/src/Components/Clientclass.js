import {useState, useEffect} from 'react';
import {axiosWithAuth} from '../helpers/axiosWithAuth';


export default function Clientclass(){

    const [availableClasses, setAvailableClasses] = useState([]);
    const userId = localStorage.getItem('anywhere-fitness-userid');
    
    useEffect(() => {
        axiosWithAuth().get('/classes')
        .then((response) => {
            setAvailableClasses(response.data);
            console.log(response.data);
        })
        .catch((response) => {
            console.log(response.data);
        })
    }, [])

    const registerToClass = (classId) =>{
        axiosWithAuth().post(`/classes/${classId}/attendees`,{user_id:userId})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <h1>Client Dashboard</h1>          
            <div>
                <h3>Available Classes</h3>
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
        </div>
    )
}

