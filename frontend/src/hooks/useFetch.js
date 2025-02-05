import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Store options in a ref to prevent unnecessary re-renders
    const optionsRef = useRef(options);
    
    // Update ref if options change
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    useEffect(() => {
        if (!url) return;

        const source = axios.CancelToken.source();
        const token = localStorage.getItem("token");
        let isMounted = true;

        const fetchData = async () => {
            if (!isMounted) return;
            
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(url, {
                    ...optionsRef.current,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                        ...optionsRef.current.headers,
                    },
                    cancelToken: source.token,
                });

                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    // Only log cancellation in development
                    if (process.env.NODE_ENV === 'development') {
                        console.debug('Request canceled:', err.message);
                    }
                } else if (isMounted) {
                    setError(err.message);
                    
                    // Log other errors in development
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Fetch error:', err);
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            source.cancel();  // Removed the message since we don't need it
        };
    }, [url]);

    // Add a retry function
    const refetch = async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        
        try {
            const response = await axios.get(url, {
                ...optionsRef.current,
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    ...optionsRef.current.headers,
                },
            });
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch };
};

export default useFetch;