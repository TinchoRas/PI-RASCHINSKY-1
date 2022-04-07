import React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/acciones";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Detail (props) {
  console.log(props)
  const dispatch = useDispatch()
  
  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDogs = useSelector((state) => state.detail)
   console.log(myDogs)
  return (
      <div>
          {
              !!myDogs.length  ? 
              <div>
                  <h1>I am {myDogs[0].name} </h1>
                  <h3> Peso Max: {myDogs[0].weight_max} </h3>
                  <h3> Peso Min: {myDogs[0].weight_min} </h3>
                  <h3>Altura Max: {myDogs[0].height_max} </h3>
                  <h3>Altura Min: {myDogs[0].height_min} </h3>
                  <h3>Temperamentos: {!myDogs[0].createInDb ? myDogs[0].temperament + " " : myDogs.temperaments.map(el => el.name + (' '))} </h3>
                  <h3>Tiempo de vida: {myDogs[0].life_span} </h3>
                  <img src= {myDogs[0].image }/>

              </div> 
              : <p>Cargando...</p>
          } 
          <Link to='/home'>
              <button >Volver</button>
          </Link>
      </div>
  )

}