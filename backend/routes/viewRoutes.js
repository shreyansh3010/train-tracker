const express = require('express');
const trainController = require('../controllers/trainController');

const router = express.Router();

router.get('/search',(req,res)=>{
    res.render('index', {page: 'search'});
});

router.get('/tarin/:train_no/status',(req,res)=>{
    trainController.getTrainDetails(req.params.train_no)
    .then((trainDetails)=>{
        var locals = {
            page: 'details',
            trainDetails : trainDetails,
            req : req
        }
        res.render('index', locals);
    })
    .catch((error)=>{
        res.status(500).json({message : error})
    });
});

module.exports = router;