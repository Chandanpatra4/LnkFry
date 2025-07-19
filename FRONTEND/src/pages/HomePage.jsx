import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
     <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>LnkFry</h1>
          <p className='text-gray-600'>Shorten your URLs with ease</p>
        </div>

       <UrlForm/>
        <div className='mt-8 text-center text-xs text-gray-500'>
          <p>Free URL shortening service</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage