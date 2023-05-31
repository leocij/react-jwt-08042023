import React, { useEffect, useRef, useState } from "react";
import * as authService from "../services/AuthService";

export default function Signin({statusError}) {
    const [signinStatusError, setSigninStatusError] = useState(statusError)
    const [emailInvalid, setEmailInvalid] = useState("");
    const [email, setEmail] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState("");
    const [password, setPassword] = useState("");
    const [seeThePassword, setSeeThePassword] = useState(false);

    const emailFocus = useRef(null);

    useEffect(() => {
        emailFocus.current.focus();
        setSigninStatusError(statusError);
    }, [statusError]);

    const onChangeEmail = (event) => {
        setEmailInvalid("");
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPasswordInvalid("");
        setPassword(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            toSignin(event);
        }
    }

    const toSignin = async (event) => {
        // Usado para não atualizar a página
        event.preventDefault();

        if (!email.match(/\S+@\S+\.\S+/)) {
            setEmailInvalid("Insert a valid email");
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/)) {
            setPasswordInvalid("Insert a valid password");
        } else {
            try {
                const token = await authService.postSignIn({email, password});
                localStorage.setItem('auth-token', token);
                window.location.reload();
                return false;
            } catch (error) {
                console.error(error);
                setSigninStatusError(error.response.data);
            }
        }
    }

    const toSeeThePassword = () => {
        setSeeThePassword(!seeThePassword)
    }

    return (
        <>
            {
                signinStatusError
                    ? (
                        <div className="row p-2 border border-danger d-flex justify-content-center">
                            <h4 className="text-danger">{signinStatusError ? signinStatusError + '. Try sign in again' : ''}</h4>
                        </div>
                    )
                    : <></>
            }
            <div className="row p-2">
                <div className="col-md-4 p-2"></div>
                <div className="col-md-4 p-2">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4 className="card-text">Sign In</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-control-label">
                                        { emailInvalid ? <span className="text-danger">{ emailInvalid }</span> : "Email" }
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={onChangeEmail}
                                        ref={emailFocus}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-control-label">
                                        { passwordInvalid ? <span className="text-danger">{ passwordInvalid }</span> : "Password" }
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type={ seeThePassword ? "text" : "password" }
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={onChangePassword}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text" onClick={toSeeThePassword}>
                                                { seeThePassword ? "Hide" : "Show" }
                                            </span>
                                        </div>
                                        <span>* Password must be at least one uppercase, one lowercase, one special character and one number</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-outline-primary rounded-circle btn-lg" onClick={toSignin}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-2"></div>
            </div>
        </>
    )
}