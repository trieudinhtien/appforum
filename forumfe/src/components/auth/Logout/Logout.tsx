import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { UserContext } from '../../../context/UserContext'

export const Logout = () => {

    const context = useContext(UserContext)
    console.log(context)
    
    const onLogout = () => {
        console.log("logout")
        localStorage.removeItem('user');
        context.setUser({
            "id": 0,
            "firstName": "",
            "lastName": "",
            "username": "",
            "email": "",
            "password": "",
            "cover": "",
            "avatar": "",
            "gender": "",
            "followings_id": [] as number[],
            "socialMedia": {
                "facebook": "",
                "instagram": "",
                "youtube": ""
            },
            "introduce": "",
            "phone": "",
            "birthday": "",
            "address": "",
            "status": false,
            "createdAt": 0,
            "modifiedAt": 0,
            "token": ""
        })
    }
    return (
        <div>
            <Button onClick={onLogout}>Logout</Button>
        </div>
    )
}
