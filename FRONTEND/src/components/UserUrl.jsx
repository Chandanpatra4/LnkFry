import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getAllUserUrls } from '../api/user.api'
import { QRCodeSVG } from 'qrcode.react'

const UserUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    enabled: isAuthenticated, // Only run query when authenticated
    retry: 3, // Retry 3 times on failure
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  

  
  const [copiedId, setCopiedId] = useState(null)
  const [qrModalId, setQrModalId] = useState(null) // Track which URL's QR code is shown
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  const handleShowQR = (id) => {
    setQrModalId(id)
  }

  const handleCloseQR = () => {
    setQrModalId(null)
  }

  const handleDownloadQR = (shortUrl) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 300; // Larger size for download
    canvas.width = size;
    canvas.height = size;

    // Create a temporary SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.innerHTML = `<foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <div style="padding: 20px; background: white;">
          ${document.querySelector('.qr-code-download')?.innerHTML || ''}
        </div>
      </div>
    </foreignObject>`;

    // Convert SVG to image and download
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = function() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `qr-code-${shortUrl}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }

  const handleDownloadQRSimple = (shortUrl, fullUrl) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    
    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Get the QR code SVG element
    const qrElement = document.querySelector(`[data-qr-id="${qrModalId}"]`);
    if (qrElement) {
      const svgData = new XMLSerializer().serializeToString(qrElement);
      const img = new Image();
      
      img.onload = function() {
        // Draw QR code in center
        const qrSize = 300;
        const margin = (size - qrSize) / 2;
        ctx.drawImage(img, margin, margin, qrSize, qrSize);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `qr-code-${shortUrl}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  }

  // If user is not authenticated, show message
  if (!isAuthenticated) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-lg font-medium">Please log in to view your URLs</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    console.error('UserUrl component error:', error);
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error?.response?.data?.message || error?.message || 'Unknown error'}
      </div>
    )
  }

  if (!urls || !urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
        
        <div className="overflow-x-auto h-56">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...urls.urls].reverse().map((url) => (
                <tr key={url._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 truncate max-w-xs">
                      {url.full_url}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <a 
                        href={`${baseUrl}/${url.short_url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 hover:underline"
                      >
                        {`${baseUrl}/${url.short_url}`}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(`${baseUrl}/${url.short_url}`, url._id)}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                          copiedId === url._id
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                      >
                        {copiedId === url._id ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                            </svg>
                            Copy
                          </>
                        )}
                      </button>

                      {/* QR Code Button */}
                      <button
                        onClick={() => handleShowQR(url._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                        </svg>
                        QR Code
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      {qrModalId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
              <button
                onClick={handleCloseQR}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <QRCodeSVG 
                  value={`${baseUrl}/${urls.urls.find(url => url._id === qrModalId)?.short_url}`}
                  size={200}
                  level="M"
                  includeMargin={true}
                  data-qr-id={qrModalId}
                />
              </div>
              
              <p className="text-sm text-gray-600 mt-3 text-center">
                Scan this QR code to access your shortened URL
              </p>
              
              <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded break-all">
                {`${baseUrl}/${urls.urls.find(url => url._id === qrModalId)?.short_url}`}
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    const url = `${baseUrl}/${urls.urls.find(url => url._id === qrModalId)?.short_url}`;
                    handleCopy(url, qrModalId);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Copy URL
                </button>

                <button
                  onClick={() => {
                    const currentUrl = urls.urls.find(url => url._id === qrModalId);
                    handleDownloadQRSimple(currentUrl.short_url, currentUrl.full_url);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download
                </button>
                
                <button
                  onClick={handleCloseQR}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserUrl