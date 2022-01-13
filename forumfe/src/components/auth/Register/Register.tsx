import React, { FormEvent, useState } from 'react'
import { Button,  Form } from 'react-bootstrap'
import { callApiRegister } from '../../../apis/api'
import styled from './register.module.css'
import { useNavigate } from 'react-router-dom';
import {v4} from 'uuid'



export const Register = () => {
    let navigate = useNavigate();
    // const uuidv4 = v4();
    const [formData, setDataForm] = useState<User>({
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
    });

    function handleFormChange(fieldName: string, value: string) {
        setDataForm({
            ...formData,
            [fieldName]: value,
        });
    }

    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("formData:", formData)
        const dataLogin={
            ...formData,
            id: (new Date()).getTime()
        }
        callApiRegister(dataLogin).then((data) => {
            console.log(data)
            alert('Register Successfully')
            navigate('/login');
        }).catch(err => alert("The username already exists. Please use a different username!"))
    }
    return (
        <div className={styled.wrapper_register1}>
            <Form className={styled.wrapperForm1} onSubmit={(e) => handlerSubmit(e)}>
                <div className={styled.titleForm1}>Wellcome to Vikinger4</div>
                <div className={styled.subTitleForm1}>Connect to with frends and the wourld around you</div>

                <Form.Group className='d-flex mb-2' controlId="formBasicEmail">
                    <Form.Control
                        className={styled.formInput1}
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => { handleFormChange('username', e.target.value) }}
                    />
                    <Form.Control
                        className={styled.formInput1 + " ml-2"}
                        type="number"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => { handleFormChange('phone', e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-2' controlId="formBasicEmail">
                    <Form.Control
                        className={styled.formInput1}
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => { handleFormChange('email', e.target.value) }}
                    />
                    
                </Form.Group>
                <Form.Group className='mb-2' controlId="formBasicPassword">
                    <Form.Control
                        className={styled.formInput1}
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => { handleFormChange('password', e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control
                        className={styled.formInput1}
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => { handleFormChange('address', e.target.value) }}
                    />
                </Form.Group>

                <Button className={styled.buttonForm1} variant="primary" type="submit">
                    Accept
                </Button>
            </Form>
        </div>
    )
}


