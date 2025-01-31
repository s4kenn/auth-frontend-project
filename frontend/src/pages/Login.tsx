import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils.ts";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialState = {
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

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = info;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = `http://localhost:3000/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();
      console.log(result);

      const { success, message, jwtToken, name } = result;

      if (!success) {
        return handleError(message);
      }

      setInfo(initialState);
      handleSuccess(message);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", name);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      handleError(`Server error`);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
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
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
