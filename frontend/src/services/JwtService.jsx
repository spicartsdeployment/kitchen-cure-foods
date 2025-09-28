// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const AccessToken = "authToken"

// const validateJWT = (token) => {
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] });
//     return decoded;
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       console.log("Token has expired!");
//     } else {
//       console.log("Invalid token!");
//     }
//   }
// };

export const getLocalAccessToken = () => {
  return localStorage.getItem(AccessToken);
};

export const getLocalAccessTokenName = () => {
  return AccessToken;
};

export const getProfileFromToken = (response) => {
  var token = "";

  if (!response) {
    token = localStorage.getItem(AccessToken);
    if (!token) return null;
  }

  token = response.access_token;
  if (!token) return null;

  try {
    const decodedJWT = jwtDecode(token);
    return {
      name: decodedJWT.name,
      email: decodedJWT.email,
      ...decodedJWT,
    };
  } catch {
    return null;
  }
};
