import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as clinicService from "../../services/ClinicService";

export default function ClinicForm() {
    const navigate = useNavigate();
    const [cnpj, setCnpj] = useState("");
    const [cnpjInvalid, setCnpjInvalid] = useState("");
    const [corporateName, setCorporateName] = useState("");
    const [corporateNameInvalid, setCorporateNameInvalid] = useState("");
    const cnpjFocus = useRef(null);

    useEffect(() => {cnpjFocus.current.focus();}, []);

    const onChangeCnpj = (event) => {
        setCnpjInvalid("")
        setCnpj(event.target.value);
    }

    const onChangeCorporateName = (event) => {
        setCorporateNameInvalid("")
        setCorporateName(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            toSave(event);
        }
    }

    const onBack = () => {
        navigate(-1);
    }

    const toSave = async (event) => {
        event.preventDefault();

        if (!cnpj.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)) {
            setCnpjInvalid("Insert a valid CNPJ");
        } else if (!corporateName) {
            setCorporateNameInvalid("Insert a CorporateName");
        } else {
            try {
                const response = await clinicService.store({cnpj, corporateName});
                if (response && response.sqlExecute) {
                    navigate(-1);
                } else {
                    console.error(response.sqlResponse);
                }
            } catch (error) {
                console.error(error);
            }
        }
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
                            <h4 className="card-text">Add Clinic</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="cnpj" className="form-control-label">
                                        { cnpjInvalid ? <span className="text-danger">{ cnpjInvalid }</span> : "CNPJ" }
                                    </label>
                                    <input
                                        type="text"
                                        id="cnpj"
                                        className="form-control"
                                        value={cnpj}
                                        onChange={onChangeCnpj}
                                        ref={cnpjFocus}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="corporateName" className="form-control-label">
                                        { corporateNameInvalid ? <span className="text-danger">{ corporateNameInvalid }</span> : "Corporate Name" }
                                    </label>
                                    <input
                                        type="text"
                                        id="corporateName"
                                        className="form-control"
                                        value={corporateName}
                                        onChange={onChangeCorporateName}
                                        onKeyDown={handleKeyDown}
                                    />
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