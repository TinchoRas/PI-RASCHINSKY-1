import React, { useState } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, deleteDog} from '../actions/acciones'
import { useEffect } from 'react';
import styles from "./Detail.module.css";
export default function Detail(){
 
  const navigate = useNavigate()
//    const cleaner = useState(false)
  




  let myDogs = useSelector(state => state.detail);
  console.log(myDogs)
  const dispatch = useDispatch();
  
  const{id} = useParams();
  
  function handleDelete(e) {
    if(myDogs.id.length > 5) {
          e.preventDefault();
          dispatch(deleteDog(id))
          // dispatch(cleaner())
          alert('¡Perro eliminado!')
          navigate('/home')
    }
} 

  useEffect(() => {
      dispatch(getDetail(id));
      console.log(myDogs)
  }
  , [dispatch]);



myDogs = useSelector((state) => state.detail);


return (
  <div>
          <Link to='/home'> <button className={styles.btn} >Volver</button>
                     </Link>
      {
       myDogs.length > 0 ?   
          <div className='containerDetail'>
              <div className='imgContainer'>
                  <img src={myDogs[0].image} alt="Perrito" width="300px" height="250px"/>
              </div>
              <div className='textContainer'>
                  <h1>Raza:</h1>
                  <p>{myDogs[0].name}</p>
                  <h3>Espectativa de vida: {myDogs[0].life_span}</h3>
                  <p>Peso maximo:</p>
                  <p>{myDogs[0].weight_max} Kg</p>
                  <h2>Peso minimo:</h2>
                  <p> {myDogs[0].weight_min} kg</p>
                  <h3>Atura maximo: </h3>
                  <p>{myDogs[0].height_max}.cm</p>
                  <h3>Atura minima: </h3>
                  <p>{myDogs[0].height_min}.cm</p>
                  <h3>Temperament:</h3>
                  <h4>{myDogs[0].temperament}</h4>
                 
              </div>
          </div>: 
          <div>
               
                  <button onClick={e => handleDelete(e) }> ELIMINAR </button>
              
          <h1>Raza:</h1>
          <p>{myDogs.name}</p>
          <h3>Espectativa de vida: {myDogs.life_span}</h3>
          <p>Peso maximo:</p>
          <p>{myDogs.weight_max} Kg</p>
          <h2>Peso minimo:</h2>
          <p> {myDogs.weight_min} kg</p>
          <h3>Atura maximo: </h3>
          <p>{myDogs.height_max}.cm</p>
          <h3>Atura minima: </h3>
          <p>{myDogs.height_min}.cm</p>
          <h3>Temperament:</h3>
          <h4>{myDogs.temperaments}</h4>
           

          </div>
        
          } 
          

          
      </div>


 )} 

{/* <div>
<h1>Loading...</h1>
<img src="
https://c.tenor.com/xzP0fkUocmsAAAAd/perrito-esperando-perrito-cute.gif
" alt=""  width="300px" height="250px" />
</div>  */}













 
    
//     function renderDog (myDog) { 
    
//             if (id.length > 10){ 
                
//                 return (
//                     <div className={styles.container} key={id}>
             
//                  <div className={styles.imgContainer}> 

//                  <div styles={styles.textContainer}>
//                       <h1>I am a {myDogs[0].name} </h1>
//                       <img className={styles.img} src={myDogs[0].image}  alt="not found" />
//                       <h3> Peso Max: {myDogs[0].weight_max} kilogramos </h3>
//                       <h3> Peso Min: {myDogs[0].weight_min} kilogramos </h3>
//                       <h3>Altura Max: {myDogs[0].height_max} centímetros </h3>
//                       <h3>Altura Min: {myDogs[0].height_min} centímetros </h3>
//                       <h3>Temperamentos: {!myDogs[0].createInDb ? myDogs[0].temperament + " " : myDogs[0].temperaments.map(el => el.name + (' '))} </h3>
//                       <h3>Tiempo de vida: {myDogs[0].life_span} </h3>
//                       <Link to='/home'> <button className={styles.btn} >Volver</button>
//                       </Link>
//                  </div> 
//                </div>
//               </div> );
//               } else { 
//                   return ( 
//                     <div className={styles.container} key={id}>
//                     <div className={styles.imgContainer}>
//                      {/* <img className={styles.img} src={myDogs[0].image} alt="Dog" /> */}
//                 </div>
//                     <div className={styles.textContainer}>
//                     <h1>I am {myDogs.name} </h1>
//                       {/* <img className={styles.img} src={myDogs[0].image} /> */}
                      
//             <h4>Temperaments: {myDogs?.temperament}</h4>
//             <h4>Weight: {myDogs?.weight_max} kilogramos</h4>
//             <h4>Weight: {myDogs?.weight_min} kilogramos</h4>
//             <h4>Height: {myDogs?.height_max} centímetros</h4>
//             <h4>Height: {myDogs?.height_min} centímetros</h4>
//             <h4>Life span: {myDogs?.life_span} años</h4>
//                       <Link to="/home">
//                         <button className={styles.btn}>¡Volver a los perros!</button>
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               }
              
//             }
//             return (
//                 <div>
//                   {!myDogs ? (
//                     <h1>Cargando...</h1>
//                   ) : (
//                     renderDog(myDogs)
//                   )}
//                 </div>
//               );         
 
//  }

      