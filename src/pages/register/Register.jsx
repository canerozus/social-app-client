import { Link } from "react-router-dom"
import "./Register.scss"

const Register = () => {
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
                    <form>
                        <input type="text" placeholder='Username' />
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="text" placeholder='Name' />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register