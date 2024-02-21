const db = require("../db/config/mongodbConnection");
const { ObjectId } = require("mongodb");
const snap = require("../db/config/midtransConnection");
const Transaction = require("../models/transaction");

class TransactionController {
  static async InitiateMidTrans(req, res, next) {
    try {
      const data = req.body;

      const result = await Transaction.createTransaction(data, req.user);

      res.json({
        message: "Transaction created",
        transactionToken: result.transactionToken,
        orderId: result.orderId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    console.log(req.body);
    try {
      if (
        req.body.transaction_status === "capture" &&
        req.body.fraud_status === "accept"
      ) {
        await db.collection("Transaction").updateOne(
          {
            _id: new ObjectId(String(req.body.order_id)),
          },
          {
            $set: {
              status: "success",
              paidDate: new Date(),
            },
          }
        );

        const transactionData = await db.collection("Transaction").findOne({
          _id: new ObjectId(String(req.body.order_id)),
        });

        const scheduleList = transactionData.serviceList;

        const resultSchedule = scheduleList.map((el) => {
          let scheduleDate = new Date(`${el.date}T${el.hour}:00`);
          return {
            serviceId: el._id,
            userId: transactionData.userId,
            Service: el.Service,
            Price: el.Price,
            ImageUrl: el.ImageUrl,
            Description: el.Description,
            status: "Ongoing",
            scheduleTime: scheduleDate,
          };
        });

        await db.collection("Schedule").insertMany(resultSchedule);

        res.status(200).json({ message: "Payment success!" });
      } else {
        throw { error: "Payment failed!", status: 400 };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllTransaction(req, res, next) {
    try {
      const result = await Transaction.getAllTransaction();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Transaction.getTransactionById(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getSuccessTransaction(req, res, next) {
    try {
      const result = await Transaction.getSuccessTransaction();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
