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
  const navigate = useNavigate()
  const [err, setErr] = useState(null);
  const [createData, setCreateData] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs).then((res) => {
        const data = res.data
        setCreateData(data)
        setTimeout(() => {
          navigate("/login")
        }, 1500)

      })
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
            <input type="text" placeholder='Username' name="username" required onChange={handleChange} />
            <input type="email" placeholder='Email' name="email" required onChange={handleChange} />
            <input type="password" placeholder='Password' name="password" required onChange={handleChange} />
            <input type="text" placeholder='Name' name="name" required onChange={handleChange} />
            {err && err}
            {createData && createData}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register