import axios from 'axios';


export const GET_DOGS = 'GET_DOGS'
export const getDogs = () => {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/dogs');
          return dispatch({
              type: 'GET_DOGS',
              payload: json.data
          })
    }
}
 export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'

export function getTemperaments() {
    return async (dispatch) => {
      const temperaments = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments.data,
      });
    };
  }
  

export const FILTER_TEMPERAMENTS = 'FILTER_TEMPERAMENTS'
export function filter(payload) {
    return {
      type: FILTER_TEMPERAMENTS,
      payload,
    };
  }

  export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
  export function filterByOrigin (payload) {
     return {
       type: FILTER_BY_ORIGIN,
       payload
     } 
  }

  export const ORDER_BY_NAME = "ORDER_BY_NAME"
  export function orderByName (payload) {
    return {
      type: ORDER_BY_NAME,
      payload
    }
  }

  export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
  export function orderByWeight (payload) {
    return {
      type: ORDER_BY_WEIGHT,
      payload
    }
  }

  
  // export function searchDogs (payload) {
  //   return (dispatch) => {
  //     axios.get('http://localhost:3001/dogs?name=' + payload)
  //     .then((dogs) => {
  //       dispatch({
  //         type: SEARCH_DOGS,
  //         payload: dogs.data
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //     })
  //   } 
  // } 
  export const SEARCH_DOGS = 'SEARCH_DOGS'
  export function searchDogs (payload) {
    return async function (dispatch) {
      try {
        let json = await axios.get('http://localhost:3001/dogs?name=' + payload)
        return dispatch({
          type: SEARCH_DOGS,
          payload: json.data
        })
      } catch(err) { 
        console.log(err)
      }
     }
  } 

  export const GET_DETAIL = 'GET_DETAIL'
  export function getDetail (payload) {
    return async function (dispatch){
      try {
        let jojo = await axios.get(`http://localhost:3001/dogs/${payload}`)
        return dispatch({
          type: 'GET_DETAIL',
          payload: jojo.data
        })
      } catch(err){
        console.log(err) 
      }
    }
  }

  export const CREATE_DOG = "CREATE_DOG"
  export function createDog (payload) {
    return async function (dispatch) {
      const response = await axios.post('http://localhost:3001/dog/', payload)
      console.log(response)
      return response
    }
  } 