// controllers/distributorController.js
const Distributor = require("../Models/Distributor");

// ✅ Get all distributors
exports.getAllDistributors = async (req, res) => {
  try {
    const distributors = await Distributor.find(
      {},
      "fullname email phoneNumber"
    );
    res.status(200).json(distributors);
  } catch (err) {
    res.status(500).json({ error: "❌ Error fetching distributors" });
  }
};

exports.addDistributor = async (req, res) => {
  const { fullname, email, phoneNumber } = req.body;
  try {
    const newDistributor = new Distributor({ fullname, email, phoneNumber });
    await newDistributor.save();
    res.status(201).json({ message: "✅ Distributor added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Error adding distributor" });
  }
};
