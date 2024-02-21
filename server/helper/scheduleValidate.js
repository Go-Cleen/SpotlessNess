const db = require("../db/config/mongodbConnection");
const nodemailer = require("nodemailer");

async function updateStatus() {
  try {
    const currentDate = new Date();

    await db.collection("Schedule").updateMany(
      {
        scheduleTime: { $lt: currentDate },
        status: "Ongoing",
      },
      {
        $set: {
          status: "Completed",
        },
      }
    );

    await db.collection("Transaction").updateMany(
      {
        transactionExpired: { $lt: currentDate },
        status: "pending",
      },
      {
        $set: {
          status: "expired",
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

module.exports = updateStatus;
