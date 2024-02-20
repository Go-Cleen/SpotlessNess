const db = require("../db/config/mongodbConnection");
const { ObjectId } = require("mongodb");
const snap = require("../db/config/midtransConnection");
const Transaction = require("../models/transaction");

class ControllerTransaction {
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
        res.status(200).json({ message: "Payment success!" });
      } else {
        throw { error: "Payment failed!", status: 400 };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerTransaction;
