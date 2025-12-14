import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../HooKs/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const LogIn = () => {
    const [fireError, setFireError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    const location = useLocation();
    const { logInUser, continueWithGoogle, setUser } = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        logInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                setUser(res.user)
                reset();
                navigate(location.state || '/')
                reset();
                Swal.fire({
                    title: "Welcome back...!",
                    text: "You logged in successfully...!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
                    },
                    buttonsStyling: false
                });
            })
            .catch((err) => {
                setFireError("Wrong Email or Password")
                toast.error("Wrong Email or Password");
                console.log(err)
            })

    }

    const handleGoogleLogin = () => {
        continueWithGoogle()
            .then(res => {
                console.log(res.user);
                setUser(res.user);
                navigate(location.state || '/');
                Swal.fire({
                    title: "Welcome back...!",
                    text: "You logged in successfully...!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
                    },
                    buttonsStyling: false
                });
            })
            .catch(err => {
                toast.error("Authentication Error");
                console.log(err);
            })
    }

    return (
        <div className='mb-10'>

            <div className='text-center py-6'>
                <h1 className='text-4xl font-bold mb-4'><span>NestCloth is Waiting</span> <br /> <span>Log In</span></h1>
                <p className='text-xl font-bold text-gray-400'>Make Your Dream True</p>
                <p className=" mt-2">Big Orders. Smarter Tracking. Seamless Management.</p>
            </div>

            <div className='max-w-125 mx-auto py-6 px-4 border-2 border-gray-400 rounded-2xl'>
                <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col w-full gap-5'>
                    <label>
                        <span className='font-semibold italic'>Email Here:</span> <br />
                        <input
                            {...register("email", {
                                required: "Email is Required...!"
                            })}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="email" placeholder='Your email . . .' />
                        {errors.email && (
                            <p className="text-red-500 font-bold mt-1">{errors.email.message}</p>
                        )}
                    </label>
                    <label className='relative'>
                        <span className='font-semibold italic'>Password Here:</span><br />
                        <input
                            {...register("password", {
                                required: "Password is Required...!",
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password . . ."
                            className="border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 pr-10"
                        />
                        <span
                            className="absolute right-3 top-9 cursor-pointer text-gray-400"
                            onClick={togglePassword}
                        >
                            {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 font-bold mt-1">{errors.password.message}</p>
                        )}
                        {fireError && (
                            <p className="text-red-500 font-bold mt-1">{fireError}</p>
                        )}

                        <p className='mt-2 italic hover:underline hover:text-info'>
                            <NavLink to='/'>Forgote Password?</NavLink>
                        </p>
                    </label>

                    <button className='btn btn-sm btn-donate' type='submit'>Login</button>
                </form>
                <div className='flex gap-10 justify-center my-2'>
                    <span className='border rotate-90'></span>
                    <span className='text-xl font-semibold'>Or</span>
                    <span className='border rotate-90'></span>
                </div>
                <button onClick={handleGoogleLogin} className='cursor-pointer py-1 border-gray-400 font-semibold text-[20px] rounded-[.5em] w-full border-2 bg-transparent flex justify-center items-center gap-2'>
                    <FcGoogle size={30} /> Login with Google
                </button>

                <p className='mt-4'>
                    Don't have an account? Please <NavLink state={location?.state} to='/SignUp'><span className='text-info font-bold'>Sign Up</span></NavLink>
                </p>
            </div>
            {/* toast */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {/* toast end */}
        </div>
    );
};

export default LogIn;