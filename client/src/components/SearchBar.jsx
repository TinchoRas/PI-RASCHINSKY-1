import axios from "axios";
import { useState } from "react";
import { searchDogs } from "../actions/acciones";
import { useDispatch } from "react-redux";
export default function SearchBar () {

    const [search, setSearch] = useState('') 
    
    let dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
         dispatch(searchDogs(search))
          
           setSearch('')
        }
    const handleInputChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value) 
        
        
    }
      

    return (
    <div> 
        
        <input type="text" placeholder= "Buscar..." onChange={(e)=>{handleInputChange(e)}} value={search}/>  
            <button type="submit" onClick={(e)=>{handleSubmit(e)}}> Buscar </button>   
        
    </div>
    )
}