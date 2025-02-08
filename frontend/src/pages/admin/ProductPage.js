import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { AddProductBtn } from '../../components/admin/AddProductBtn'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL;
    const { data: fetchCategoryData } = useFetch(`${API_URL}/category/fetch`);
    const { data: fetchProductData } = useFetch(`${API_URL}/product/fetch`);

    const handleView = (id) => {
        navigate(`/product/view/${id}`); 
    }

    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Products</h1>
                    <div className='flex gap-5'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <select className="select select-bordered w-full max-w-xs">
                            <option defaultValue=''>Filter By</option>
                            {fetchCategoryData?.map((row) => (
                                <option
                                    className='capitalize'
                                    key={row.id}
                                    value={row.ctgy_name}
                                >
                                    {row.ctgy_name}
                                </option>
                            ))}
                        </select>
                        <AddProductBtn />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name of product</th>
                                <th>Status</th>
                                <th>Stock info</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchProductData?.map((row) => (
                                <tr 
                                    key={row.id}
                                    onDoubleClick={() => handleView(row.item_code)} 
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={`/uploads/product/${row.product_path}`}                            
                                                        alt={row.prod_name}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='capitalize'>
                                        {row.prod_name}
                                    </td>
                                    <td>
                                        <div className="badge text-white p-3 bg-[var(--primary)]">Active</div>
                                    </td>
                                    <td>
                                        12 in stock
                                    </td>
                                    <td className='capitalize'>
                                        {row.ctgy_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductPage