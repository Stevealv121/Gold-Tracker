import React from "react";
import './login.css'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/authProvider";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div class="row">
            <div class="login-container col-lg-4 col-md-6 col-sm-8 col-xs-12">
                <div class="login-title text-center">
                    <h2><span>Stravia TEC</span></h2>
                </div>
                <div class="login-content">
                    <div class="login-header">
                        <h3><strong>Welcome,</strong></h3>
                        <h5>Please login below, with your credentials</h5>
                    </div>
                    <div class="login-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group ">
                                <div class="pos-r">
                                    <input id="form-username" type="text" name="form-username" placeholder="Username"
                                        formControlName="userName" class="form-username form-control" ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user} />
                                    <i class="fa fa-user"></i>
                                </div>
                            </div>
                            <div class="br">
                                <br />
                            </div>
                            <div class="form-group">
                                <div class="pos-r">
                                    <input id="form-password" type="password" name="form-password" placeholder="Password"
                                        formControlName="password" class="form-password form-control" onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required />
                                    <i class="fa fa-lock"></i>
                                </div>
                            </div>
                            <div class="br">
                                <br />
                            </div>
                            <div class="form-group text-right">
                                <a href="#" class="bold"> Forgot password?</a>
                            </div>

                            <div class="form-group">
                                <button id="buttons" type="submit" class="btn btn-primary form-control"><strong>Sign
                                    in</strong></button>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="br">
                    <br />
                </div>
                <div class="login-footer text-center template">
                    <h5>Don't have an account?<a href="/sign-up" class="bold"> Sign up </a> </h5>
                </div>
            </div>

        </div>
    );
}

export default Login;