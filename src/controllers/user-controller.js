import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { tokenSecret } from "../configs/ServerConfigs.js";
// TO CREATE USER
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactNumber: req.body.contactNumber,
      location: req.body.location,
      pincode: req.body.pincode,
    });
    // SuccessResponse.data = user;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    // ErrorResponse.error = error;
    res.status(400).send(error);
  }
};

// TO SIGNIN USER
async function signIn(req, res) {
  try {
    if (req.body) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const isPasswordMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPasswordMatched) {
          const token = await jwt.sign(user.name + user.email, tokenSecret);
          res.status(200).send({
            user: user,
            token: token,
          });
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.status(502).send({ error: "Couldn't Verify User , Bad Credentials" ,error});
  }
}

export { createUser,signIn };
