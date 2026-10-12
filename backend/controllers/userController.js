const User = require("../models/User");

const updateMyProfile = async (req, res, next) => {
  try {
    const { contactNumber, location } = req.body;

    // Accept only the fields this endpoint allows
    if (contactNumber === undefined && location === undefined) {
      return res.status(400).json({
        message: "Provide a contact number or location to update",
      });
    }

    const updates = {};

    if (contactNumber !== undefined) {
      if (typeof contactNumber !== "string" || !contactNumber.trim()) {
        return res.status(400).json({
          message: "Contact number must be a non-empty string",
        });
      }

      updates.contactNumber = contactNumber.trim();
    }

    if (location !== undefined) {
      if (typeof location !== "string" || !location.trim()) {
        return res.status(400).json({
          message: "Location must be a non-empty string",
        });
      }

      updates.location = location.trim();
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        location: user.location,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateMyProfile };
