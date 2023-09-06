import React, { useEffect, useState } from "react";
import moment from "moment";
import * as expertiseService from "../../services/ExpertiseService";
// import { useNavigate } from "react-router-dom";

export default function ExpertiseList() {
    const [expertises, setExpertises] = useState([]);
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    useEffect(() => { reloadExpertises(); }, []);

    const reloadExpertises = async () => {
        try {
            const response = await expertiseService.index();
            if (response && response.sqlExecute) {
                setExpertises(response.expertises);
            } else {
                setError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    // const onAdd = () => {
    //     navigate("/expertise-form");
    // }

    return (
        <>
            {/* <div className="card">
                <div className="card-body">
                        <label>Search:&nbsp;&nbsp;</label>
                        <input type="text" onChange={(event) => handleSearch(event)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-outline-primary" onClick={onAdd}>Add</button>  
                </div>
            </div> */}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {
                            error
                            ? (<div><h2>Something is wrong, notify your System Administrator</h2></div>)
                            : expertises.map(e => (
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
                                                        <p>{e.expertise}</p>
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