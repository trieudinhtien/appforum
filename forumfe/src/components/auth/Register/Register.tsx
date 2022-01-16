import React, { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { callApiRegister } from '../../../apis/api'
import styled from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import userImg from '../../../images/avatar/user.png'
import coverImg from '../../../images/cover/cover-page.jpg'
import swal from 'sweetalert';

export const Register = () => {
    let navigate = useNavigate();
    const initialData = {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "username": "",
        "email": "",
        "password": "",
        "cover": coverImg,
        "avatar": userImg,
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
    const [formData, setDataForm] = useState<User>(initialData);
    const [formErr, setFormErr] = useState<FeildValidate>({
        "firstName": "",
        "lastName": "",
        "username": "",
        "email": "",
        "password": "",
        "address": "",
        "phone": ""

    });

    function validate(formData: User) {
        const errors = {
            "firstName": "",
            "lastName": "",
            "username": "",
            "email": "",
            "password": "",
            "address": "",
            "phone": ""
        };
        if (!formData.firstName) {
            errors.firstName = `First Name is required`;
        } else {
            errors.firstName = '';
        }
        if (!formData.lastName) {
            errors.lastName = `Last Name is required`;
        } else {
            errors.lastName = '';
        }
        if (!formData.username) {
            errors.username = `User name is required`;
        } else {
            errors.username = '';
        }
        if (!formData.email) {
            errors.email = `Email is required`;
        } else {
            errors.email = '';
        }
        if (!formData.password) {
            errors.password = `Password is required`;
        } else {
            errors.password = '';
        }
        if (!formData.address) {
            errors.address = `address is required`;
        } else {
            errors.address = '';
        }
        if (!formData.phone) {
            errors.phone = `phone is required`;
        } else if (formData.phone.length < 10) {
            errors.phone = 'Phone number must have 10 digit';
        } else {
            errors.phone = '';
        }

        setFormErr(errors);
    }

    function handleFormChange(fieldName: string, value: string) {
        setDataForm({
            ...formData,
            [fieldName]: value,
        });
        
    }

    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("formData:", formData)

        const dataRegister = {
            ...formData,
            id: (new Date()).getTime()
        }
        validate(formData);
        if (formData.username && formData.email && formData.password && formData.firstName && formData.lastName && formData.phone && formData.address) {
            console.log("hihi")
            callApiRegister(dataRegister).then((data) => {
                console.log(data)
                swal({
                    title: "Are you sure?",
                    text: "Please make sure the information is correct",
                    icon: "warning",
                    dangerMode: true,
                  })
                  .then(willDelete => {
                    if (willDelete) {
                      swal("Success", "Account has been created", "success");
                    }
                    navigate('/login');
                  });
            }).catch(err => console.log(err))
        }
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className={styled.backgrounRegister + " col-6"}>
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
                            <div className='d-flex w-100'>

                                <Form.Group className='w-50 mb-4'>
                                    <Form.Control
                                        className={styled.formInput1}
                                        style={{ width: "95%" }}
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => { handleFormChange('firstName', e.target.value) }}
                                    />
                                    {
                                        formErr.firstName
                                            ? (
                                                <Form.Text className={"text-danger " + styled.textErr}>
                                                    {formErr.firstName}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                                <Form.Group className='w-50 mb-4' controlId="formBasicEmail">
                                    <Form.Control
                                        className={styled.formInput1}
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => { handleFormChange('lastName', e.target.value) }}
                                    />
                                    {
                                        formErr.lastName
                                            ? (
                                                <Form.Text className={"text-danger " + styled.textErr}>
                                                    {formErr.lastName}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                            </div>
                            <Form.Group className='mb-4'>
                                <Form.Control
                                    className={styled.formInput1}
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => { handleFormChange('username', e.target.value) }}
                                />
                                {
                                    formErr.username
                                        ? (
                                            <Form.Text className={"text-danger " + styled.textErr}>
                                                {formErr.username}
                                            </Form.Text>
                                        )
                                        : null
                                }
                            </Form.Group>
                            <Form.Group className='mb-4' controlId="formBasicEmail">
                                <Form.Control
                                    className={styled.formInput1}
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => { handleFormChange('email', e.target.value) }}
                                />
                                {
                                    formErr.email
                                        ? (
                                            <Form.Text className={"text-danger " + styled.textErr}>
                                                {formErr.email}
                                            </Form.Text>
                                        )
                                        : null
                                }
                            </Form.Group>
                            <div className='d-flex w-100'>


                                <Form.Group className='w-50 mb-4' controlId="formBasicPassword">

                                    <Form.Control
                                        className={styled.formInput1}
                                        style={{ width: "95%" }}
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => { handleFormChange('password', e.target.value) }}
                                    />
                                    {
                                        formErr.password
                                            ? (
                                                <Form.Text className={"text-danger " + styled.textErr}>
                                                    {formErr.password}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                                <Form.Group className='w-50 mb-4' controlId="formBasicPassword">
                                    <Form.Control
                                        className={styled.formInput1}
                                        type="number"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => { handleFormChange('phone', e.target.value) }}
                                    />
                                    {
                                        formErr.phone
                                            ? (
                                                <Form.Text className={"text-danger " + styled.textErr}>
                                                    {formErr.phone}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                            </div>
                            <Form.Group className='mb-4'>
                                <Form.Control
                                    className={styled.formInput1}
                                    type="text"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={(e) => { handleFormChange('address', e.target.value) }}
                                />
                                {
                                    formErr.address
                                        ? (
                                            <Form.Text className={"text-danger " + styled.textErr}>
                                                {formErr.address}
                                            </Form.Text>
                                        )
                                        : null
                                }
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


