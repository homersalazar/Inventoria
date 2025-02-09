import React from 'react';

export const ProductRelatedCard = ({ relatedProductData }) => {
    return (
        <div className="flex flex-row md:flex-col gap-3 bg-base-100 w-full">
            <h1 className="font-normal text-lg">Related products</h1>
            <div className="flex flex-row flex-grow gap-5 w-full">
                {relatedProductData.map((row, index) => (
                    <div key={index} className="card bg-base-100 rounded-xl items-center text-center">
                        <figure>
                            <img
                                src={`/uploads/product/${row.product_path}`}                            
                                alt={row.prod_name}
                                className='h-32 w-32'
                            />
                        </figure>
                        <p className='capitalize'>{row.prod_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
