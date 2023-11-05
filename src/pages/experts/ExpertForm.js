import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as expertService from "../../services/ExpertService";

export default function ExpertForm() {
    const navigate = useNavigate();
    const [expert, setExpert] = useState("");
    const [expertInvalid, setExpertInvalid] = useState("");
    const expertFocus = useRef(null);

    useEffect(() => {expertFocus.current.focus();}, []);

    const onChangeExpert = (event) => {
        setExpertInvalid("")
        setExpert(event.target.value);
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

        if (!expert) {
            setExpertInvalid("Insert a Expert");
        } else {
            try {
                const response = await expertService.store({expert});
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
                            <h4 className="card-text">Add Expert</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="expert" className="form-control-label">
                                        { expertInvalid ? <span className="text-danger">{ expertInvalid }</span> : "Expert" }
                                    </label>
                                    <input
                                        type="text"
                                        id="expert"
                                        className="form-control"
                                        value={expert}
                                        onChange={onChangeExpert}
                                        ref={expertFocus}
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