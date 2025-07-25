import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='w-full max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-6 py-8'>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>LnkFry</h1>
          <p className='text-gray-600 max-w-md mx-auto'>Make your long URLs short and trackable</p>
        </div>

        {/* URL Form Section */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <UrlForm/>
        </div>

        {/* User URLs Section */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <UserUrl/>
        </div>

        {/* Footer */}
        <div className='text-center py-4'>
          <p className='text-gray-500 text-sm'>Free URL shortening service • Made with care</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage