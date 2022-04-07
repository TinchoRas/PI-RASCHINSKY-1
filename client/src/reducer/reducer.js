import { GET_DOGS, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, SEARCH_DOGS, GET_DETAIL, CREATE_DOG } from '../actions/acciones'

const initialState = {
    dogs: [],
    temperaments: [],
    everyDog: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                everyDog: action.payload
            }
   
                       
                    case FILTER_TEMPERAMENTS:
                        const filtered = action.payload === "temperament"
                        ? state.dogs
                        : state.dogs.filter((el) => el.temperament?.includes(action.payload))
                        return{
                            ...state,
                            dogs: filtered
                        }



            case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

      case FILTER_BY_ORIGIN: 

      let baseDeDatos;
      
      if (action.payload === 'createdInDB') {
       let DB =  state.everyDog.filter((e) => e.id.length > 4)
          baseDeDatos = DB; 
      }
      
       if (action.payload === 'fromApi') {
          let dogsApi1 = state.everyDog.filter((e) => e.id < 300)
          baseDeDatos = dogsApi1
        }
        if (action.payload === 'All Dogs!!') { 
            baseDeDatos = state.everyDog 
          } 
      return {
            ...state,
            dogs: baseDeDatos
        }

        case ORDER_BY_NAME:
           
                let orderedDogs = [...state.dogs]
                orderedDogs = orderedDogs.sort((a, b) => {
                    if(a.name < b.name) {
                        return action.payload === 'asc' ? -1 : 1
                    }
                    if(a.name > b.name) {
                        return action.payload === 'asc' ?  1 : -1
                    } 
                    return 0
                })
                return  {
                    ...state,
                    dogs: orderedDogs
                }

        case ORDER_BY_WEIGHT:
            let weightDog = [...state.dogs]
            weightDog = weightDog.sort((a, b) => {
                    if(a.weight_min < b.weight_min) {
                        return action.payload === 'Peso asc' ? -1 : 1
                    }
                    if(a.weight_min > b.weight_min) {
                        return action.payload === 'Peso asc' ?  1 : -1
                    } 
                    return 0
                })
                return  {
                    ...state,
                    dogs: weightDog
                }
                
                case  SEARCH_DOGS:
                   return {
                       ...state,
                       dogs: action.payload
                   }

                   case GET_DETAIL:
                       return {
                           ...state,
                           detail: action.payload
                       }
                case CREATE_DOG: 
                return {
                    ...state,
                }        
        default:
            return state
    }

       
}

export default rootReducer
