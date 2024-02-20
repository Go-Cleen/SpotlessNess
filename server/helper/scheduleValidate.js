const db = require("../db/config/mongodbConnection");

async function updateStatus() {
  try {
    const currentDate = new Date();
    const result = await db.collection("Schedule").updateMany(
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
  } catch (error) {
    throw error;
  }
}

module.exports = updateStatus;
