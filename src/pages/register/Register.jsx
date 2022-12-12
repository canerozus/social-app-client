import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./Register.scss"
import axios from "axios"


const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);

    } catch (err) {
      setErr(err.response.data);
    }
  };


  return (
    <div className='register'>
      <div className='card'>
        <div className='right'>
          <h1>Vuk Social.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span>Do you have an account ?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className='left'>
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input type="text" placeholder='Username' name="username" onChange={handleChange} />
            <input type="email" placeholder='Email' name="email" onChange={handleChange} />
            <input type="password" placeholder='Password' name="password" onChange={handleChange} />
            <input type="text" placeholder='Name' name="name" onChange={handleChange} />
            {err && err}
              <button type="submit">Register</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register