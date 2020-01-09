const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,"./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(":", "_").replace(":", "_") + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits:{ 
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

const Car = require("../models/car");

router.get("/", checkAuth, (req, res, next)=> {
    Car.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post("/", checkAuth, upload.single("carImage"),  (req, res, next)=> {
    console.log(req.file);
    const car = new Car({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        yearOfCarProduction: req.body.yearOfCarProduction,
        price: req.body.price,
        carImage: req.file.path
    });
    car.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowy samochod",
            createdCar: car
        });
    })
    .catch(err => res.status(500).json({error: err}));
});

router.get("/:carId", (req, res, next)=> {
    const id = req.params.carId;
    Car.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:carId", (req, res, next)=> {
    const id = req.params.carId;
    Car.update({_id:id}, { $set: {
        name: req.body.name,
        yearOfCarProduction: req,body,yearOfCarProduction,
        price: req.body.price
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana samochodu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:carId", (req, res, next)=> {
    const id = req.params.carId;
    Car.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie samochodu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;