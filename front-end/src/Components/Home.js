import fitPhoto from '../Assets/workout-photo.jpg';

export default function Home(){
    return(
        <div>
            <h1>Anywhere Fitness</h1>
            <h2>Fitness NOW? Fitness Anywhere...</h2>
            <img src={fitPhoto} alt="Man working out" style={{width:'40%'}}/>
        </div>
    )
}


