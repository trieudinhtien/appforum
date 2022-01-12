import React, {FC} from 'react'
import { Navigate } from 'react-router-dom';


interface Props {
    moveTo: string,
}

var checklocal = (): boolean => {
    let token = localStorage.getItem('user');
    if(token) return true;
    return false;
}

export const AuthGuard:FC<Props> = (props) => {
    const {moveTo, children} = props
    return (
        <>
        {
            checklocal() ?
            children
            : <Navigate to={moveTo} />
        }
        </>
    )
}

