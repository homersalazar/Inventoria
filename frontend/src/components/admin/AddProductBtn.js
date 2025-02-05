import React from 'react'
import { Link } from 'react-router-dom'

export const AddProductBtn = () => {
    return (
        <Link to="/add-product" class="btn bg-[var(--secondary)] hover:bg-[var(--primary)] rounded-xl text-white">
            <i class="fa-solid fa-plus"></i> Add Product
        </Link>
    )
}
