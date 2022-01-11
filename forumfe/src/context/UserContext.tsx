import { createContext, useState, ReactElement } from "react";
import { User } from "../react-app-env";

interface Context {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserContext = createContext<Context>({ user: {
    "id": 0,
    "firstName": "",
    "lastName": "",
    "username": "",
    "email": "",
    "password": "",
    "cover": "",
    "avatar": "",
    "gender": "",
    "socialMedia": {
        "facebook": "",
        "instagram": "",
        "youtube": ""
    },
    "phone": "",
    "birthday": "",
    "address": "",
    "status": false,
    "createdAt": 0,
    "modifiedAt": 0,
    "token": ""
}, setUser: () => { } })

function UserContextProvider({ children }: { children: ReactElement }) {

    const [user, setUser] = useState({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "username": "",
        "email": "",
        "password": "",
        "cover": "",
        "avatar": "",
        "gender": "",
        "socialMedia": {
            "facebook": "",
            "instagram": "",
            "youtube": ""
        },
        "phone": "",
        "birthday": "",
        "address": "",
        "status": false,
        "createdAt": 0,
        "modifiedAt": 0,
        "token": ""
    })

    const value = {
        user: user,
        setUser: setUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserContextProvider }