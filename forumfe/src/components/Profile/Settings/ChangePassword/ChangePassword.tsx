import { Formik, Field, Form as FormikForm, ErrorMessage, FormikErrors } from "formik";
import { Form } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { getUserById, changePasswordById } from '../../../../apis/users-apis'
import { useNavigate } from 'react-router-dom'


interface FormValues {
    password: string,
    newPassword: string,
    confirmPassword: string
}

export default function ChangePassword() {

    const context = useContext(UserContext)
    const navigate = useNavigate()
    const user = context.user

    const [notification, setNotification] = useState('')

    const _onSubmit = (value: FormValues) => {

        getUserById(user.id, user.token)
            .then((userInfo: User) => {
                if (value.password === userInfo.password) {
                    changePasswordById(user.id, user.token, value.newPassword)
                        .then((res) => {
                            alert('password is changed successfully')
                            localStorage.setItem('user',JSON.stringify({...user, password: value.newPassword}))
                            context.setUser({...user, password: value.newPassword})
                            navigate('/profile/about')
                        })
                        .catch((err) => console.log(err))
                } else {
                    setNotification('Password incorrect, please try again.')
                }
            })
            .catch((err) => console.log(err))

    }

    const _validate = (value: FormValues) => {
        const error: FormikErrors<FormValues> = {}

        if (!value.password) {
            error.password = 'Password is required!'
        }

        if (!value.newPassword) {
            error.newPassword = 'New password is required!'
        }

        if (!value.confirmPassword) {
            error.confirmPassword = 'Confirm password is required!'
        }

        if (value.newPassword && value.confirmPassword && value.newPassword !== value.confirmPassword) {
            error.confirmPassword = 'New password and Confirm password is not match!'
        }

        return error
    }

    const renderMessageError = (error: string) => {
        return (
            <div className="d-flex justify-content-end">
                <p className="text-danger text-left col-9">{error}</p>
            </div>
        )
    }

    const _onFocus = () => {
        setNotification('')
    }

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ex provident aut hic a tenetur animi? Sunt odio repellat asperiores corrupti quidem distinctio vel reiciendis, adipisci molestiae neque sed eveniet!
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                onSubmit={_onSubmit}
                validate={_validate}
            >
                <FormikForm className='p-4'>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='email' className="font-weight-bold col-3 p-0 my-0 mr-3">Email</Form.Label>
                        <Form.Control
                            value={user.email}
                            id='email'
                            className='font-weight-bold'
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='password' className="font-weight-bold col-3 p-0 my-0 mr-3">Password</Form.Label>
                        <Field
                            as={Form.Control}
                            name='password'
                            type='password'
                            id='password'
                            onFocus={_onFocus}
                        />
                    </Form.Group>
                    <ErrorMessage name="password" render={renderMessageError} />
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='newPassword' className="my-0 mr-3 col-3 p-0 font-weight-bold">New password</Form.Label>
                        <Field
                            as={Form.Control}
                            name='newPassword'
                            type='password'
                            id='newPassword'
                        />
                    </Form.Group>
                    <ErrorMessage name="newPassword" render={renderMessageError} />
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='confirmPassword' className="my-0 mr-3 col-3 p-0 font-weight-bold">Confirm new password</Form.Label>
                        <Field
                            as={Form.Control}
                            name='confirmPassword'
                            type='password'
                            id='confirmPassword'
                        />
                    </Form.Group>
                    <ErrorMessage name="confirmPassword" render={renderMessageError} />
                    {
                        notification &&
                        <div className="d-flex justify-content-end">
                            <p className="text-danger text-left col-9">{notification}</p>
                        </div>
                    }
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </FormikForm>
            </Formik>
        </div >
    )
}