import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { AddCatergoryBtn } from '../../components/admin/AddCategoryBtn'
import { CategoryCard } from '../../components/admin/CategoryCard'

const CategoryPage = () => {
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold '>Categories</h1>
                    <AddCatergoryBtn/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full'>
                    <CategoryCard/>
                    <CategoryCard/>
                    <CategoryCard/>
                    <CategoryCard/>
                    <CategoryCard/>
                    <CategoryCard/>
                </div>
            </div>
        </>
    )
}

export default CategoryPage