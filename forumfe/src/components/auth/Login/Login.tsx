import React, { FC, FormEvent, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../../../apis/users-apis';
import { UserContext } from '../../../context/UserContext';
import { UnauthGuard } from '../guard/UnauthGuard';
import styles from './login.module.css'


interface Ilogin {
    email: string,
    password: string,
}



const Login: FC<{}> = () => {

    const context = useContext(UserContext)

    // const context = useContext(AuthContext);
    // console.log("context", context.user)

    const [formData, setFormData] = useState<Ilogin>({
        email: "",
        password: "",
    })
    const [formErr, setFormErr] = useState<Ilogin>({
        email: "",
        password: ""
    })

    function validate(formData: Ilogin) {
        const errors = {
            email: "",
            password: "",
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        } else {
            errors.email = '';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else {
            errors.password = '';
        }
        setFormErr(errors);
    }



    function handleFormChange(fieldName: string, value: string) {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    }

    function hanlderSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log("fomr login", formData)
        validate(formData)
        if (!formErr.email && !formErr.password) {
            login(formData)
                .then((user: User) => {
                    localStorage.setItem("user", JSON.stringify(user))
                    context.setUser(user)
                })   
        }
    }


    return (
        <UnauthGuard moveTo="/">
            <div className={styles.Wrapper}>
                <Form className={styles.wrapperForm} onSubmit={(e) => hanlderSubmit(e)}>
                    <div className={'display-4 ' + styles.titleForm}>Wellcome!</div>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control
                            className={styles.formInput}
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => handleFormChange("email", e.target.value)}
                        />
                        {
                            formErr.email
                                ? (
                                    <Form.Text className="text-danger">
                                        {formErr.email}
                                    </Form.Text>
                                )
                                : null
                        }
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control
                            className={styles.formInput}
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleFormChange("password", e.target.value)}
                        />
                        {
                            formErr.password
                                ? (
                                    <Form.Text className="text-danger">
                                        {formErr.password}
                                    </Form.Text>
                                )
                                : null
                        }
                    </Form.Group>
                    <Button className={styles.buttonForm + " mb-2"} variant="primary" type="submit">
                        Login
                    </Button>
                    <span className='text-center d-block'>Do you no an account. <Link to='/register'>Register!</Link></span>
                </Form>
            </div>
        </UnauthGuard>

    )
}


export default Login;
