const express = require('express');
const trainController = require('../controllers/trainController');

const router = express.Router();

router.get('/:train_no',(req,res)=>{
    trainController.getTrainDetails(req.params.train_no)
    .then((trainDetails)=>{
        res.json(trainDetails);
    })
    .catch((error)=>{
        res.status(500).json({message : error})
    });
});

router.get('/:train_no/status',(req,res)=>{
    if(req.query.startDate){
        trainController.getTrainStatus(req.params.train_no, req.query.startDate)
        .then((trainDetails)=>{
            res.json(trainDetails[0]);
        })
        .catch((error)=>{
            res.status(500).json({message : error})
        }); 
    }
    else{
        res.status(400).json({message : "Bas Request"})
    }
});

module.exports = router;