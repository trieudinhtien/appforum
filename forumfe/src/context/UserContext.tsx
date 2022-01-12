import { createContext, useState, ReactElement } from "react";

interface Context {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}


const defaultData = {
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
}

function getUserFromStorge(): User {
    const userFromlocal = JSON.parse(localStorage.getItem('user')!)
    if (userFromlocal) {
        return userFromlocal
    } else {
        return defaultData
    }
}

const UserContext = createContext<Context>({
    user: getUserFromStorge(),
    setUser: () => { }
})

function UserContextProvider({ children }: { children: ReactElement }) {

    const [user, setUser] = useState(getUserFromStorge())

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