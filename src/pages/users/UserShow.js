import React from 'react'
import { useLocation } from 'react-router-dom'

export default function UserShow() {

    const id = useLocation().state;

    return (
        <div>Hello from UserForm {console.log(id)}</div>
    )
}