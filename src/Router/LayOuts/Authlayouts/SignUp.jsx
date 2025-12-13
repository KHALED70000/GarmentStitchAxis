import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../HooKs/useAuth';

const SignUp = () => {
    const [fireError, setFireError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate()

    const { registerUser, continueWithGoogle, updateUserProfile, setUser } = useAuth();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const handleSignUp = (data) => {
        registerUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                updateUserProfile({ displayName: data.FirstName + data.LastName, photoURL: data.photoURL })
                    .then(() => { })
                    .catch(() => { });
                setUser(res.user)
                reset();
                navigate('/');
            })
            .catch(err => {
                console.log(err)
                setFireError('This account is already Exist! Use another Email....')
            })
    }
    const handleGoogleContinue = () => {
        continueWithGoogle()
            .then(res => {
                console.log(res.user);
                setUser(res.user);
                navigate('/');
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='mb-10'>
            <div className='text-center py-6'>
                <h1 className='text-4xl font-bold mb-4'>
                    <span>Welcome to NestCloth...!</span>
                    <br />
                    <span>Register Now</span>
                </h1>
                <p className='text-xl font-bold text-gray-400'>Our Comitment</p>
                <p className=" mt-2 ">Big Orders. Smarter Tracking. Seamless Management.</p>
            </div>

            <div className='max-w-125 mx-auto py-6 px-4 border-2 border-gray-400 rounded-2xl'>
                <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col w-full gap-5'>
                    <div className='flex gap-3 max-[500px]:flex-wrap'>
                        <label className='w-full'>
                            <span className='font-semibold italic'>First Name here:</span> <br />
                            <input
                                {...register("FirstName", {
                                    required: "First name is Required...!"
                                })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='First name . . .' />
                            {errors.FirstName && (
                                <p className="text-red-500 font-bold mt-1">{errors.FirstName.message}</p>
                            )}
                        </label>
                        <label className='w-full max-[500px]:mt-2'>
                            <span className='font-semibold italic'>Last Name here:</span> <br />
                            <input
                                {...register("LastName", {
                                    required: "Last name is Required...!"
                                })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Last name . . .' />
                            {errors.LastName && (
                                <p className="text-red-500 font-bold mt-1">{errors.LastName.message}</p>
                            )}
                        </label>
                    </div>
                    <label>
                        <span className='font-semibold italic'>Type your Photo URL:</span> <br />
                        <input
                            {...register("photoURL", {
                                required: "Photo URL is Required...!"
                            })}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="url" placeholder='Photo url . . .' />
                        {errors.photoURL && (
                            <p className="text-red-500 font-bold mt-1">{errors.photoURL.message}</p>
                        )}
                    </label>
                    {/* role */}
                    <label>
                        <span className='font-semibold italic'>Select your role:</span> <br />
                        <div className='flex flex-wrap gap-10 mt-1'>

                            <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
                                <select
                                    {...register("role", { required: "Please select a role!" })}
                                    className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option className='text-gray-400' value="buyer">Buyer</option>
                                    <option className='text-gray-400' value="manager">Manager</option>
                                </select>
                            </div>

                        </div>
                        {errors.role && (
                            <p className="text-red-500 font-bold mt-1">{errors.role.message}</p>
                        )}
                    </label>
                    {/* role end*/}
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
                        {
                            fireError && <p className="text-warning font-bold mt-1">{fireError}</p>
                        }
                    </label>
                    <label className='relative'>
                        <span className='font-semibold italic'>Set Password Here:</span><br />
                        <input
                            {...register("password", {
                                required: "Password is Required...!",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message:
                                        "Password must be at least 1 uppercase letter, 1 lowercase letter and 6 character long",
                                },
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

                    </label>
                    <label className='relative'>
                        <span className='font-semibold italic'>Confirm Password:</span><br />
                        <input
                            {...register("ConfirmPass", {
                                required: "Please retype the password...!",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
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

                        {errors.ConfirmPass && (
                            <p className={`text-red-500 font-bold mt-1`}>{errors.ConfirmPass.message}</p>
                        )}

                        {/* {confirmPass && (
                            <p className="text-warning font-bold mt-1">{confirmPass}</p>
                        )} */}

                    </label>

                    <button className='btn btn-sm btn-donate' type='submit'>Sign Up</button>
                </form>
                <div className='flex gap-10 justify-center my-2'>
                    <span className='border rotate-90'></span>
                    <span className='text-xl font-semibold'>Or</span>
                    <span className='border rotate-90'></span>
                </div>
                <button onClick={handleGoogleContinue} className='cursor-pointer py-1 border-gray-400 font-semibold text-[20px] rounded-[.5em] w-full border-2 bg-transparent flex justify-center items-center gap-2'>
                    <FcGoogle size={30} />Continue with Google
                </button>
                <p className='mt-4'>
                    Already have an account? Please <NavLink to='/LogIn'><span className='text-info font-bold'>Login</span></NavLink>
                </p>
            </div>
        </div>
    )
};

export default SignUp;
