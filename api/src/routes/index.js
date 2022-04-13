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


  
router.get('/temperament', async (req,res)=>{
    const apiTemperament = await getAllInfo();
    const newTemperaments = await apiTemperament.map((e)=> e.temperament).filter((e)=>e)
    //console.log(newTemperaments)
    newTemp = newTemperaments.join().split(',')
    console.log(newTemp)
    newTemp = [... new Set(newTemp)].sort()
    
    newTemp.forEach((e) => {
        Temperament.findOrCreate({
            where: {name: e}
        })
    })
    
    const totalTemperament = await Temperament.findAll()
    res.status(200).send(totalTemperament)

});

router.post('/dog', async (req, res) => {
    let {
        id,
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_span,
        image,
        temperament } = req.body
    try { 
    const createDog  =  await Dog.create({id, name, weight_min, weight_max, height_min, height_max, life_span, image})
    const dbTemperament = await Temperament.findAll({
        where: {name: temperament}
    })
   await createDog.addTemperament(dbTemperament)
    res.send('Perro creado')

    
} catch (error) {
    res.status(400).send(error)
}
})  

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
