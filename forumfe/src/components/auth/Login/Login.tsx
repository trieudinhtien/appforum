import { FC, FormEvent, useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../../../apis/users-apis';
import { UserContext } from '../../../context/UserContext';
import { UnauthGuard } from '../guard/UnauthGuard';
import Logo from "../../../images/logo.png"
import styles from './Login.module.css'
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



interface Ilogin {
    email: string,
    password: string,
}


const Login: FC<{}> = () => {
    let navigate = useNavigate();

    const context = useContext(UserContext)
    const [showPassword, setShowpassword] = useState<boolean>(false)

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
        if(errors.email && errors.password){
            setFormErr(errors);
        }
        
    }



    function handleFormChange(fieldName: string, value: string) {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    }

    function hanlderSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        validate(formData)
        if(formData.email && formData.password){
            login(formData)
                .then((user: User) => {
                    if(user){
                        localStorage.setItem("user", JSON.stringify(user))
                        context.setUser(user)
                    }else{
                        Swal.fire({icon: 'error',text: "Email or Password is incorrect"});
                    }
                })
        }
        
    }

    function handlerShowPass() {
        setShowpassword(true)
        document.getElementById("pass")?.setAttribute('type', 'text')

    }
    function handlerHidePass() {
        setShowpassword(false)
        document.getElementById("pass")?.setAttribute('type', 'password')
    }


    return (
        <UnauthGuard moveTo="/">
            <div className='container-fluid'>
                <div className='row'>
                    <div className={styles.backgrounLogin + " col-7"}>
                        <div className={styles.titleBGViking}>
                            <p>WELLCOME TO</p>
                            <h1>VIKINGER4</h1>
                            <p>The next generation Vikinger4 social community! Connect with your friends with full profiles, reactions, groups, followings , forum and much more to come!</p>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className={styles.Wrapper}>
                            <Form className={styles.wrapperForm} onSubmit={(e) => hanlderSubmit(e)}>
                                <div className={styles.logo_login}>
                                    <img src={Logo} alt="logo" />
                                </div>
                                <div className={styles.titleForm}>Wellcome!</div>
                                <Form.Group className='mb-2' controlId="formBasicEmail">
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
                                                <Form.Text className={"text-danger "+ styles.textErr}>
                                                    {formErr.email}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                                <Form.Group className={styles.showPass + " mb-2"}>
                                    <Form.Control
                                        id="pass"
                                        className={styles.formInput}
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => handleFormChange("password", e.target.value)}
                                    />
                                    <span className={styles.iconShowpas}>
                                        {
                                            showPassword ?
                                                <i onClick={handlerHidePass} className="fas fa-eye"></i> :
                                                <i onClick={handlerShowPass} className="fas fa-eye-slash"></i>
                                        }

                                    </span>
                                    {
                                        formErr.password
                                            ? (
                                                <Form.Text className={"text-danger "+ styles.textErr}>
                                                    {formErr.password}
                                                </Form.Text>
                                            )
                                            : null
                                    }
                                </Form.Group>
                                <Button className={styles.buttonForm} variant="primary" type="submit">
                                    Login
                                </Button>
                                <div className={styles.linkConnect}>
                                <Link to='/home'><i className="fas fa-long-arrow-alt-left"></i> Go to Vikinger</Link>
                                <Link to='/register'>Create an Account !</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </UnauthGuard>

    )
}


export default Login;