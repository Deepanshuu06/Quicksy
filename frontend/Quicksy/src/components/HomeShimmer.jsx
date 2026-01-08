import React from 'react'

function HomeShimmer() {
  return (
    <div>
        <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                    <div className="bg-gray-300 h-32 w-full mb-4 rounded-md"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            ))}
        </div>  
    </div>
  )
}

export default HomeShimmer