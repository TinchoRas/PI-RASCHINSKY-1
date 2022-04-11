import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/acciones";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myDogs = useSelector((state) => state.detail)
    console.log(myDogs)
    return (
        <div className={styles.container}>
            {
           !!myDogs.length ?
               <div >
                 <div className={styles.imgContainer}>

                 <div styles={styles.textContainer}>
                      <h1>I am {myDogs[0].name} </h1>
                      <img className={styles.img} src={myDogs[0].image} />
                      <h3> Peso Max: {myDogs[0].weight_max} kilogramos </h3>
                      <h3> Peso Min: {myDogs[0].weight_min} kilogramos </h3>
                      <h3>Altura Max: {myDogs[0].height_max} centímetros </h3>
                      <h3>Altura Min: {myDogs[0].height_min} centímetros </h3>
                      <h3>Temperamentos: {!myDogs[0].createInDb ? myDogs[0].temperament + " " : myDogs.temperaments.map(el => el.name + (' '))} </h3>
                      <h3>Tiempo de vida: {myDogs[0].life_span} </h3>
                      <Link to='/home'> <button className={styles.btn} >Volver</button>
                      </Link>
                 </div>

                        </div>

                    </div>
                    : <p>Cargando...</p>

            }

        </div>
    )

}