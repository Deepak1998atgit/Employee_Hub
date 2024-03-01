import { JwtPayload,jwtDecode} from "jwt-decode";

// Define interfaces for the payload and the decoded token
interface Payload {
  email: string;
  Id: string;
  role: string;
}

interface DecodedToken extends JwtPayload {
  exp: number;
  iat: number;
  payload: Payload;
}

// Define a function to decode the JWT token
const decodeJwtToken = (jwtToken: string): DecodedToken | null => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(jwtToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

export default decodeJwtToken;

