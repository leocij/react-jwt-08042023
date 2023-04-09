import React, { useEffect, useState } from "react";
import * as userService from '../services/UserService';

export default function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        reloadUsers();
    }, []);

    const reloadUsers = async () => {
        try {
            const users = await userService.index();
            setUsers(users);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>{console.log(users)}</div>
    )
}