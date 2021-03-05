import {useState, useEffect} from 'react';
import {axiosWithAuth} from '../helpers/axiosWithAuth';


export default function Clientclass(){

    const [allClasses, setAllClasses] = useState([]);
    const [clientClasses, setClientClasses] = useState([]);
    const [idToRemove, setIdToRemove] = useState([]);
    const [updateCards, setUpdateCards] = useState(false);
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

    const availableClasses = allClasses.filter((item) =>{
        return !idToRemove.includes(item.id);
    })

    return(
        <div>
            <h1>Client Dashboard</h1>          
            <div>
                {   
                    availableClasses.length>0 ?
                    <h3>Available Classes</h3>
                    :<span></span>
                }
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
                    <h3>Registered Classes</h3>
                    :<span></span>
                }
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
        </div>
    )
}

