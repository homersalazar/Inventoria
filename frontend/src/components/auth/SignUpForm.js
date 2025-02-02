import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';

const SignUpForm = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const validateEmail = async (email) => {
        try {
            const response = await fetch(`${API_URL}/users/validate-email?email=${encodeURIComponent(email)}`);
            if (!response.ok) throw new Error('Error checking email');
            
            const { isUnique } = await response.json();
            return isUnique;
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    };

    const validate = async (values) => {
        const errors = {};

        // Required field validation
        if (!values.first_name?.trim()) errors.first_name = "First name is required";
        if (!values.last_name?.trim()) errors.last_name = "Last name is required";
        if (!values.email?.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password?.trim()) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        // Only check email uniqueness if email is valid
        if (values.email && !errors.email) {
            const isEmailUnique = await validateEmail(values.email);
            if (!isEmailUnique) errors.email = "Email already in use";
        }

        return errors;
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
        { first_name: '', last_name: '', email: '', password: '' },
        validate
    );

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            resetForm();

            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-800">
            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-white">
                    Inventor<span className="text-gray-900">ia</span>
                </h2>
                <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                    <div className="space-y-4">
                        <div className='flex flex-row gap-5'>
                            <div>
                                <label className="block text-white">First Name</label>
                                <input type="text" name='first_name' value={values.first_name} onChange={handleChange} 
                                    className="w-full p-3 border rounded-lg" placeholder="First Name"/>
                                {errors.first_name && <p className="text-red-600">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="block text-white">Last Name</label>
                                <input type="text" name='last_name' value={values.last_name} onChange={handleChange} 
                                    className="w-full p-3 border rounded-lg" placeholder="Last Name"/>
                                {errors.last_name && <p className="text-red-600">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white">Email</label>
                            <input type="email" name='email' value={values.email} onChange={handleChange} 
                                className="w-full p-3 border rounded-lg" placeholder="Email"/>
                            {errors.email && <p className="text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-white">Password</label>
                            <input type="password" name='password' value={values.password} onChange={handleChange} 
                                className="w-full p-3 border rounded-lg" placeholder="Password"/>
                            {errors.password && <p className="text-red-600">{errors.password}</p>}
                        </div>

                        <button className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700" 
                            disabled={isSubmitting}>Sign up</button>
                        
                        <div>
                            <span className='text-white'>Already have an account? </span>
                            <Link className='text-blue-300' to='/login'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
