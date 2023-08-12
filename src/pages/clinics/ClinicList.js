import React, { useEffect, useState } from "react";
import * as clinicService from "../../services/ClinicService";

export default function ClinicList() {
    const [clinics, setClinics] = useState([]);
    const [error, setError] = useState("");

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
    return (
        <div>
            {
                error
                ? (<div><h2>Something is wrong, notify your System Administrator</h2></div>)
                : clinics.map(c => (
                    <div key={c.id}>
                        <p>{c.cnpj}</p>
                        <p>{c.corporateName}</p>
                        <p>{c.createdAt}</p>
                        <p>{c.updatedAt}</p>
                    </div>
                ))
            }
        </div>
    )
}