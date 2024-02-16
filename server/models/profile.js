const db = require("../db/config/mongodbConnection");

class Profile {
  static async createProfile(data) {
    const validateProfile = await db.collection("Profile").findOne({
      userId: data.userId,
    });

    if (validateProfile) {
      throw { error: "Profile already exist!", status: 401 };
    }

    const response = await db.collection("Profile").insertOne(data);

    return response;
  }

  static async getUserProfile(data) {
    const userData = await db
      .collection("User")
      .aggregate([
        {
          $match: {
            email: data,
          },
        },
        {
          $lookup: {
            from: "Profile",
            localField: "_id",
            foreignField: "userId",
            as: "userProfile",
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ])
      .toArray();

    if (userData.length < 1) {
      throw { error: "User not found", status: 401 };
    }

    return userData[0];
  }
}

module.exports = Profile;
