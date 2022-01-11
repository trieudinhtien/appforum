import React, { FC, FormEvent, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { callApilogin } from '../../../apis/api';
import styles from './login.module.css'

interface Ilogin {
    email: string,
    password: string,
}



const Login: FC<{}> = () => {
    const context = useContext(AuthContext);
    console.log("context", context.user)

    const [formData, setFormData] = useState<Ilogin>({
        email: "",
        password: "",
    })

    function handleFormChange(fieldName: string, value: string) {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    }

    function hanlderSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log("fomr login", formData)
        callApilogin(formData).then((data)=> context.passDataToContext(data))
        .catch(err => console.log("something wrong!"))
        setFormData({
            email:"",
            password: "",
        })
    }   

    return (
        <div className={styles.Wrapper}>
            <Form className={styles.wrapperForm} onSubmit={(e)=>hanlderSubmit(e)}>
            <img className={styles.logo} width={100} height={100} src="https://png.pngtree.com/templates_detail/20180906/simple-negative-space-viking-logo-design-template-png_31600.jpg" alt='logo' />
            <div className={'display-4 ' +styles.titleForm}>Wellcome!</div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        className={styles.formInput}
                        type="email" 
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        className={styles.formInput}
                        type="password" 
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleFormChange("password", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button className={styles.buttonForm} variant="primary" type="submit">
                    Login
                </Button>

            </Form>
        </div>
    )
}


export default Login;
