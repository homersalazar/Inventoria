import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link 
                        to="/" 
                        className="btn btn-ghost text-xl"
                    >
                        E-commerce
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div>
                            <span className="badge badge-sm indicator-item ml-5">8</span>
                            <i className="fa-solid fa-cart-plus fa-xl text-yellow-500"></i>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-200 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <Link to="/login" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
