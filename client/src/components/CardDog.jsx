 import React from 'react'
//  import { Link } from 'react-router-dom'
 import styles from "./CardDog.module.css";

 export default function Card ({name, image, temperament, weight_min, weight_max, height_min, height_max, id}) {
        return (
            <div className={styles.card} key={id}>
               {/* <div className={styles.Card}> */}
               <div className={styles.textContainer}> 
                <h3> {name} </h3>
                <h5> {weight_max} </h5>
                <h5> {weight_min} </h5>
                <h5> {height_max} </h5>
                <h5> {height_min} </h5>
                <h5> {temperament} </h5>
                <h5> {id} </h5>
                <div className={styles.imgBx}>
                <img src={image} alt="not found" width={"200px"} height={"150px"} key={Number} />
                {/* <Link to={`/home/${id}`}>   */}
                <button className={styles.btn}>Like this puppy? Get to know him better!</button>
                {/* </Link> */}
                </div>
                </div>

                {/* </div> */}
               
            </div>
        )
    } 