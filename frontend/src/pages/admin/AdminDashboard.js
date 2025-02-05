import React from 'react'
import SideBar from '../../components/admin/SideBar'
import StatsComponent from '../../components/admin/StatsComponent'

const AdminDashboard = () => {
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <h1 className='text-2xl md:text-3xl font-semibold'>Recent activity</h1>
                <div className='grid grid-cols-3 md:grid-cols-6 gap-5'>
                    <StatsComponent/>
                    <StatsComponent/>
                    <StatsComponent/>
                    <StatsComponent/>
                    <StatsComponent/>
                    <StatsComponent/>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-5'>
                    <div class="card bg-primary text-primary-content w-full md:w-96">
                        <div class="card-body">
                            <h2 class="card-title">Card title!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div class="card-actions justify-end">
                            <button class="btn">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <div className="flex justify-between items-center mb-4 w-full md:w-96">
                            <h2 className="text-lg font-semibold">Top item categories</h2>
                            <button className="text-sm text-gray-500 hover:text-primary-focus">VIEW ALL</button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-shirt"></i>
                            </div>
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-hat-cowboy"></i>
                            </div>
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-bag-shopping"></i>
                            </div>
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-vest"></i>
                            </div>
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-calendar"></i>
                            </div>
                            <div 
                                className="btn btn-ghost bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8"
                            >
                                <i className="text-[var(--secondary)] text-2xl mb-2 fa-solid fa-headphones"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
