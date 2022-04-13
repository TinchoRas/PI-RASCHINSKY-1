const {Temperament, Dog} = require('../db')
const axios = require('axios')
const e = require('express')



const getApiInfo = async () => {
    const apiUrl = await axios('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(element => {
       const weightSplited = element.weight.metric.split("-")
       const heightSplited = element.height.metric.split("-")
        return {
            id: `${element.id}`,
            name: element.name, 
            life_span: element.life_span,
            temperament: element.temperament,
            weight_min: parseInt(weightSplited[0]),
            weight_max: parseInt(weightSplited[1]),
            height_min: parseInt(heightSplited[0]),
            height_max:parseInt(heightSplited[1]),
            image: element.image.url
                }
    }) 
    return apiInfo;
}


const getDbInfo = async () => {
    return await Dog.findAll({
       include: {
           model: Temperament,
           attributes: ['name'],
           through: {
               attributes: [],
           }

       } 
    })
}



const getAllInfo = async () => {
    const infoAp = await getApiInfo();
    const infoDb =  await getDbInfo();
    const todaLaInfo = infoAp.concat(infoDb);
    return todaLaInfo;
} 

const getDbInfoById = async (id) => {
  try {
      const dbDogs = await Dog.findByPk(id, { include: Temperament }) 
      return {
          id : dbDogs.id,
            name : dbDogs.name,
            weight_min : dbDogs.weight_min,
            weight_max : dbDogs.weight_max,
            height_min : dbDogs.height_min,
            height_max : dbDogs.height_max,
            life_span : dbDogs.life_span,
            image : dbDogs.image,
            temperament : dbDogs.temperaments.map(e => e.name)

            
      }
  } catch (error) {
      console.log(error)
  }    
}



const getApiInfoById = async (id) => {
try {
    const resultApi =  await axios.get('https://api.thedogapi.com/v1/breeds')
    const respuesta = await resultApi.data.filter(e => {
        if(parseInt(e.id) === parseInt(id)) return e
    })

     const ordenarDatos = await respuesta.map(element => {
        const weightSplited = element.weight.metric.split("-")
        const heightSplited = element.height.metric.split("-")
        return {
            id: element.id,
            name: element.name, 
            life_span: element.life_span,
            temperament: element.temperament,
            weight_min: parseInt(weightSplited[0]),
            weight_max: parseInt(weightSplited[1]),
            height_min: parseInt(heightSplited[0]),
            height_max:parseInt(heightSplited[1]),
            image: element.image.url
                }
    }) 
    return ordenarDatos;
} catch (error) {
    console.log(error)
}
}

const getAllId = async (id) => {
    const uuid = id.includes('-') 
    if (uuid) {
        const dogsDb = await getDbInfoById(id)
        return dogsDb  } 
        else { 
            const dogsApi = await getApiInfoById(id);
            return dogsApi
        }  }

// const getTemperament = (temperament) => {
//      getAllInfo.filter(e => {
//     e.temperament === temperament
    
// }) 
 
// }

async function getTemperament(req, res, next) {

    const count = await Temperament.count();
    
    if (!count) {
  
      let temps = [];
  
      let { data } = await axios.get('https://api.thedogapi.com/v1/breeds/');
      data.forEach((dog) => {
        if (dog.temperament) {
          const tempsArr = dog.temperament?.split(", ");
          tempsArr.forEach((currTemp) => {
            const exist = temps.find((temp) => temp.name === currTemp);
            if (!exist) {
              temps.push({ name: currTemp });
            }
          });
        }
      });
      await Temperament.bulkCreate(temps);
      return res.json(temps);
    }
    const temps = await Temperament.findAll();
    return res.json(temps);
  }
  

module.exports = {getAllInfo, getApiInfoById, getTemperament, getAllId, getDbInfoById}