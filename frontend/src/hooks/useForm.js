import { useState } from "react";

function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = async (e) => {
        const { name, type, files } = e.target;
        let value;

        if (type === 'file') {
            value = files[0];
        } else if (type === 'checkbox') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        // Validate field on change if validate function exists
        if (validate) {
            const validationErrors = await validate({
                ...values,
                [name]: value
            });
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validationErrors[name]
            }));
        }
    };

    const handleBlur = async (e) => {
        const { name } = e.target;
        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));

        // Validate on blur
        if (validate) {
            const validationErrors = await validate({
                ...values,
                [name]: values[name]
            });
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validationErrors[name]
            }));
        }
    };

    const handleSubmit = async (e, onSubmit) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mark all fields as touched
        const touchedFields = Object.keys(values).reduce((acc, key) => ({
            ...acc,
            [key]: true
        }), {});
        setTouched(touchedFields);

        try {
            // Run full validation and wait for it to complete
            if (validate) {
                const validationErrors = await validate(values);
                setErrors(validationErrors);

                // If there are validation errors, stop submission
                if (Object.keys(validationErrors).length > 0) {
                    setIsSubmitting(false);
                    return;
                }
            }

            // Only proceed with submission if there are no validation errors
            if (onSubmit) {
                await onSubmit(values);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setValues
    };
}

export default useForm;