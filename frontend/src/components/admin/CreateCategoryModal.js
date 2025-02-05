import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';

const CreateCategoryModal = ({ refetch }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const fileInputRef = useRef(null); // Reference for file input

    const validate = async (values) => {
        const errors = {};
        if (!values.ctgy_name) errors.ctgy_name = "Category name is required";
        if (!values.image) errors.image = "Image is required";
        return errors;
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
        { ctgy_name: '', image: null },
        validate
    );

    const onSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('ctgy_name', values.ctgy_name);
            formData.append('image', values.image);

            const response = await fetch(`${API_URL}/category/store`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Category input failed');
            }else{
                refetch();  // Fetch updated categories
                document.getElementById("add_category_modal").checked = false
 
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
    };

    return (
        <>
            <input type="checkbox" id="add_category_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                        <h1>Create category</h1>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Category name</span>
                            </div>
                            <input 
                                name='ctgy_name'
                                value={values.ctgy_name}
                                onChange={handleChange}
                                type="text" 
                                placeholder="Type here" 
                                className="input input-bordered w-full" 
                            />
                            {errors.ctgy_name && <p className="text-red-500">{errors.ctgy_name}</p>}
                        </label>
                        <input 
                            ref={fileInputRef} // Assign ref to file input
                            name='image'
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })}
                            type="file" 
                            className="file-input file-input-ghost w-full mt-3" 
                        />
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                        <div className="modal-action">
                            <button 
                                type='submit' 
                                className='btn bg-[var(--primary)] text-white hover:bg-[var(--secondary)]'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                            <label htmlFor="add_category_modal" className="btn">Close</label>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
};

export default CreateCategoryModal;