import React, { FC, FormEvent, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
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

    function hanlderSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("fomr login", formData)
        login(formData)
            .then((user: User) => {
                localStorage.setItem("user", user.token)
                context.setUser(user)
            })
            .catch(err => console.log("something wrong!"))

    }

    return (
        <UnauthGuard moveTo="/">
            <div className={styles.Wrapper}>
                <Form className={styles.wrapperForm} onSubmit={(e) => hanlderSubmit(e)}>
                    <div className={'display-4 ' + styles.titleForm}>Wellcome!</div>
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
                    <Button className={styles.buttonForm} variant="primary" type="submit">
                        Login
                    </Button>

                </Form>
            </div>
        </UnauthGuard>

    )
}


export default Login;
