import React from 'react'
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm'
import Swal from 'sweetalert2'

const LogInForm = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate(); // `navigate` should be lowercase

    const validate = async (values) => {
        const errors = {};

        // Required field validation
        if (!values.email?.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password?.trim()) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
        { email: '', password: '' },
        validate
    );

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }
            resetForm();

            if(data.user.role_name  === 'Admin'){
                navigate('/admin-dashboard')
            }else{
                navigate('/')
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-800">
            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-white">
                Inventor<span className="font-extrabold text-gray-900">ia</span>
                </h2>
                <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold text-white">Email Address</label>
                            <input
                                id='email'
                                name='email'
                                type="email"
                                value={values.email}
                                onChange={handleChange} 
                                placeholder="Email"
                                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.email && <p className="text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold text-white">Password</label>
                            <input
                                id='password'
                                name='password'
                                type="password"
                                value={values.password}
                                onChange={handleChange} 
                                placeholder="Password"
                                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.password && <p className="text-red-600">{errors.password}</p>}
                        </div>

                        <button 
                            type='submit'
                            className="w-full mb-5 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                            disabled={isSubmitting}
                        >
                            Log in
                        </button>
                        
                        <div>
                            <span className='text-white'>Not yet a registered customer, please</span> <a className='text-blue-300' href='/register'>register.</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogInForm
