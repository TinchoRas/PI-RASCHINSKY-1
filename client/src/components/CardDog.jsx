 import React from 'react'
 import { Link } from 'react-router-dom'

 export default function Card ({name, image, temperament, weight_min, weight_max, height_min, height_max, id}) {
        return (
            <div>
                <h3> {name} </h3>
                <h5> {weight_max} </h5>
                <h5> {weight_min} </h5>
                <h5> {height_max} </h5>
                <h5> {height_min} </h5>
                <h5> {temperament} </h5>
                <h5> {id} </h5>
             
                <img src={image} alt="image not found" width={"200px"} height={"150px"} key={Number} />
            </div>
        )
    } 