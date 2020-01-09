const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const carRoutes = require("./api/routes/cars");
const userRoutes = require("./api/routes/users");
const classifiedRoutes = require("./api/routes/classifieds");

mongoose.connect("mongodb+srv://krystian:krystian@komis-vvtq1.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/cars", carRoutes);
app.use("/users", userRoutes);
app.use("/classifieds", classifiedRoutes);

// app.use((req,res,next) => {
//     res.status(200).json({
//         wiadomosc: "wszystko dziala"
//     });
// });


app.use((req, res, next)=> {
    const error = new Error("Nie znaleziono");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next)=> {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
