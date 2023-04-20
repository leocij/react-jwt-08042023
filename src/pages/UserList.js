import React, { useEffect, useState } from "react";
import moment from "moment";
import * as userService from "../services/UserService";

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState('')

    useEffect(() => {
        reloadUsers();
    }, []);

    const reloadUsers = async () => {
        try {
            const users = await userService.index();
            setUsers(users);
        } catch (error) {
            setUserError(error);
            console.error(error);
        }
    }

    console.log(users);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {
                            userError
                                ? (<div><h2>Something is wrong, notify your System Administrator</h2></div>)
                                : users.map(u => (
                                    <div className="col-md-3 p-2" key={u.id}>
                                        <div className="card">
                                            <div className="card-header"></div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <img
                                                            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                                                            alt="Avatar"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <p>{u.id}</p>
                                                        <p>{u.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p>{u.createdAt ? "Created at " + moment(u.createdAt).fromNow() : "There is no date record in the database"}</p>
                                                <p>{u.createdAt ? "Updated at " + moment(u.updatedAt).fromNow() : "There is no date record in the database"}</p>
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