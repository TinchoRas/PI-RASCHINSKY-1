import React, {useState, useEffect} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { createDog, getTemperaments } from '../actions/acciones';
import {useDispatch, useSelector} from "react-redux";


export default function DogCreate () {
    const dispatch = useDispatch()
    
    const temperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate();

    const [temperamentosElegidos, setTemperamentosElegidos] = useState([]);
    const [input, setInput] = useState({
        name:"",
        weight_max: "",
        weight_min: "",
        height_max: "",
        height_min: "",
        life_span: "",
        temperaments: []
    })

   

    

    const handleInputChange = function (e) {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value,});
      };


      const handleSelect = (e) => {
        let index = e.target.selectedIndex;
        setTemperamentosElegidos((temps) => [...temps, e.target.options[index].text]);
        setInput({
          ...input,
          temperaments: [...input.temperaments, e.target.value],
        });
      };

      function handleSubmit(e) {
        e.preventDefault();
        dispatch(createDog(input));
        alert("Your dog has been uploaded succesfuly");
        setInput({
          name: "",
          heightMax: "",
          heightMin: "",
          weightMax: "",
          weightMin: "",
          temperament: [],
          life_span: "",
          image: "",
        });
        navigate("/home");
      }

      useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
     
    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
             <h1>¡Creá tu Perri, perri!</h1>
             <form onSubmit={(e)=> handleSubmit(e)}>
                 <div>
                     <label>Nombre:</label>
                     <input
                     type='Text'
                     value = {input.name}
                     name="name"
                     onChange={handleInputChange}
                     />
                 </div>

                 <div>
                     <label>Temperamento</label>
                     <select onChange={handleSelect}>
                        <option value="all">Temperamentos</option>
                        {temperaments?.map((t) => (
                        <option key={t.id} value={t.name}> {t.name} </option>))}
                     </select>
                     <input
                     type='Text'
                     value = {input.temperaments}
                     name="temperaments"
                     onChange={handleInputChange} 
                     />
                    <ul>
                        <h3>temperamentosElegidos: </h3>
                        <div>
                            {temperamentosElegidos?.map((el) => (
                                <div key={el}>
                                    <p>{el}</p>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
               

                 <div>
                     <label>Peso máximo</label>
                     <input
                     type='Text'
                     value = {input.weight_max} 
                     name="weight_max"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label>Peso mínimo</label>
                     <input
                     type='Text'
                     value = {input.weight_min} 
                     name="weight_min"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label>Altura máxima</label>
                     <input
                     type='Text'
                     value = {input.height_max}
                     name="height_max"
                     onChange={handleInputChange} 
                     />
                 </div>
                 <div>
                     <label>Altura mínima</label>
                     <input
                     type='Text'
                     value = {input.height_min} 
                     name="height_min"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label>Expectativa de vida</label>
                     <input
                     type='Text'
                     value = {input.life_span} 
                     name="life_span"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                    <button type="submit" >
                        Create!
                    </button>
                </div>
                 
             </form>
        </div>

    )
}
