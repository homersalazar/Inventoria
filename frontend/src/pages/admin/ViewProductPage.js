import React from 'react';
import SideBar from '../../components/admin/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ProductRelatedCard } from '../../components/admin/ProductRelatedCard';

const ViewProductPage = () => {
    const { item_code } = useParams()
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL;
    const { data } = useFetch(`${API_URL}/product/view/${item_code}`);
    const { data: relatedProductData } = useFetch(`${API_URL}/product-related/view/${data.ctgy_id}/${item_code}`);
    
    const handleCategory = () => {
        navigate('/categories');
    }
    
    return (
        <div>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <h1 className='text-2xl md:text-3xl font-semibold hidden md:block'>Products - <span className='capitalize'>{data.ctgy_name} - {data.prod_name}</span></h1>
                <div className='flex flex-row gap-5'>
                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className='flex flex-row gap-5 w-full px-10 pt-10'>
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
                                <ul className='text-gray-500 space-y-1'>
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
                        <div className="card-body">
                            <h2 className="card-title">{data.product_name}</h2>
                            <p>{data.description || 'No description available'}</p>
                            <div className="card-actions flex flex-row">
                                <button className="btn btn-sm btn-neutral">Delete</button>
                                <button className="btn btn-sm border-[var(--primary)] hover:bg-[var(--tertiary)] btn-ghost">
                                    Edit product
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <ProductRelatedCard relatedProductData={relatedProductData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductPage;
