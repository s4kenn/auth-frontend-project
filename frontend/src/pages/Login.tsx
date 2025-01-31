function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
