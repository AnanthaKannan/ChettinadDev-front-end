import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import service from '../service/user.service';
import hash from 'hash-converter';
import { toast } from 'react-toastify';

export default function LoginBox() {
    const history = useHistory();
    const [isChecked, setIsChecked] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            email: ''
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required().min(4),
            email: Yup.string().email().required("Required")
        }),
        onSubmit: values => {
            console.log("onsubmit", values);
            login(values)
        }
    });

    const login =  async(data) => {
        const password = hash.SHA256(data.password);
        const userName = data.email.toLowerCase();
        const result = await service.login({userName, password});
        console.log("result", result);

        if(result && result.status === 200){
            const { token } = result.data;
            // console.log('token', token);
            sessionStorage.setItem('token', token);
            history.push('/dashboard');
            return;
        }
        toast.error('Please enter valid credentials.');
    }

    const handleChangeCheckbox = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className='loginBox'>
            <div className="px-5 py-3 box">
                <div className='text-center'>
                    <img src={require('../assets/alba_logo.png')} alt="alba-logo" srcset="" />
                </div>
                <p className="heading">Manfacturing Execution System (MES)</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mx-4'>
                        <div>
                            <label htmlFor='email' className='label-txt'>Username</label>
                            <input type="text"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className={ formik.errors.email && formik.touched.email ? "form-control error-border" : "form-control" }
                                id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter email" />
                            <br />

                            <label htmlFor='password' className='label-txt'>Password</label>
                            <input type="password"
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className={ formik.errors.password && formik.touched.password ? "form-control error-border" : "form-control" } 
                                id="exampleInputPassword1"
                                placeholder="Password" />
                            <br />
                        </div>


                        <div className='d-flex align-items-center justify-content-between remember'>
                            <label className='label-txt' htmlFor="">
                                <Checkbox
                                    className='p-0'
                                    checked={isChecked}
                                    onChange={handleChangeCheckbox} 
                                    name="antoine" /> Remember Me</label>
                            <label className='label-txt' htmlFor="">Forgot Password</label>
                        </div>
                        <button type="submit" className="btn w-100">  LOGIN </button>

                        <br /><br />
                        <p className="copy-right">© Copyright ALBA. All Right Reserved</p>
                    </div>
                </form>
            </div>


            {/* <div style={{ margin: '1rem 0' }} className="ml-5">
                <pre style={{ background: '#f6f8fa', fontSize: '.65rem', padding: '.5rem', }} >
                    <strong>props</strong> = {' '}
                    {JSON.stringify(formik, null, 2)}
                </pre>
            </div> */}


        </div>
    )
}
