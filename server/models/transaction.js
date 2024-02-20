const snap = require("../db/config/midtransConnection");
const { ObjectId } = require("mongodb");
const db = require("../db/config/mongodbConnection");

module.exports = class Transaction {
  static async createTransaction(service, userInfo) {

    const instanceData = service.map((el) => {
      return new ObjectId(String(el));
    });

    const serviceList = await db
      .collection("Service")
      .find({
        _id: { $in: instanceData },
      })
      .toArray();

    let totalAmount = 0;

    serviceList.forEach((el) => {
      totalAmount += el.Price;
    });

    const { id } = userInfo;

    const createTransaction = await db.collection("Transaction").insertOne({
      userId: new ObjectId(String(id)),
      serviceList: serviceList,
      status: "pending",
      amount: totalAmount,
      transactionDate: new Date(),
      transactionIdMidtrans: null,
    });

    const parameter = {
      transaction_details: {
        order_id: createTransaction.insertedId,
        gross_amount: totalAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: userInfo.email,
        first_name: userInfo.username,
      },
      page_expiry: {
        duration: 5,
        unit: "minute",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    let transactionToken = transaction.token;

    const updateTransaction = await db.collection("Transaction").updateOne(
      {
        _id: createTransaction.insertedId,
      },
      {
        $set: {
          transactionIdMidtrans: transactionToken,
        },
      }
    );

    return {
      transactionToken,
      orderId: createTransaction.insertedId,
    };
  }
};
