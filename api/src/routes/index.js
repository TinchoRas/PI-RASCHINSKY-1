const { Router, application } = require('express');
// const Temperament = require('../models/Temperament');
// const Dog = require('../models/Dog')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Temperament, Dog} = require('../db')
const axios = require('axios')
const {getAllInfo, getApiInfoById, getTemperament, getDbInfoById, getAllId} = require('../Controllers/ControllersDog');
const e = require('express');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





router.get('/dogs', async (req, res)=>  {   
        const {name} = req.query;
        const everyDog = await getAllInfo()
        try { 
            
         
         if (name) { 
          let specificDog = everyDog.filter(e => e.name.toLowerCase().includes(name))    
            if (specificDog.length > 0) {
                res.status(200).send(specificDog)
            } 
        } else {
        
            res.status(200).send(everyDog)
               
        } 
     }
        catch(err){
            
            res.send({msg: err})
        }
    
})
    


// const getApiInfoId =  async (req, res) => {
//     const {id} = req.params
//     // const dogo = await getAllInfo()
//     console.log(id)
//     try { 
//        const respuesta = getApiInfoById(id)
        
//         if(respuesta) {
//             res.status(200).send(respuesta);
//         } else {
//             res.status(404).send("No hay perri, perri")
//         }
        
//     } catch (error) {
//         res.status(500).send({msg: error})

//     }
// }
router.get('/dogs/:id', async (req, res)=>{
    const {id} = req.params
    try { 
               const respuesta = await getAllId(id)
                
                if(respuesta) {
                    res.status(200).send(respuesta);
                } else {
                    res.status(404).send("No hay perri, perri")
                }
                
            } catch (error) {
                res.status(500).send({msg: error})
        
            }
} )    

// router.get('/dogs/:id', (req, res)=>{ 
//   const {id} = req.params
//   try { 
//       if(id) { 
//       return getApiInfoById(id).then(info => {
//             res.status(200).send(info)
//       }) }
//   } 
//   catch (error) { 
//       console.log(error)
//    }  

// }) 


  
router.get('/temperament', async (req,res)=>{ try {
    const allDogs = await getAllInfo();
    const temperament = [
      ...new Set(
        allDogs
          .map((e) => e.temperament)

          /* todos los t. en un array cuyos  son str */
          .join()
          .split(",")

        /* un array donde cada elemento es un unico temperamento en str */
      ),
    ]
      .sort()
      .filter((e) => e && e[0] === " ");
    /* ordena alfabeticamente y elimina strings vacios(solo hay uno pero bueno) */

    const clearTemp = temperament.map((e) => e.trim());

    for (let i = 0; i < clearTemp.length; i++) {
      const e = clearTemp[i];
      await Temperament.findOrCreate({
        where: { name: e },
      });
    }
  
    const AllTemperament = await Temperament.findAll();
    res.send(AllTemperament);
  } catch (error) {
    console.log(error);
  }
});

router.post('/dog', async (req, res) => {
    const {
      name,
      heightMax,
      heightMin,
      weightMax,
      weightMin,
      temperament,
      life_span,
      image,
    } = req.body;
  
    try {
      let NewDog = await Dog.create({
        name,
        heightMax,
        heightMin,
        weightMax,
        weightMin,
        life_span,
        image,
      });
  
      let temperamentNewDog = await Temperament.findAll({
        where: { name: temperament },
      });
  
      NewDog.addTemperament(temperamentNewDog);
      res.send("Tu nueva raza perruna ha sido agregada");
    } catch (error) {
      res.send(error);
    }
  });

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params  
    
    try {
        if(id) {
            await Dog.destroy({
                where: {id: id}
            })
            res.send({msg : 'Perro eliminado'})
        } 
       
          
      } catch (error) {
          console.log(error)
      }
 },
)



module.exports = router;
