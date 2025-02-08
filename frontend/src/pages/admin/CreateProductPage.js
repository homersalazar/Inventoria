import React, { useRef } from 'react'
import SideBar from '../../components/admin/SideBar'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'
import Swal from 'sweetalert2'

const CreateProductPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { data } = useFetch(`${API_URL}/category/fetch`);
    const fileInputRef = useRef(null); // Reference for file input

    const validate = async (values) => {
        const errors = {};
        if (!values.product_name?.trim()) errors.product_name = "Product name is required";
        if (!values.item_code?.trim()) errors.item_code = "Item code is required";
        if (!values.stock_size?.trim()) errors.stock_size = "Stock size is required";
        if (!values.ctgy_id?.trim()) errors.ctgy_id = "Category is required";
        if (!values.price?.trim()) errors.price = "Price is required";
        if (!values.product_path) errors.product_path = "Product photo is required";
        return errors;
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
        { 
            product_name: '', 
            item_code: '',
            stock_size: '',
            ctgy_id: '',
            price: '',
            product_path: '',
            description: ''
        },
        validate
    );

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('product_name', values.product_name);
            formData.append('item_code', values.item_code);
            formData.append('stock_size', values.stock_size);
            formData.append('ctgy_id', values.ctgy_id);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('product_path', values.product_path); // Append file
    
            const response = await fetch(`${API_URL}/product/store`, {
                method: 'POST',
                body: formData, // Use formData instead of JSON
            });
    

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            resetForm(); 
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input

            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56 mb-5'>
                <h1 className='text-2xl md:text-3xl font-semibold '>Add product</h1>
                <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex flex-row gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Product name*</span>
                                </div>
                                <input 
                                    name='product_name'
                                    value={values.product_name}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Product name" 
                                    className="input input-bordered w-full" 
                                />
                                {errors.product_name && <p className="text-red-500">{errors.product_name}</p>}
                            </label>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Item code*</span>
                                </div>
                                <input 
                                    name='item_code'
                                    value={values.item_code}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Item code" 
                                    className="input input-bordered w-full" 
                                />
                                {errors.item_code && <p className="text-red-500">{errors.item_code}</p>}
                            </label>
                        </div>

                        <div className='flex flex-col md:flex-row gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea 
                                    name='description'
                                    value={values.description}
                                    onChange={handleChange}
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
                                        name='stock_size'
                                        value={values.stock_size}
                                        onChange={handleChange}
                                        type="text" 
                                        placeholder="Stock size" 
                                        className="input input-bordered w-full" 
                                    />
                                    {errors.stock_size && <p className="text-red-500">{errors.stock_size}</p>}
                                </label>
                            </div>
                        </div>

                        <div className='flex flex-row gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select
                                    name='ctgy_id'
                                    className="select select-bordered w-full"
                                    value={values.ctgy_id}
                                    onChange={handleChange}
                                >
                                    <option disabled defaultValue>Select category</option>
                                    {data?.map((datas) => (
                                        <option
                                            className='capitalize'
                                            key={datas.id}
                                            value={datas.id}
                                        >
                                            {datas.ctgy_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.ctgy_id && <p className="text-red-500">{errors.ctgy_id}</p>}
                            </label>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price*</span>
                                </div>
                                <input 
                                    name='price'
                                    value={values.price}
                                    onChange={handleChange}
                                    type="number" 
                                    placeholder="0.00" 
                                    className="input input-bordered w-full" 
                                />
                                {errors.price && <p className="text-red-500">{errors.price}</p>}
                            </label>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Product photo*</span>
                                </div>
                                <input 
                                    ref={fileInputRef} 
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => handleChange({ target: { name: 'product_path', value: e.target.files[0] } })}
                                    type="file" 
                                    className="file-input file-input-bordered file-input-ghost w-full" 
                                />
                                {errors.product_path && <p className="text-red-500">{errors.product_path}</p>}
                            </label>
                        </div>
                        <div className='flex flex-row justify-center w-full mt-4'>
                            <button 
                                className="btn w-full md:w-1/3 text-white bg-[var(--primary)] hover:bg-[var(--secondary)]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateProductPage 