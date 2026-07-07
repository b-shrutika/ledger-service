import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    async function UserLogin(e) {
        e.preventDefault();

    }
    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>Welcome back! Sign in to continue.</p>
                <form action="" onSubmit={() => {
                    UserLogin
                }}>

                    <input type="text" placeholder='Email' />
                    <input type="password" placeholder='password' />
                </form>
                <button type="submit">
                    Login
                </button>
                <p>
                <Link to="/register">Don't have an account?</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
