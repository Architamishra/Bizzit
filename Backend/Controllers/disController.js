const Distributor = require("../Models/Distributor");

exports.getDistributorById = async (req, res) => {
  try {
    const { distributorId } = req.params;

    // Validate distributorId
    if (!mongoose.Types.ObjectId.isValid(distributorId)) {
      return res
        .status(400)
        .json({ message: "❌ Invalid Distributor ID format" });
    }

    // Find distributor
    const distributor = await Distributor.findById(distributorId);
    if (!distributor) {
      return res.status(404).json({ message: "🚫 Distributor not found" });
    }

    res.status(200).json(distributor);
  } catch (error) {
    console.error("❌ Error fetching distributor:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
};
