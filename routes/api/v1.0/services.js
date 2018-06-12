var express = require('express');
var router = express.Router();

// importamos los modelos de la base de datos
var Properity = require("../../../database/collections/properity");
var Images = require("../../../database/collections/images");
var Video = require("../../../database/collections/video");
var Neighborhood = require("../../../database/collections/neighborhood");
var Coordenadas = require("../../../database/collections/coordenadas");
var Contact = require("../../../database/collections/contact");
// funcion que permite controlar la id para que cumpla la el ObjectId de mongo
router.param(function(param, validator) {
  return function(req, res, next, val){
    if(validator.test(val) == true){
      next();
    }else{
      res.status(400).json({error : "El id " + val + " , no cumple con el formato requerido"});
    }
  }
});
// parametro del id que debe cumplir
router.param('id',/^[a-z0-9]{24}$/);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ApiRestAndroiDServices' });
});
// ruta para listar las propiedades
router.get('/homes', (req, res, next) => {
  Properity.find({}).populate("images").populate("video").exec((error, docs) => {
    if (error) {
      res.status(400).json({error : error});
      return;
    }else{
      // res.status(200).json(docs);
      res.status(200).json({
        msn : "Hay muchas casas."
      });
    }
  })
});
// ruta para listar los vecindarios o zonas
router.get('/neighborhood', (req, res, next) => {
  Neighborhood.find({}).populate("coordenadas").exec((error, docs) => {
    if(error){
      res.status(400).json({error : error});
      return;
    }else{
      res.status(200).json(docs);
      // res.status(200).json({
      //   neighborhood : docs.map(doc => {
      //     return {
      //       zones : {
      //         departament : doc.departament,
      //         name : doc.name,
      //         zoom : doc.zone,
      //         lat : doc.lat,
      //         lng : doc.lng
      //       },
      //       coordenadas : doc.id,
      //       status : 'OK'
      //     }
      //   })
      // });
    }
  })
});
// ruta para listar las coordenadas
router.get('/coordenadas', (req, res, next) => {
  Coordenadas.find({}).populate("neighborhood").exec((error, docs) => {
    if (error) {
      res.status(400).json({error : error});
      return;
    }else{
      res.status(200).json(docs);
    }
  })
});
// ruta para listar los contactos registrados
router.get('/contact', (req, res, next) => {
  Contact.find({}).exec((error, docs) => {
    if (error) {
      res.status(400).json({error : error});
      return;
    }else{
      res.status(200).json(docs);
    }
  })
});
/* POST home page. */
// ruta para insertar las propiedades
router.post('/homes', (req, res) => {
  var properity = {

  };
  var properityData = new Properity(properity);
  properityData.save().then((properityData) => {
    res.status(200).json({
      msn : "Properity insertada correctamente",
      datos : properityData
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});
// ruta para insertar vecindarios o zonas
router.post('/neighborhood', (req, res) => {
  var neighborhood = {
    departament : req.body.departament,
    name : req.body.name,
    zoom : req.body.zoom,
    lat : req.body.lat,
    lng : req.body.lng,
    coordenadas : req.body.coordenadas
  };
  var neighborhoodData = new Neighborhood(neighborhood);
  neighborhoodData.save().then((neighborhoodData) => {
    res.status(200).json({
      msn : "Zona registrada exitosamente",
      datos : neighborhoodData
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});
// ruta para insertar coordenadas
router.post('/coordenadas', (req, res) => {
  var coordenadas = {
    lat : req.body.lat,
    lng : req.body.lng,
    neighborhood : req.body.id
  };
  var coordenadasData = new Coordenadas(coordenadas);
  coordenadasData.save().then(() => {
    res.status(200).json({
      msn : "Coordenada registrada exitosamente"
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});
// ruta para insertar un contacto
router.post('/contact', (req, res) => {
  var contatc = {
    name : req.body.name,
    lastname : req.body.lastname,
    phone : req.body.phone,
    phoneFiltered : req.body.phoneFiltered,
    phoneFilteredComplete : req.body.phoneFilteredComplete,
    movil : req.body.movil,
    movilFiltered : req.body.movilFiltered,
    email : req.body.email,
    city : req.body.city,
    photo : req.body.photo,
    phoneFirst4Digits : req.body.phoneFirst4Digits
  }
  var contactData = new Contact(contact);
  contactData.save().then(() => {
    res.status(200).json({
      msn : "Contacto registrado con exito"
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

module.exports = router;
