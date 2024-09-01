import jwt from "jsonwebtoken";
import MyError from "./error.js";
import responseMiddleWare from "./response.js";

export default async function ifLoggedGiveAccess(req, res, next) {
  try {
    const authHeaders = req.headers.authorization;

    const {refreshToken}= req.body;

    console.log('inside if logedin',refreshToken)
    if (!refreshToken || !authHeaders) {
console.log('token absent')
      return MyError.passError(400, "Login Again", res);

    }

    if (authHeaders && authHeaders.startsWith("Bearer ")) {
        console.log('header present')

      const accessToken = authHeaders.split(" ")[1];

    //   if (!accessToken) {

    //     return MyError.passError(400, "Login Again", res);

    //   }
    
      try {
      
        const payLoad=jwt.verify(accessToken, process.env.jwtSecretKey);
        
       console.log('access verified call next function')
        req.user_id=payLoad.user_id;

        return next();

      } catch (e) {
     console.log("access failed")
        try {

          const payLoad = jwt.verify(refreshToken, process.env.jwtSecretKey);
          console.log('refresh verified')
          

          const new_accessToken = jwt.sign({user_id:payLoad.user_id}, process.env.jwtSecretKey, {
            expiresIn: "1m",
          });

     console.log('new access token created',new_accessToken)
          req.new_accessToken=new_accessToken;
          req.user_id=payLoad.user_id;

          return next();

        } catch (e) {
          console.log('refreh access fail login again fail')

          return MyError.passError(400, "Login Again", res);

        }

      }

    }

  } catch (e) {

    return MyError.errorMiddleWare(e, res);

  }
}
