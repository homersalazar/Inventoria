import React from 'react';
import SideBar from '../../components/admin/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ProductRelatedCard } from '../../components/admin/ProductRelatedCard';

const ViewProductPage = () => {
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL;

    const { item_code } = useParams()
    const { data } = useFetch(`${API_URL}/product/view/${item_code}`);
    const { data: relatedProductData } = useFetch(`${API_URL}/product-related/view/${data.ctgy_id}/${item_code}`);
    
    const handleCategory = () => {
        navigate('/categories');
    }

    const handleEditProduct = (item_code) => {
        navigate(`/product/edit/${item_code}`); 
    }
    
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56 mb-5'>
                <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Products - <span className='capitalize'>{data.ctgy_name} - {data.prod_name}</span>
                    <br/><p className='text-sm font-normal text-gray-600'>date</p>
                </h1>
                <div className='flex flex-col md:flex-row md:gap-5 w-full card bg-base-100 border-[var(--primary)] border-2 rounded-xl'>
                    <div className="w-full">
                        <div className='flex flex-col md:flex-row md:gap-5 w-full p-5 '>
                            <figure>
                                <img
                                    src={`/uploads/product/${data.product_path}`}                            
                                    alt={data.prod_name}
                                    className="rounded-xl h-48 w-48"
                                />
                            </figure>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-bold capitalize text-xl'>
                                    {data.prod_name}
                                </h1>
                                <ul className='text-gray-500 text-sm space-y-2 mt-3'>
                                    <li>{data.brand || 'Unnamed Brand'}</li>
                                    <li>{data.available_size ? `Available Sizes: ${data.available_size}` : 'Available Sizes: N/A'}</li>
                                    <li>Category: &nbsp;
                                        <span 
                                            className='capitalize cursor-pointer hover:underline hover:text-[var(--primary)]'
                                            onClick={handleCategory}
                                        >
                                            {data.ctgy_name || 'N/A'}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col-reverse md:flex-col gap-3 p-5 w-full ml-auto">
                            <div className="card-actions flex flex-row">
                                <button className="btn btn-sm btn-neutral">Delete</button>
                                <button
                                    onClick={() => handleEditProduct(data.item_code)}  
                                    className="btn btn-sm border-[var(--primary)] hover:bg-[var(--tertiary)] btn-ghost"
                                >
                                    Edit product
                                </button>
                            </div>
                            <p>
                                {data.description || 'No description available'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <ProductRelatedCard relatedProductData={relatedProductData} />
                </div>
            </div>
        </>
    );
};

export default ViewProductPage;
    