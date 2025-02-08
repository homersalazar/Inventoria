import React from 'react';

export const ProductRelatedCard = ({ relatedProductData }) => {
    return (
        <div className="flex flex-row md:flex-col gap-3 bg-base-100 w-full">
            <h1 className="font-normal text-lg">Related products</h1>
            <div className="grid grid-cols-3 w-full">
                {relatedProductData.map((row, index) => (
                    <div key={index} className="card bg-base-100 rounded-xl items-center text-center">
                        <figure>
                            <img
                                src={`/uploads/product/${row.product_path}`}                            
                                alt={row.prod_name}
                                className='h-36 w-36'
                            />
                        </figure>
                        <p>{row.prod_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
