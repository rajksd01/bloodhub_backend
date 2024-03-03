import BloodRequest from "../models/bloodRequest-model.js";
import User from "../models/user-model.js";
const createBloodRequest = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userDetails = await User.findOne({ _id: userId });

    if (!userDetails) {
      return res.status(400).send({ error: "User not found" });
    }

    const { name, email, contactNumber } = userDetails;

    console.log(name, email, contactNumber);

    const bloodRequest = await new BloodRequest({
      id: req.body.id,
      requestorId: req.body.userId,
      requestorName: name,
      requestorEmail: email,
      requestorContactNumber: contactNumber,
      bloodType: req.body.bloodType,
      location: req.body.location,
      referenceDocument: req.body.referenceDocument,
      specialInstructions: req.body.specialInstructions,
    });

    await bloodRequest.save();

    console.log(bloodRequest);

    return res.status(200).send({ data: bloodRequest });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getAllBloodRequest = async (req, res) => {
  try {
    const bloodrequests = await BloodRequest.find();

    if (!bloodrequests) {
      return res.status(400).send({ error: "Blood Request not found" });
    }
    return res.status(200).send({ data: bloodrequests });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export { createBloodRequest ,getAllBloodRequest};
