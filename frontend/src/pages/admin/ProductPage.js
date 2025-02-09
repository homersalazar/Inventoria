import React, { useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import DataTable from 'react-data-table-component';
import useFetch from '../../hooks/useFetch'

import { AddProductBtn } from '../../components/admin/AddProductBtn'
import { useNavigate } from 'react-router-dom'
import { ucwords } from '../../utils/Ucwords';

const ProductPage = () => {
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL;
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const { data: fetchCategoryData } = useFetch(`${API_URL}/category/fetch`);
    const { data: fetchProductData } = useFetch(`${API_URL}/product/fetch`);

    const handleView = (id) => {
        navigate(`/product/view/${id}`); 
    }

    const filterProduct = fetchProductData.filter(row => {
        const productNameMatch = row.prod_name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = row.ctgy_name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryFilterMatch = categoryFilter && categoryFilter !== "" ?  
            row.ctgy_name.toLowerCase().includes(categoryFilter.toLowerCase()) : 
            true;
        
            return (productNameMatch || categoryMatch) && categoryFilterMatch;
        });

    const columns = [
        {
            name: '',
            selector: row => (
                <div className="flex items-center gap-3 p-1"
                    onClick={() => handleView(row.item_code)}
                >
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={`/uploads/product/${row.product_path}`}                            
                                alt={row.prod_name}
                            />
                        </div>
                    </div>
                </div>
            ),
            sortable: false,
        },
        {
            name: 'Name of product',
            selector: row => `${ucwords(row.prod_name)}`,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => (
                row.status === 0 ? <span className="badge text-white p-3 bg-[var(--primary)]">Active</span> : 
                row.status === 1 ? <span className="badge text-white p-3 bg-[var(--tertiary)]">Low stock</span> : 
                <span className="badge text-white p-3 bg-gray-400">Deactivated</span>
            ),
            sortable: true,
        },
        {
            name: 'Stock info',
            selector: row => ``,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => `${ucwords(row.ctgy_name)}`,
            sortable: true,
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'semibold',
                fontSize: '14px'
            },
        },
        rows: {
            style: {
                cursor: 'pointer',
            },
        },
    };

    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Products</h1>
                    <div className='flex gap-5'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text" 
                                className="grow" 
                                placeholder="Search" 
                            />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <select 
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">Filter By</option>
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
                    <DataTable
                        columns={columns}
                        data={filterProduct}
                        pagination
                        responsive
                        highlightOnHover
                        pointerOnHover
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </>
    )
}                    

export default ProductPage

