import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import "./Login.scss"
import { login } from "../../store/AuthSlice"
import { useState } from "react"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log(login)
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
    navigate("/")
    setUsername("");
    setPassword("");
  }
  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span>Don't you have an account ?</span>
          <Link to="/register">
            <button >Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login