import apiAxios from "../config/ApiAxios";

export const postCredential = async ({email, password}) => {
    await apiAxios.post("/credentials", {email, password});
}