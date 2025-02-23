import React from 'react'
import { Link } from 'react-router-dom'

export const AddProductBtn = () => {
    return (
        <Link to="/add-product" className="btn bg-[var(--secondary)] hover:bg-[var(--primary)] rounded-xl text-white">
            <i className="fa-solid fa-plus"></i> Add Product
        </Link>
    )
}
