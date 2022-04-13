import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getDogs, getTemperaments, filter, filterByOrigin, orderByName, orderByWeight } from '../actions/acciones';
import CardDog from './CardDog';
import Paginado from './Paginado';
import styles from "./Home.module.css";


export default function Home() {
    const  dispatch = useDispatch()
      const allDogs = useSelector ((state) => state.dogs)
      const allTemps = useSelector((state) => state.temperaments)
     
      // const TempsFiltered = allTemps.filter( e => ) 
      const [currentPage, setCurrentPage] = useState(1) 
      const [dogsPerPage, setDogsPerPage ] = useState(8)
      const iUltimoPerro = currentPage * dogsPerPage
      const iPrimerPerro = iUltimoPerro - dogsPerPage
      const currentDogs = allDogs?.slice(iPrimerPerro, iUltimoPerro)
      const [order, setOrder] = useState("")
      
      const paginado = (pageNumber) => {
          setCurrentPage(pageNumber)
      }
 
      useEffect(() => {
          dispatch(getDogs());   
      }, [dispatch])    
      
      useEffect(() => {
        dispatch(getTemperaments());
      }, [dispatch]); 

    
      
      const handleClick = (e) => {
          e.preventDefault();
          dispatch(getDogs())
          setCurrentPage(1);
          setOrder(e.target.value);
      }

      const handleFilter= (e) => {
        e.preventDefault()
        dispatch(filter(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value);
      }

      const handlefilterByOrigin = (e) => {
         e.preventDefault()
        dispatch(filterByOrigin(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value);
      }

      const handleSort = (e) => {
         e.preventDefault()
         dispatch(orderByName(e.target.value));
         setCurrentPage(1)
         setOrder( `Order ${e.target.value }`)
      }

      const handleWeight = (e) => {
         e.preventDefault()
         dispatch(orderByWeight(e.target.value));
         setCurrentPage(1)
         setOrder( `Order ${e.target.value }`)
      } 

      return (
         <div >
          <div>
             
              <h1>Welcome to Dogland!</h1>
              <Link to='/dog'> Create Dog </Link>
              <button onClick={e=> {handleClick(e)} }>Recargar todos los perros</button>
          </div>
           
            <div>
               <select onChange={(e)=> handleSort(e)}>
                  <option value='asc'>Ascendente</option> 
                  <option value='desc'>Descendente</option>
               </select>
           
               <select onChange={(e)=> handleWeight(e)}>
                  <option value='Peso asc'>Peso Ascendente</option> 
                  <option value='Peso desc'>Peso Descendente</option>
               </select>

               <select  onChange={(e)=> handleFilter(e)}>
                  <option value='temperament'>Temperament</option>
                  {
                  allTemps?.map((t) => 
                  (<option value={t.name} key={t.id}> {t.name} </option>
                  ))}                                     
               </select>
                
               <select onChange={(e)=> handlefilterByOrigin(e)}>
                  <option value= 'All Dogs!!'>All Dogs!!</option>
                  <option value='fromApi'>From Api</option>
                  <option value='createdInDB'>Created in DB</option>
               </select> 
              
                 <div className={styles.cardContainer}>
                  {
                  currentDogs?.map(e=> {
                     return (
                         <div  key={e.id}>
                        <Link to={`/home/${e.id}`}>  
                        {/* abrir backticks para y meter home/${e.id} */}
                     <CardDog name={e.name}
                      image={e.image}
                     //   weight_min={e.weight_min} 
                     //    weight_max={e.weight_max}
                         temperament={e.temperament} />
                         

                     </Link>
                        </div>
                     )})
                  }


                  </div>
                  <Paginado
                  dogsPerPage={dogsPerPage}
                  allDogs={allDogs.length}
                  paginado={paginado}
               />
             </div>
      </div>
      )
}


