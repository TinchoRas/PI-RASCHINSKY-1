import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { createDog, getTemperaments } from '../actions/acciones';
import {useDispatch, useSelector} from "react-redux";


export default function DogCreate () {
    const dispatch = useDispatch()
    
    const temperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate();

    const [temperamentosElegidos, setTemperamentosElegidos] = useState([]);
    const [input, setInput] = useState({
        name:"",
        weight_max: 0,
        weight_min: 0,
        height_max: 0,
        height_min: 0,
        life_span: "",
        temperaments: []
    })
  const [errors, setErrors] = useState({})
   
    function validate (input){
        let errors = {}
        if(!input.name || ! /^[a-z]+$/.test(input.name)) errors.name = "El nombre es requerido"
        if(!input.weight_max) errors.weight_max = "El peso máximo es requerido"
        if(!input.weight_min ) errors.weight_min = "El peso mínimo es requerido"
        if(!input.height_max) errors.height_max = "La altura máxima es requerida"
        if(!input.height_min) errors.height_min = "La altura mínima es requerida"
        if(!input.life_span) errors.life_span = "La vida es requerida"
        if(input.temperaments.length === 0) errors.temperaments = "Debe seleccionar al menos un temperamento"
        return errors

        
    }
    
    
    const handleInputChange = function (e) {
        e.preventDefault();
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({ ...input, [e.target.name]: e.target.value,});
      };


      const handleSelect = (e) => {
        let index = e.target.selectedIndex;
        setErrors(validate({
            ...input,
            temperaments: e.target.value
        }))
        if(input.temperaments.length < 5) { setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value],
          })} else {alert ("No puede seleccionar más de 5 temperamentos")}
        setTemperamentosElegidos((temps) => [...temps, e.target.options[index].text]);
      
      };

      function handleSubmit(e) {
        e.preventDefault();
        dispatch(createDog(input));
        alert("Your dog has been uploaded succesfuly");
        setInput({
          name: "",
          heightMax: 0,
          heightMin: 0,
          weightMax: 0,
          weightMin: 0,
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
                     <p>{errors.name}</p>
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
                        
                       {input.temperaments.map((t) => (
                           <li key={t}> {t} </li>))}
                             
                    </ul>
                </div>
               

                 <div>
                     <label>Peso máximo</label>
                     <input
                     type='number'
                     value = {input.weight_max} 
                     name="weight_max"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label>Peso mínimo</label>
                     <input
                     type='number'
                     value = {input.weight_min} 
                     name="weight_min"
                     onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label>Altura máxima</label>
                     <input
                     type='number'
                     value = {input.height_max}
                     name="height_max"
                     onChange={handleInputChange} 
                     />
                 </div>
                 <div>
                     <label>Altura mínima</label>
                     <input
                     type='number'
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
                    <button type="submit" disabled={errors.name || errors.weight_max || errors.weight_min || errors.height_max || errors.height_min || errors.temperaments || errors.life_span ? true : false} >
                        Create!
                    </button>
                </div>
                 
             </form>
        </div>

    ) 
    
}
