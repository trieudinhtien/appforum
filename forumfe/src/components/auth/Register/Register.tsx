import React, { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { callApiRegister } from '../../../apis/api'
import styled from './register.module.css'

interface registerForm {
    username: string,
    email: string,
    password: string
}


export const Register = () => {
    const [formData, setDataForm] = useState<registerForm>({
        username: "",
        email: "",
        password: ""
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
        callApiRegister(formData).then((data) => {
            console.log(data)
            alert('Register Successfully')
        })
        .catch(err => alert("The username already exists. Please use a different username!"))
        setDataForm({
            username: "",
            email: "",
            password: ""
        })
    }
    
    return (
        <div className={styled.wrapper_register1}>
            <Form className={styled.wrapperForm1} onSubmit={(e)=> handlerSubmit(e)}>
                <img className={styled.logo1} width={100} height={100} src="https://png.pngtree.com/templates_detail/20180906/simple-negative-space-viking-logo-design-template-png_31600.jpg" alt='logo' />
                <div className={`display-4 ${styled.titleForm1}`}>Register</div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        className={styled.formInput1}
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => { handleFormChange('username', e.target.value) }}
                    />
                </Form.Group>
                <Form.Group  controlId="formBasicEmail">
                    <Form.Control
                        className={styled.formInput1}
                        type="email"
                        placeholder="Username or Email Address"
                        value={formData.email}
                        onChange={(e) => { handleFormChange('email', e.target.value) }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        className={styled.formInput1}
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => { handleFormChange('password', e.target.value) }}
                    />
                </Form.Group>
                <Button className={styled.buttonForm1} variant="primary" type="submit">
                    Accept
                </Button>
                
            </Form>
        </div>
    )
}


