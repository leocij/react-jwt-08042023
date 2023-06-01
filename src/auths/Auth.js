import React, { useEffect, useState } from "react";
import Pages from "../Pages";
import LoadError from "./LoadError";
import Loading from "./Loading";
import Signin from "./Signin";
import * as AuthService from "../services/AuthService";

export default function Auth() {
    // const [authToken, setAuthToken] = useState("");
    const [swichToken, setSwichToken] = useState(1);
    const [statusError, setStatusError] = useState("");

    useEffect(() => {
        // const localToken = localStorage.getItem("auth-token");
        // setAuthToken(localToken);
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const {statusToken, statusError} = await AuthService.getCheckToken();

            if (statusToken) {
                setSwichToken(2);
            } else {
                setSwichToken(3);
                setStatusError(statusError);
            }
        } catch (error) {
            console.error(error);
            setSwichToken(4);
        }
    }

    if (swichToken === 1) {
        return <Loading />
    } else if (swichToken === 2) {
        return <Pages />
    } else if (swichToken === 3) {
        return <Signin statusError={statusError} />
    } else if (swichToken === 4) {
        return <LoadError />
    }
}