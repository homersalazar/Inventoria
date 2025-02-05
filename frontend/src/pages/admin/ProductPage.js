import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { AddProductBtn } from '../../components/admin/AddProductBtn'

const ProductPage = () => {
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Products</h1>
                    <div className='flex gap-5'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <select class="select select-bordered w-full max-w-xs">
                            <option disabled selected>Filter By</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                        <AddProductBtn />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th></th>
                            <th>Name of product</th>
                            <th>Status</th>
                            <th>Stock info</th>
                            <th>Category</th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                </td>
                                <td>Active</td>
                                <td>
                                    12 in stock
                                </td>
                                <td>
                                    T-shirt
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductPage