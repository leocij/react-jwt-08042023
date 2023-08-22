import React, { useEffect, useState } from "react";
import moment from "moment";
import * as clinicService from "../../services/ClinicService";
import { useNavigate } from "react-router-dom";

export default function ClinicList() {
    const [clinics, setClinics] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => { reloadClinics(); }, []);

    const reloadClinics = async () => {
        try {
            const response = await clinicService.index();
            if (response && response.sqlExecute) {
                setClinics(response.clinics);
            } else {
                setError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    const onAdd = () => {
        navigate("/clinic-form");
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                        {/* <label>Search:&nbsp;&nbsp;</label>
                        <input type="text" onChange={(event) => handleSearch(event)} />
                        &nbsp;&nbsp;&nbsp;&nbsp; */}
                        <button className="btn btn-outline-primary" onClick={onAdd}>Add</button>  
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {
                            error
                            ? (<div><h2>Something is wrong, notify your System Administrator</h2></div>)
                            : clinics.map(c => (
                                <div className="col-md-3 p-2" key={c.id}>
                                    <div className="card">
                                        <div className="card-header"></div>
                                        <div className="card-body">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <img
                                                            src="https://png.pngtree.com/element_origin_min_pic/16/11/03/dda587d35b48fd01947cf38931323161.jpg"
                                                            alt="Avatar"
                                                            width="60"
                                                            height="60"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <p>{c.id}</p>
                                                        <p>{c.corporateName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p>{c.createdAt ? "Created at " + moment(c.createdAt).fromNow() : "There is no date record in the database"}</p>
                                                <p>{c.createdAt ? "Updated at " + moment(c.updatedAt).fromNow() : "There is no date record in the database"}</p>
                                            </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}