import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils.ts";

function SignUp() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [info, setInfo] = useState(initialState);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const { name, email, password } = info;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = `http://localhost:3000/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();
      if (!result) {
        return handleError("Failed to sign up");
      }

      setInfo(initialState);
      return handleSuccess("Signup successful");
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={info.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={info.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={info.password}
            />
          </div>
          <button type="submit">Signup</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
