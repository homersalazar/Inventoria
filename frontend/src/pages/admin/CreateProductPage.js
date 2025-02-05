import React from 'react'
import SideBar from '../../components/admin/SideBar'

const CreateProductPage = () => {
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <h1 className='text-2xl md:text-3xl font-semibold '>Add product</h1>

            </div>
        </>
    )
}

export default CreateProductPage