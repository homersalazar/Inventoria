import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const handleLogout =  async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); 
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <nav className="menu bg-[var(--primary)] hidden md:inline-block lg:inline-block xl:inline-block h-full fixed z-10 w-52">
                <ul className="pt-16">
                    <li>
                        <a href="/admin-dashboard" className="text-lg hover:bg-[var(--secondary)] rounded-xl hover:text-white text-white font-bold">
                            <i className="fa-solid fa-house"></i> Home
                        </a>
                    </li>
                    <li>
                        <a href="/admin-dashboard" className="text-lg hover:bg-[var(--secondary)] rounded-xl hover:text-white text-white font-bold">
                            <i className="fa-solid fa-boxes-stacked"></i> Products
                        </a>
                    </li>
                    <li>
                        <a href="/admin-dashboard" className="text-lg hover:bg-[var(--secondary)] rounded-xl hover:text-white text-white font-bold">
                            <i className="fa-solid fa-clipboard-list"></i> Categories
                        </a>
                    </li>
                    <li>
                        <a href="/admin-dashboard" className="text-lg hover:bg-[var(--secondary)] rounded-xl hover:text-white text-white font-bold">
                            <i className="fa-solid fa-money-bills"></i> Finances
                        </a>
                    </li>
                    <li>
                        <a href="/admin-dashboard" className="text-lg hover:bg-[var(--secondary)] rounded-xl hover:text-white text-white font-bold">
                            <i className="fa-solid fa-gears"></i> Settings
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="w-full navbar">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <i className="fa-solid fa-bars text-xl"></i>
                            </label>
                        </div>
                        <div className="font-bold ml-20 text-xl hidden md:inline-block lg:inline-block xl:inline-block"></div>
                        <div className="flex-1 px-2 mx-2"></div>
                        <div className="flex-none pt-1">

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://as1.ftcdn.net/v2/jpg/08/05/28/22/1000_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 md:ml-20 lg:ml-20 xl:ml-20">
                    </div>
                </div>
                <div className="drawer-side z-[2]">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-[var(--primary)] text-center text-xl font-bold">
                        <li className="pt-16 py-0.5 flex justify-center items-center">
                            <a href="/admin-dashboard" className="hover:bg-[var(--secondary)] rounded-xl text-white">
                                Home
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a href="/admin-dashboard" className="hover:bg-[var(--secondary)] rounded-xl text-white">
                                Products
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a href="/admin-dashboard" className="hover:bg-[var(--secondary)] rounded-xl text-white">
                                Categories
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a href="/admin-dashboard" className="hover:bg-[var(--secondary)] rounded-xl text-white">
                                Finances
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a href="/admin-dashboard" className="hover:bg-[var(--secondary)] rounded-xl text-white">
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar
