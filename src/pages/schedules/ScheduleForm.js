import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as clinicService from "../../services/ClinicService";
import * as expertiseService from "../../services/ExpertiseService";
import * as expertService from "../../services/ExpertService";

export default function ScheduleForm() {
    const [clinics, setClinics] = useState([]);
    const [clinicsError, setClinicsError] = useState("");
    const [expertises, setExpertises] = useState([]);
    const [expertisesError, setExpertisesError] = useState("");
    const [experts, setExperts] = useState([]);
    const [expertsError, setExpertsError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        reloadClinics();
        reloadExpertises();
        reloadExperts();
    }, []);

    const reloadClinics = async () => {
        try {
            const response = await clinicService.index();
            if (response && response.sqlExecute) {
                setClinics(response.clinics);
            } else {
                setClinicsError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setClinicsError(error);
        }
    }

    const reloadExpertises = async () => {
        try {
            const response = await expertiseService.index();
            if (response && response.sqlExecute) {
                setExpertises(response.expertises);
            } else {
                setExpertisesError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setExpertisesError(error);
        }
    }

    const reloadExperts = async () => {
        try {
            const response = await expertService.index();
            if (response && response.sqlExecute) {
                setExperts(response.experts);
            } else {
                setExpertsError(response.sqlResponse);
            }
        } catch (error) {
            console.error(error);
            setExpertsError(error);
        }
    }

    const onBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="row p-2">
                <div className="col-md-4 px-4 py-2">
                    <button className="btn btn-outline-primary border pl-5" onClick={onBack}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button>
                </div>
                <div className="col-md-4 p-2">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4 className="card-text">Add Schedule</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="clinics" className="form-label mt-4">Clinics</label>
                                    <select className="form-select" id="clinics">
                                        {
                                            clinicsError
                                            ? <option>Something is wrong, notify your System Administrator</option>
                                            : clinics.map(c => (
                                                <option>{c.corporateName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="expertises" className="form-label mt-4">Expertises</label>
                                    <select className="form-select" id="expertises">
                                        {
                                            expertisesError
                                            ? <option>Something is wrong, notify your System Administrator</option>
                                            : expertises.map(e => (
                                                <option>{e.expertise}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="experts" className="form-label mt-4">Experts</label>
                                    <select className="form-select" id="experts">
                                        {
                                            expertsError
                                            ? <option>Something is wrong, notify your System Administrator</option>
                                            : experts.map(e => (
                                                <option>{e.expert}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-outline-primary rounded-circle btn-lg" >Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-2"></div>
            </div>
        </>
    )
}