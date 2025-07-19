import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const UrlForm = () => {
    const [Url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState()
    const [copySuccess, setCopySuccess] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios.post("http://localhost:4000/api/create", { url: Url });
        setShortUrl(data)

    }

    const copyToClipboard = async () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shortUrl);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                setCopySuccess(false);
            }
        } else {
            // Clipboard API not available
            alert('Clipboard API not supported in this browser. Please copy manually.');
        }
    }

    const resetForm = () => {
        setUrl("")
        setShortUrl("")
        setCopySuccess(false)
    }


    return (
        <form className='space-y-6'>
            <div>
                <label htmlFor='url' className='block text-sm font-medium text-gray-700 mb-2'>
                    Enter your long URL
                </label>
                <input
                    type='url'
                    id='url'
                    value={Url}
                    onInput={(event) => setUrl(event.target.value)}
                    placeholder='https://example.com/very-long-url'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors'
                    required
                />
            </div>



            <button
                onClick={handleSubmit}
                type='submit'

                className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center'
            >
                Shorten Url
            </button>
            {/* {error && (
                <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
                    {error}
                </div>
            )} */}

            {shortUrl && (
                <div className='mt-8 p-6 bg-green-50 border border-green-200 rounded-lg'>
                    <h3 className='text-lg font-semibold text-green-800 mb-3'>Your shortened URL:</h3>
                    <div className='flex items-center space-x-2'>
                        <input
                            type='text'
                            value={shortUrl}
                            readOnly
                            className='flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-green-700 font-mono text-sm'
                        />
                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                                copySuccess 
                                    ? 'bg-green-700 text-white' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                            title={copySuccess ? 'Copied!' : 'Copy to clipboard'}
                        >
                            {copySuccess ? (
                                <div className='flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                                    </svg>
                                    <span className='text-xs'>Copied</span>
                                </div>
                            ) : (
                                <div className='flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'></path>
                                    </svg>
                                    <span className='text-xs'>Copy</span>
                                </div>
                            )}
                        </button>
                    </div>

                    <button
                        onClick={resetForm}
                        type="button"
                        className='mt-4 text-sm text-green-700 hover:text-green-800 underline'
                    >
                        Shorten another URL
                    </button>
                </div>
            )}
        </form>
    )
}

export default UrlForm