import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as userService from "../../services/UserService";
import moment from "moment";

export default function UserShow() {
    const id = useLocation().state;
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userError, setUserError] = useState("");
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        if (id) {
            reloadUser(id);
        }  
    }, [id]);

    const reloadUser = async (id) => {
        try {
            const user = await userService.show(id);
            setUser(user);
            setCredentials(user.credentials);
        } catch (error) {
            console.error(error);
            setUserError(error);
        }
    }

    const addCredential = (id) => {
        navigate("/credential-form", {replace: false, state: id});
    }

    const onBack = () => {
        navigate(-1);
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    userError
                    ? (
                        <div>
                            <h2>Something is wrong, notify your System Administrator</h2>
                            <p>{ userError }</p>
                        </div>
                    )
                    : (
                        <div className="row p-2">
                            <div className="col-md-4 px-4 py-2">
                                <button className="btn btn-outline-primary border pl-5" onClick={onBack}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button>
                                <div className="card-body">
                                    <img
                                        src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                                        alt=""
                                        width="300"
                                        height="300"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 p-2">
                                <div className="card">
                                    <div className="card-header text-center">
                                        <h4 className="card-text">User - nº { user.id }</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="name" className="form-control-label">Name</label>
                                                <span className="form-control">{user.name}</span>
                                            </div>
                                            {
                                                credentials.map((c) => (
                                                    <div key={c.id}>
                                                        {
                                                            c.email ?
                                                            <div className="form-group">
                                                                <label htmlFor="email" className="form-control-label">Email - {c.id}</label>
                                                                <span className="form-control">{c.email}</span>
                                                            </div>
                                                            : <button type={'button'} className="btn btn-outline-primary mt-2 mb-2 mr-2" onClick={() => addCredential(user.id)}>add Credential</button>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <div className="form-group">
                                            <label htmlFor="created_at" className="form-control-label">Created At</label>
                                            <span className="form-control">{moment(user.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="updated_at" className="form-control-label">Updated At</label>
                                            <span className="form-control">{moment(user.updatedAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 p-2"></div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}