import React from 'react'
import SideBar from '../../components/admin/SideBar'

const CreateProductPage = () => {
    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56 mb-5'>
                <h1 className='text-2xl md:text-3xl font-semibold '>Add product</h1>
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-row gap-5 w-full'>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Product name*</span>
                            </div>
                            <input 
                                name='product_name'
                                // value={values.ctgy_name}
                                // onChange={handleChange}
                                type="text" 
                                placeholder="Product name" 
                                className="input input-bordered w-full" 
                            />
                            {/* {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>} */}
                        </label>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Item code*</span>
                            </div>
                            <input 
                                name='item_code'
                                // value={values.ctgy_name}
                                // onChange={handleChange}
                                type="text" 
                                placeholder="Item code" 
                                className="input input-bordered w-full" 
                            />
                            {/* {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>} */}
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 w-full'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea 
                                className="textarea textarea-bordered h-24" 
                                placeholder="Description"
                            >
                            </textarea>
                        </label>
                        <div className='flex flex-row gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Stock size*</span>
                                </div>
                                <input 
                                    name='item_code'
                                    // value={values.ctgy_name}
                                    // onChange={handleChange}
                                    type="text" 
                                    placeholder="Stock size" 
                                    className="input input-bordered w-full" 
                                />
                                {/* {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>} */}
                            </label>
                            <button 
                                className="btn mt-9"
                            >
                                Button
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 w-full'>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <input 
                                name='product_name'
                                // value={values.ctgy_name}
                                // onChange={handleChange}
                                type="text" 
                                placeholder="Category name" 
                                className="input input-bordered w-full" 
                            />
                            {/* {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>} */}
                        </label>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input 
                                name='item_code'
                                // value={values.ctgy_name}
                                // onChange={handleChange}
                                type="text" 
                                placeholder="Price" 
                                className="input input-bordered w-full" 
                            />
                            {/* {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>} */}
                        </label>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-3'>
                        <input type="file" className="file-input file-input-ghost w-full" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProductPage 