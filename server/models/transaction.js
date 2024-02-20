const snap = require("../db/config/midtransConnection");
const { ObjectId } = require("mongodb");
const db = require("../db/config/mongodbConnection");

module.exports = class Transaction {
  static async createTransaction(service, userInfo) {
    if(service.length < 1) {
      throw {error: "Service is required!", status: 400}
    }

    const instanceData = service.map((el) => {
      return {
        id: new ObjectId(String(el.id)),
        date: el.date,
        hour: el.hour,
      };
    });

    const serviceList = await db
      .collection("Service")
      .find({
        _id: { $in: [...new Set(instanceData.map((x) => x.id))] },
      })
      .toArray();

    const resultServiceList = serviceList.map((data, idx) => {
      return {
        ...data,
        date: instanceData[idx].date,
        hour: instanceData[idx].hour,
      };
    });

    // console.log(resultServiceList, "<<< ini result serviceList");
    let totalAmount = 0;

    resultServiceList.forEach((el) => {
      totalAmount += el.Price;
    });

    const { id } = userInfo;

    const createTransaction = await db.collection("Transaction").insertOne({
      userId: new ObjectId(String(id)),
      serviceList: resultServiceList,
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
        duration: 1,
        unit: "hour",
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

  static async getAllTransaction() {
    const data = await db
      .collection("Transaction")
      .find()
      .toArray();

    return data;
  }

  static async getTransactionById(id) {
    const data = await db.collection("Transaction").findOne(
      {
        _id: new ObjectId(String(id))
      }
    )

    if(!data) throw {error: "Data not found", status: 400}

    return data
  }

  static async getSuccessTransaction() {
    const data = await db.collection("Transaction").find(
      {
        status: "success"
      }
    ).toArray()

    return data;
  }

};
