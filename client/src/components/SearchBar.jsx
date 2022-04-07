import axios from "axios";
import { useState } from "react";
import { searchDogs } from "../actions/acciones";
import { useDispatch } from "react-redux";
export default function SearchBar () {
    const [search, setSearch] = useState('') //------->"search" es mi estado local, o sea, donde vaya guardando lo que tipea el usuario.
    let dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
         dispatch(searchDogs(search))
           //----> lo que está en el estado local va a llegarle a mi acción que va a llamar al back y le va a pasar el search.
           setSearch('')
        }
    const handleInputChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value) 
        console.log(search)
        
    }
      

    return (
    <div> 
        
        <input type="text" placeholder= "Buscar..." onChange={(e)=>{handleInputChange(e)}} value={search}/>  
            <button type="submit" onClick={(e)=>{handleSubmit(e)}} >Buscar</button>   
        
    </div>
    )
}