import React, { useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import DataTable from 'react-data-table-component';
import useFetch from '../../hooks/useFetch';
import CreateQuantityModal from '../../components/admin/CreateQuantityModal';

import { useParams } from 'react-router-dom'
import { ucwords } from '../../utils/Ucwords';
import EditProductModal from '../../components/admin/EditProductModal';

const EditProductPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [prodId, setProdId] = useState(null);
    const [productId, setProductId] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const { item_code } = useParams()
    const { data, refetch } = useFetch(`${API_URL}/product/edit/${item_code}`);

    const handleAddQuantity = (id) => {
        setProdId(id);          
    }

    const handleEditProduct = (id) => {
        setProductId(id);          
    }

    const filterProducts = (data || []).filter(row => {
        return (
            `${ucwords(row.prod_name)}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.ctgy_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.price.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    

    const columns = [
        {
            name: '',
            selector: row => (
                <div className="flex items-center gap-3 p-1">
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
            selector: row => (
                <span className={row.quantity === 0 ? 'text-gray-400' : ''}>
                    {ucwords(row.prod_name)}
                </span>
            ),            
            sortable: true,
        },
        {
            name: 'Stock size',
            selector: row => (
                <span className={row.quantity === 0 ? 'text-gray-400' : ''}>
                    {ucwords(row.size)}
                </span>
            ),           
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => (
                <span className={row.quantity === 0 ? 'text-gray-400' : ''}>
                    {(Number(row.price) || 0).toFixed(2)}
                </span>
            ),   
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => (
                row.quantity > 5 ? <span className="badge text-white p-3 bg-[var(--primary)]">Active</span> : 
                row.quantity <= 5 && row.quantity !== 0 ? <span className="badge text-white p-3 bg-[var(--primary)]">Low stock</span> : 
                <span className="badge text-white p-3 bg-[var(--secondary)]">Sold out</span>
            ),
            sortable: true,
        },
        {
            name: 'Stock info',
            selector: row => (
                <span className={row.quantity === 0 ? 'text-gray-400' : ''}>
                    {row.quantity} in stock
                </span>
            ),   
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => (
                <span className={row.quantity === 0 ? 'text-gray-400' : ''}>
                    {ucwords(row.ctgy_name)}
                </span>
            ),   
            sortable: true,
        },
        {
            name: '',
            selector: row => (
                <div className='flex flex-row gap-2 w-full'>
                    <label
                        className="text-green-500 hover:text-green-700"
                        htmlFor="add_quantity_modal" 
                        onClick={() => handleAddQuantity(row.id)}
                    >
                        <i className="fa-solid fa-plus-circle"></i>
                    </label>
                    <label
                        className="text-blue-500 hover:text-blue-700"
                        htmlFor="edit_product_modal" 
                        onClick={() => handleEditProduct(row.id)}
                    >
                        <i className="fa-solid fa-edit"></i>
                    </label>
                    <button
                        className="text-red-500 hover:text-red-700"
                        // onClick={() => handleDelete(row.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
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
            <CreateQuantityModal 
                refetch={refetch} 
                prodId={prodId}
            />

            <EditProductModal 
                refetch={refetch} 
                productId={productId}
            />

            <div className='flex flex-col px-5 md:ml-56'>
                <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Edit Products</h1>
                <div className='flex justify-end w-full py-2 gap-5'>
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
                </div>
                <div className="overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={filterProducts}
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

export default EditProductPage
