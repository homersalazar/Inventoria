import React from 'react'

export const CategoryCard = () => {
    return (
        <div className="card bg-base-100 w-full shadow-xl">
            <div className='flex flex-row md:flex-col w-full rounded-xl'>
                <figure className='bg-[var(--tertiary)] hover:bg-purple-300 flex flex-col items-center justify-center p-8'>
                    <i className="text-[var(--secondary)] text-3xl mb-2 fa-solid fa-shirt"></i>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">title</h2>
                    <p>number</p>
                </div>
            </div>
        </div>
    )
}

