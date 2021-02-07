const express = require("express");

// require the Drone model here

let DroneModel = require("../models/Drone.model.js");

const router = express.Router();

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drone) => {
      res.render("../views/drones/list.hbs", { drone });
    })
    .catch(() => {
      console.log("Something went wrong when finding");
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("../views/drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { myName, myProps, myMaxSpeed } = req.body;
  let myNewDrone = {
    name: myName,
    propellers: myProps,
    maxSpeed: myMaxSpeed,
  };

  //Creating the new drone in the Database
  DroneModel.create(myNewDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      let err = "Please check your input!";
      res.render("../views/drones/create-form.hbs", { err });
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id;
  DroneModel.findById(id)
    .then((drone) => {
      res.render("../views/drones/update-form.hbs", { drone });
      
    })
    .catch(() => {
      console.log("Something went wrong");
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id;
  const { myName, myProps, myMaxSpeed } = req.body;

  let editedDrone = {
    name: myName,
    propellers: myProps,
    maxSpeed: myMaxSpeed,
  };
  DroneModel.findByIdAndUpdate(id, editedDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      let message =
        "Something went wrong when Editing, please check your input!";
      res.render("../views/drones/update-form.hbs", { message });
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  let id = req.params.id;
  DroneModel.findByIdAndDelete(id)
      .then(() => {
        res.redirect("/drones");
      })
      .catch(() => {
        console.log("Something went wrong while deleting");
        res.redirect("/drones");
      });
});

module.exports = router;
