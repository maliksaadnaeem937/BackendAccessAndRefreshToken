import MyError from "../MiddleWare/error.js";
import responseMiddleWare from "../MiddleWare/response.js";
import { registeredUsers } from "../Schema/register.js";
import jwt from "jsonwebtoken";
class Login {
  static postLogin = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return MyError.passError(400, "Please Fill All Fields", res);
      }

      const isFoundInRegisteredUsers = await registeredUsers.findOne({ email });

      if (!isFoundInRegisteredUsers) {
        return MyError.passError(400, "Wrong email or password", res);
      }
      const payLoad = {
        user_id: isFoundInRegisteredUsers._id,
      };
      const accessToken = jwt.sign(payLoad, process.env.jwtSecretKey, {
        expiresIn: "1m",
      });
      const refreshToken = jwt.sign(payLoad, process.env.jwtSecretKey, {
        expiresIn: "60d",
      });

      return responseMiddleWare(
        200,
        { accessToken, refreshToken },
        "Login successful",
        res
      );
    } catch (e) {
      return MyError.errorMiddleWare(e, res);
    }
  };



  static protectedRoute=(req,res)=>{
    return responseMiddleWare(200,{user:req.user_id},'Grant Access',res)

  }
}

export default Login;