import {  registeredUsers } from "../Schema/register.js";
import MyError from "../MiddleWare/error.js";
import responseMiddleWare from "../MiddleWare/response.js";

class Registration {
  static postRgister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return MyError.passError(400, "Please Fill All Fields", res);
    }

    // if email already exists

    try {
      //   const isFoundInUnverfiedUsers = unverifiedUsers.findOne({ email });

      const isFoundInRegisteredUsers =await registeredUsers.findOne({ email });
    

      if (isFoundInRegisteredUsers) {
        return MyError.passError(409, "Duplicate Email", res);
      }

      const newUser = new registeredUsers({
        name,
        email,
        password,
      });

      const savedUser = await newUser.save();

      return responseMiddleWare(201, savedUser, "User Created", res);
    } catch (e) {
      return MyError.errorMiddleWare(e, res);
    }
  };
}


export default Registration;
