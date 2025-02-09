import React from 'react';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';

const CreateQuantityModal = ({ refetch, prodId }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const validate = async (values) => {
        const errors = {};
        if (!values.quantity) errors.quantity = "Quantity is required";
        return errors;
    };
    
    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
        { 
            quantity: '',
            prod_id: prodId,
            trans_status: '0' // add 
        },
        validate
    );
        
    const onSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/quantity/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                    prod_id: prodId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Category input failed');
            }else{
                refetch();  // Fetch updated categories
                document.getElementById("add_quantity_modal").checked = false
            }

            const data = await response.json();

            resetForm(); 

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
            <input type="checkbox" id="add_quantity_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                        <h1>Add Quantity</h1>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input 
                                name='quantity'
                                value={values.quantity}
                                onChange={handleChange}
                                type="number" 
                                placeholder="0.00" 
                                className="input input-bordered w-full" 
                            />
                            {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                        </label>
                        <div className="modal-action">
                            <button 
                                type='submit' 
                                className='btn bg-[var(--primary)] text-white hover:bg-[var(--secondary)]'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                            <label htmlFor="add_quantity_modal" className="btn">Close</label>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
};

export default CreateQuantityModal;