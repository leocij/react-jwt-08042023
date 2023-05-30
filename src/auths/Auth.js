import React, { useEffect, useState } from "react";
import Pages from "../Pages";
import LoadError from "./LoadError";
import Loading from "./Loading";
import Signin from "./Signin";
import * as AuthService from "../services/AuthService";

export default function Auth() {
    const [authToken, setAuthToken] = useState("");
    const [statusToken, setStatusToken] = useState(1);
    const [statusError, setStatusError] = useState("");

    useEffect(() => {
        const localToken = localStorage.getItem("auth-token");
        setAuthToken(localToken);
        checkToken(localToken);
    }, []);

    const checkToken = async (token) => {
        try {
            const {status_token, status_error} = await AuthService.getCheckToken(token);

            if (status_token) {
                setStatusToken(2);
            } else {
                setStatusToken(3);
                setStatusError(status_error);
            }
        } catch (error) {
            console.error(error);
            setStatusToken(4);
        }
    }

    if (statusToken === 1) {
        return <Loading />
    } else if (statusToken === 2) {
        return <Pages />
    } else if (statusToken === 3) {
        return <Signin />
    } else if (statusToken === 4) {
        return <LoadError />
    }
}