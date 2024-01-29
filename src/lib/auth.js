import axios from "axios";
import * as Yup from "yup";

export default async function signupUser({email, password,confirmPassword}) {
  try {
    const response = await axios.post("http://localhost:3000/api/signup", {
      email,
      password
    });

    return response.data;
  } catch (error) {
    throw new Error("Signup failed: " + error.response.data.error);
  }
}

export const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

