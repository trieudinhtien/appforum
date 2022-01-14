import React, { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { callApiRegister } from '../../../apis/api'
import styled from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'



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
        const dataLogin = {
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
        <div className='container-fluid'>
            <div className='row'>
                <div className={styled.backgrounRegister+ " col-6"}>
                    <div className={styled.titleBGViking}>
                    <p>WELLCOME TO</p>
                    <h1>VIKINGER4</h1>
                    <p>The next generation Vikinger4 social community! Connect with your friends with full profiles, reactions, groups, followings , forum and much more to come!</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className={styled.wrapper_register1}>
                        <Form className={styled.wrapperForm1} onSubmit={(e) => handlerSubmit(e)}>
                            <div className={styled.titleForm1}>Wellcome to Vikinger4</div>
                            <div className={styled.subTitleForm1}>Connect to with frends and the wourld around you</div>

                            <Form.Group className='d-flex mb-2' controlId="formBasicEmail">
                                <Form.Control
                                    className={styled.formInput1}
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => { handleFormChange('firstName', e.target.value) }}
                                />
                                <Form.Control
                                    className={styled.formInput1 + " ml-2"}
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => { handleFormChange('lastName', e.target.value) }}
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
                            <Form.Group className='d-flex mb-2' controlId="formBasicPassword">
                                <Form.Control
                                    className={styled.formInput1}
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => { handleFormChange('password', e.target.value) }}
                                />
                                <Form.Control
                                    className={styled.formInput1 + " ml-2"}
                                    type="number"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => { handleFormChange('phone', e.target.value) }}
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
                        <Link to='/home'><i className="fas fa-long-arrow-alt-left"></i> Go to Vikinger</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    )
}


