import React, { useEffect, useState } from "react";
import moment from "moment";
import * as expertService from "../../services/ExpertService";
import { useNavigate } from "react-router-dom";

export default function ExpertList() {
    const [experts, setExperts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => { reloadExperts(); }, []);

    const reloadExperts = async () => {
        try {
            const response = await expertService.index();
            if (response && response.sqlExecute) {
                setExperts(response.experts);
            } else {
                setError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    const onAdd = () => {
        navigate("/expert-form");
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <button className="btn btn-outline-primary" onClick={onAdd}>Add</button>  
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {
                            error
                            ? (<div><h2>Something is wrong, notify your System Administrator</h2></div>)
                            : experts.map(e => (
                                <div className="col-md-3 p-2" key={e.id}>
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
                                                        <p>{e.id}</p>
                                                        <p>{e.expert}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p>{e.createdAt ? "Created at " + moment(e.createdAt).fromNow() : "There is no date record in the database"}</p>
                                                <p>{e.createdAt ? "Updated at " + moment(e.updatedAt).fromNow() : "There is no date record in the database"}</p>
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