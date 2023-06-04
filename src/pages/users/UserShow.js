import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as userService from "../../services/UserService";

export default function UserShow() {
    const id = useLocation().state;
    const [user, setUser] = useState({});
    const [userError, setUserError] = useState("");

    useEffect(() => {
        reloadUser(id);
    }, [id]);

    const reloadUser = async (id) => {
        try {
            const user = await userService.show(id);
            setUser(user);
        } catch (error) {
            console.error(error);
            setUserError(error);
        }
    }

    return (
        <div>
            {
                userError
                ? (<div>{userError}</div>)
                : (<div>
                    <p>{user.id}</p>
                    <p>{user.name}</p>
                    <p>{user.createdAt}</p>
                    <p>{user.updatedAt}</p>
                </div>)
            }
        </div>
    )
}