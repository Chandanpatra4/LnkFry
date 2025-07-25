import React, { useState } from 'react'
import { loginUser } from '../api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/authSlice.js'
import { useNavigate } from '@tanstack/react-router'


const LoginForm = ({ state }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Call the login API
            const data = await loginUser(formData.email, formData.password)
            
            // Set auth state immediately with the returned user data
            dispatch(login(data.user))
            
            console.log('Login successful:', data)
            
            // Navigate to dashboard
            navigate({to:"/dashboard"})

        } catch (err) {
            console.error('Login error:', err)
            // Handle different types of errors
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError('Invalid email or password. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Email Field */}
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors'
                        required
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors pr-12'
                            required
                        />
                        <button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
                        >
                            {showPassword ? (
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'></path>
                                </svg>
                            ) : (
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
                        {error}
                    </div>
                )}

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                    <label className='flex items-center'>
                        <input
                            type='checkbox'
                            className='w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className='ml-2 text-sm text-gray-600'>Remember me</span>
                    </label>
                    <a href='#' className='text-sm text-indigo-600 hover:text-indigo-800 underline'>
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed'
                >
                    {isLoading ? (
                        <div className='flex items-center'>
                            <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            Signing in...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>

            {/* Sign Up Link */}
            <div className='mt-8 text-center'>
                <p className='text-gray-600 text-sm cursor-pointer'>
                    Don't have an account?{' '}
                    <span onClick={() => state(false)} className='text-indigo-600 hover:text-indigo-800 font-medium underline cursor-pointer'>
                        Sign up here
                    </span>
                </p>
            </div>
        </>
    )
}

export default LoginForm
