import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'

const EditProductModal = ({ refetch, productId }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { data: productData } = useFetch(productId ? `${API_URL}/product/show/${productId}` : null);

    const validate = async (values) => {
        const errors = {};
        if (!values.prod_name) errors.prod_name = "Product name is required";
        if (!values.item_code) errors.item_code = "Item code is required";
        if (!values.size) errors.size = "Size is required";
        if (!values.price) errors.price = "Price is required";
        return errors;
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit, setValues } = useForm(
        { 
            prod_name: '', 
            item_code: '', 
            description: '', 
            size: '', 
            price: '', 
            product_path: '' 
        },
        validate
    );

    useEffect(() => {
        if (productData) {
            setValues({
                prod_name: productData.prod_name || '', 
                item_code: productData.item_code || '', 
                description: productData.description || '', 
                size: productData.size || '', 
                price: productData.price || '', 
                product_path: productData.product_path || ''
            });
        }
    }, [productData, setValues, productId, refetch]); 

    const onSubmit = async (formValues) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_URL}/product/update/${productId}`,
                formValues,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = response.data; 
            await refetch(); 
            setValues(formValues); 
    
            document.getElementById("edit_product_modal").checked = false;

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
    };

    return (
        <>
            <input type="checkbox" id="edit_product_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box max-w-2xl">
                    <form 
                        onSubmit={(e) => handleSubmit(e, onSubmit)}
                    >
                        <h1>Edit Product</h1>
                        <div className='flex flex-col gap-1 w-full'>
                            <div className="flex flex-row justify-center gap-2 w-full">
                                <div className="relative">
                                    <img 
                                        src={`/uploads/product/${values.product_path}`} 
                                        alt={values.prod_name} 
                                        className="h-32 w-full object-cover rounded" 
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5 w-full'>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Product name</span>
                                    </div>
                                    <input 
                                        name='prod_name'
                                        value={values.prod_name}
                                        onChange={handleChange}
                                        type="text" 
                                        className="input input-bordered w-full" 
                                    />
                                    {errors.prod_name && <p className="text-red-500">{errors.prod_name}</p>}
                                </label>

                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Item code</span>
                                    </div>
                                    <input 
                                        name='item_code'
                                        value={values.item_code}
                                        onChange={handleChange}
                                        type="text" 
                                        className="input input-bordered w-full" 
                                    />
                                    {errors.item_code && <p className="text-red-500">{errors.item_code}</p>}
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea 
                                    name='description'
                                    value={values.description ?? ""}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered" 
                                >
                                </textarea>
                                {errors.description && <p className="text-red-500">{errors.description}</p>}
                            </div>

                            <div className='flex flex-row gap-5 w-full'>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Size</span>
                                    </div>
                                    <input 
                                        name='size'
                                        value={values.size}
                                        onChange={handleChange}
                                        type="text" 
                                        className="input input-bordered w-full" 
                                    />
                                    {errors.size && <p className="text-red-500">{errors.size}</p>}
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Price</span>
                                    </div>
                                    <input 
                                        name='price'
                                        value={values.price}
                                        onChange={handleChange}
                                        type="number" 
                                        className="input input-bordered w-full" 
                                    />
                                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                                </label>
                            </div>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Upload</span>
                                </div>
                                <input 
                                    type="file" 
                                    name='product_path'
                                    onChange={handleChange}
                                    className="file-input file-input-bordered w-full w-full"
                                />
                                {errors.product_path && <p className="text-red-500">{errors.product_path}</p>}

                                {values.product_path && (
                                    <p className="mt-1 text-gray-600">Selected file: {values.product_path}</p>
                                )}
                            </label>
                        </div>
                        <div className="modal-action">
                            <button 
                                type='submit' 
                                className='btn bg-[var(--primary)] text-white hover:bg-[var(--secondary)]'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Update"}
                            </button>
                            <label htmlFor="edit_product_modal" className="btn">Close</label>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
};

export default EditProductModal;