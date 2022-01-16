import { Formik, Field, Form as FormikForm, ErrorMessage, FormikErrors } from "formik";
import { Form } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { changeUserById } from '../../../../apis/users-apis'
import { useNavigate } from 'react-router-dom'
import styles from './ChangeProfile.module.css'
import swal from 'sweetalert';
import Swal from 'sweetalert2'


interface FormValues {
    firstName: string,
    lastName: string,
    gender: string,
    birthday: string,
    phone: string,
    address: string,
    introduce: string,
    facebook: string,
    instagram: string,
    youtube: string,
}

export default function ChangeProfile() {

    const context = useContext(UserContext)
    const navigate = useNavigate()
    const user = context.user

    const _onSubmit = (value: FormValues) => {

        changeUserById(user.id, user.token, value.firstName, value.lastName, value.birthday, value.gender, value.phone, value.address, value.introduce, value.facebook, value.instagram, value.youtube)
            .then(res => {
                Swal.fire("Success", "you have successfully changed", "success");
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    birthday: value.birthday,
                    gender: value.gender,
                    phone: value.phone,
                    address: value.address,
                    introduce: value.introduce,
                    socialMedia: {
                        youtube: value.youtube,
                        facebook: value.facebook,
                        instagram: value.instagram,
                    }
                }))
                context.setUser({
                    ...user,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    birthday: value.birthday,
                    gender: value.gender,
                    phone: value.phone,
                    address: value.address,
                    introduce: value.introduce,
                    socialMedia: {
                        youtube: value.youtube,
                        facebook: value.facebook,
                        instagram: value.instagram,
                    }
                })
                navigate('/profile/about')
            })
            .catch(err => console.error(err))

    }

    const _validate = (value: FormValues) => {
        const error: FormikErrors<FormValues> = {}

        if (!value.firstName) {
            error.firstName = 'First Name is required!'
        }

        if (!value.lastName) {
            error.lastName = 'New Last Name is required!'
        }

        if (!value.phone) {
            error.phone = 'Phone is required!'
        }

        return error
    }

    const renderMessageError = (error: string) => {
        return (
            <div className="d-flex justify-content-end">
                <p className="text-danger text-left col-10">{error}</p>
            </div>
        )
    }

    return (
        <div>
            <h4 className="px-4" style={{ fontSize: '20px', color: '#605cf8' }}>Change your information here:</h4>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    birthday: user.birthday,
                    phone: user.phone,
                    address: user.address,
                    introduce: user.introduce,
                    youtube: user.socialMedia.youtube,
                    facebook: user.socialMedia.facebook,
                    instagram: user.socialMedia.instagram
                }}
                onSubmit={_onSubmit}
                validate={_validate}
            >
                <FormikForm className={styles.form + ' p-4'}>
                    <Form.Group className={"d-flex align-items-center mb-3"}>
                        <Form.Label htmlFor='firstName' className="font-weight-bold col-2 p-0 my-0 mr-3">First Name:</Form.Label>
                        <Field
                            as={Form.Control}
                            name='firstName'
                            type='text'
                            id='firstName'
                            className=''
                        />
                    </Form.Group>
                    <ErrorMessage name="firstName" render={renderMessageError} />

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='lastName' className="font-weight-bold col-2 p-0 my-0 mr-3">Last Name:</Form.Label>
                        <Field
                            as={Form.Control}
                            name='lastName'
                            type='text'
                            id='lastName'
                            className=''
                        />
                    </Form.Group>
                    <ErrorMessage name="lastName" render={renderMessageError} />

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='birthday' className="my-0 mr-3 col-2 p-0 font-weight-bold">Birthday:</Form.Label>
                        <Field
                            as={Form.Control}
                            name='birthday'
                            type='date'
                            id='birthday'
                            style={{ marginRight: '100px' }}
                        />

                        <Form.Label htmlFor='gender' className="my-0 mr-3 col-2 p-0 font-weight-bold">Gender:</Form.Label>
                        <Field
                            as="select"
                            name='gender'
                            type='text'
                            id='gender'
                            className=' form-control'
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                    </Form.Group>

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='phone' className="my-0 mr-3 col-2 p-0 font-weight-bold">Phone :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='phone'
                            type='text'
                            id='phone'
                            className=''
                        />
                    </Form.Group>
                    <ErrorMessage name="phone" render={renderMessageError} />

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='address' className="my-0 mr-3 col-2 p-0 font-weight-bold">Address :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='address'
                            type='text'
                            id='address'
                            className=''
                        />
                    </Form.Group>
                    <ErrorMessage name="address" render={renderMessageError} />

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='facebook' className="my-0 mr-3 col-2 p-0 font-weight-bold">Facebook :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='facebook'
                            type='text'
                            id='facebook'
                            className=''
                        />
                    </Form.Group>

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='instagram' className="my-0 mr-3 col-2 p-0 font-weight-bold">Instagram :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='instagram'
                            type='text'
                            id='instagram'
                            className=''
                        />
                    </Form.Group>

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='youtube' className="my-0 mr-3 col-2 p-0 font-weight-bold">Youtube :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='youtube'
                            type='text'
                            id='youtube'
                            className=''
                        />
                    </Form.Group>

                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label htmlFor='introduce' className="my-0 mr-3 col-2 p-0 font-weight-bold">Introduce yourself :</Form.Label>
                        <Field
                            as={Form.Control}
                            name='introduce'
                            type='text'
                            id='introduce'
                            className=''
                        />
                    </Form.Group>
                    <ErrorMessage name="introduce" render={renderMessageError} />

                    <button className="btn text-white" type='submit' style={{ backgroundColor: '#615dfa'}}>Submit</button>
                </FormikForm>
            </Formik>
        </div >
    )
}