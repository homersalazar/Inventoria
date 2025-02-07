import React from 'react'

export const CategoryCard = ({ id, image_path, ctgy_name }) => {
    return (
        <div class="flex flex-row md:flex-col bg-base-100 w-full rounded-2xl shadow-xl">
            <figure className="md:px-5 md:pt-5">
                <img
                    src={`/uploads/category/${image_path}`}                            
                    alt={ctgy_name} 
                    className="rounded-xl md:w-full md:h-40 h-32 w-32" 
                />
            </figure>
            
            <div class="card-body">
                <h2 className="card-title capitalize">{ctgy_name}</h2>
                <p>{image_path}</p>            
            </div>
        </div>
    )
}

