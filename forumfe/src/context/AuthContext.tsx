import React, { createContext, ReactNode, useState } from "react";

interface authenContextProps{
    children: ReactNode
}

interface Iauthcontext {
    id: number,
    username: string,
    email: string,
    token: string,
    modifiedAt: number,
    createdAt: number
}

const defaultValue = {
    id: 0,
    username: "",
    email: "",
    token: "",
    modifiedAt: 0,
    createdAt: 0
}

export const AuthContext = createContext<any>(defaultValue);


const AuthContextProvider = ({children}: authenContextProps) => {
    const [user, setUser] = useState<any>(defaultValue)
    
    
    const passDataToContext = (data: Iauthcontext) => {
        setUser(data)
    }

    const value = {
        user,
        passDataToContext,
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;


