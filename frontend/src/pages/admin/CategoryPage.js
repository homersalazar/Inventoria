import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { AddCatergoryBtn } from '../../components/admin/AddCategoryBtn'
import { CategoryCard } from '../../components/admin/CategoryCard'
import CreateCategoryModal from '../../components/admin/CreateCategoryModal'
import useFetch from '../../hooks/useFetch'

const CategoryPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const { data, refetch } = useFetch(`${API_URL}/category/fetch`);

    return (
        <>
            <SideBar />
            <CreateCategoryModal refetch={refetch} />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold '>Categories</h1>
                    <AddCatergoryBtn/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-5'>
                    {data?.map((datas) => (
                        <CategoryCard 
                            key={datas.id} 
                            id={datas.id} 
                            image_path={datas.image_path} 
                            ctgy_name={datas.ctgy_name} 
                            product_count={datas.product_count} 
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryPage