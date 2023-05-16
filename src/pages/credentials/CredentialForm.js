import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as credentialService from "../../services/CredentialService";

export default function CredentialForm() {

    
    const [emailInvalid, setEmailInvalid] = useState("");
    const [email, setEmail] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState("");
    const [password, setPassword] = useState("");
    const [seeThePassword, setSeeThePassword] = useState(false);

    const navigate = useNavigate();
    const emailFocus = useRef(null);

    useEffect(() => {emailFocus.current.focus();}, []);

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
            toSave(event);
        }
    }

    const toSave = async (event) => {
        // Usado para não atualizar a página
        event.preventDefault();

        if (!email.match(/\S+@\S+\.\S+/)) {
            setEmailInvalid("Insert a valid email");
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/)) {
            setPasswordInvalid("Insert a valid password");
        } else {
            try {
                await credentialService.postCredential({email, password});
                navigate(-1);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const toSeeThePassword = () => {
        setSeeThePassword(!seeThePassword)
    }

    const onBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="row p-2">
                <div className="col-md-4 px-4 py-2">
                    <button className="btn btn-outline-primary border pl-5" onClick={onBack}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button>
                </div>
                <div className="col-md-4 p-2">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4 className="card-text">Add Credential</h4>
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
                            <button className="btn btn-outline-primary rounded-circle btn-lg" onClick={toSave}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-2"></div>
            </div>
        </>
    )
}