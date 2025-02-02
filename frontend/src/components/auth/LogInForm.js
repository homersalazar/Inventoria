import React from 'react'

const LogInForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-800">
            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-white">
                Inventor<span className="font-extrabold text-gray-900">ia</span>
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold text-white">Email Address</label>
                        <input
                            type="email"
                            placeholder="Insert email"
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Insert password"
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    {/* <button className="w-full mb-5 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                        Log in
                    </button> */}
                    <a href='/admin-dashboard' className="w-full mb-5 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                        Log in
                    </a>
                    
                    <div>
                        <span className='text-white'>Not yet a registered customer, please</span> <a className='text-blue-300' href='/register'>register.</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInForm
