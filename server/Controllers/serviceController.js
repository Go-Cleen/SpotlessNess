const db = require("../db/config/mongodbConnection");
const Service = require("../models/service");

module.exports = class ServiceController {
  // static async seeding(req, res, next) {
  //   try {
  //     console.log("masuk");
  //     const data = require("../../db/service.json");
  //     console.log(data.services, "<<< ini data");
  //     const result = await db.collection("Service").insertMany(data.services);
  //     if (result) {
  //       res.status(200).json(result);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async getService(req, res, next) {
    try {
      const result = await Service.getService();

      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getServiceById(req, res, next) {
    try {
      const result = await Service.getServiceById(req.params.id);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addService(req, res, next) {
    try {
      const result = await Service.addService(req.body);

      res.status(200).json({message: "Service has been added!", status: 201});
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const {id} = req.params;
      const result = await Service.deleteService(id);

      if(result) {
        res.status(200).json({message: "Service has been deleted!"})
      }
    } catch (error) {
      next(error);
    }
  }
};
