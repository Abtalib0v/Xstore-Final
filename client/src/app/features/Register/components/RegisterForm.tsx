"use client"
import React from 'react'
import * as yup from 'yup';
import { useFormik } from "formik"
import { RegisterValidation } from '../Validate';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { QueryKeys } from '@/app/constant/QueryKeys';
import { postApi } from '@/app/http/api';



const RegisterForm = () => {
    const router = useRouter()

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: QueryKeys.register,
        mutationFn: async (data: any) => postApi('/auth/register', data),
    })

    const initalVAlue = {
        email: "",
        password: "",
        name: ""
    }
    const formik = useFormik({
        initialValues: initalVAlue,
        validationSchema: RegisterValidation,
        onSubmit: () => {
            mutate(formik.values, {
                onSuccess: (data) => {
                    console.log("Registration successful:", data);
                    formik.resetForm()
                    router.push("/login")

                }
            })
        }
    })

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="bg-white p-8 rounded-xl shadow-lg w-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
                    <p className="text-gray-500">Sign Up to continue </p>
                </div>
                {isError ? <div className='bg-red-100 text-red-500 p-2 rounded-md mb-4'>
                    <p className='text-sm'>{error.message}</p>
                </div> : null
                }

                <form
                    onSubmit={(e: any) => {
                        e.preventDefault()
                        formik.handleSubmit()
                    }}
                    id="loginForm" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text" id="name"
                            className="mt-1 outline-none py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {
                            formik.touched && formik.errors.name ? <div>
                                <span className='text-red-400 text-sm'>
                                    {
                                        formik.errors.name
                                    }
                                </span>
                            </div>
                                : null
                        }
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="email" id="email"
                            className="mt-1 outline-none py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {
                            formik.touched && formik.errors.email ? <div>
                                <span className='text-red-400 text-sm'>
                                    {
                                        formik.errors.email
                                    }
                                </span>
                            </div>
                                : null
                        }
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            name='password'
                            type="password" id="password"
                            className="mt-1 block w-full outline-none py-2 px-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        {
                            formik.touched && formik.errors.password ? <div>
                                <span className='text-red-400 text-sm'>
                                    {formik.errors.password}
                                </span>
                            </div> : null
                        }

                    </div>

                    <Button type="submit"
                        className="w-full outline-none flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {
                            isPending ? "Loading..." : "Sign Up"
                        }
                    </Button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Button id="fingerprintBtn" type="button"
                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm
