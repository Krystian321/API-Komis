const express = require("express");
const router = express.Router();

router.get("/",(req, res, next) => {
    res.status(200).json({message: "Lista wszystkich ogłoszen"});
});
router.post("/",(req, res, next) => {
    res.status(200).json({message: "Dodano nowe ogłoszenie"});
});

router.get("/:classifiedId", (req, res, next) => {
    const id = req.params.classifiedId;
    res.status(200).json({message: "Informacje na temat ogłoszenia nr " + id});
});
router.patch("/:classifiedId", (req, res, next) => {
    const id = req.params.classifiedId;
    res.status(200).json({message: "Zmiana ogłoszenia o nr " + id});
});
router.delete("/:classifiedId", (req, res, next) => {
    const id = req.params.classifiedId;
    res.status(200).json({message: "Usunięcie ogłoszenia nr " + id});
});

module.exports = router;