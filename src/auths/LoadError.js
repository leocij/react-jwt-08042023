import React from "react";

export default function Signin() {
    return (
        <div className="text-center">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <h2 className="text-danger">Load Error</h2>
            </div>
            <button 
                className="btn btn-outline-primary btn-lg" 
                onClick={() => window.location.reload(false)}
            >
                Click here to reload when server is on-line
            </button>
        </div>
    )
}