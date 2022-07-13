import React from "react";
import './login.css'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/authProvider";
import httpCommon from "../http-common";
const LOGIN_URL = '/users';

const Login = props => {
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

        try {
            const response = await httpCommon.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

        if (success) {
            login();
        }
    }

    const login = () => {
        props.login(user)
        props.history.push("/home")
    }

    return (
        <div class="row">
            <div class="login-container col-lg-4 col-md-6 col-sm-8 col-xs-12">
                <div class="login-title text-center">
                    <h2><span>Gold Tracker</span></h2>
                </div>
                <div class="login-content">
                    <div class="login-header">
                        <h3><strong>Welcome,</strong></h3>
                        <h5>Please login below, with your credentials</h5>
                    </div>
                    <div className="login-error">
                        <p id="error" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                    <div class="login-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group ">
                                <div class="pos-r">
                                    <input id="form-username" type="text" name="form-username" placeholder="Username"
                                        class="form-username form-control" ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user} required />
                                    <i class="fa fa-user"></i>
                                </div>
                            </div>
                            <div class="br">
                                <br />
                            </div>
                            <div class="form-group">
                                <div class="pos-r">
                                    <input id="form-password" type="password" name="form-password" placeholder="Password"
                                        class="form-password form-control" onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required />
                                    <i class="fa fa-lock"></i>
                                </div>
                            </div>
                            <div class="br">
                                <br />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary form-control"><strong>Sign
                                    in</strong></button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;