import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)
    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                        {login ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className='text-gray-600'>
                        {login ? 'Sign in to your LnkFry account' : 'Join LnkFry and start shortening URLs'}
                    </p>
                </div>

                {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}

                <div className='mt-8 text-center text-xs text-gray-500'>
                    <p>Free URL shortening service</p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage