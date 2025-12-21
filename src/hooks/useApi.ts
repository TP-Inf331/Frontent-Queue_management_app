import React, { useState, useCallback, useRef } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface UseApiOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    successMessage?: string;
}

export function useApi<T, Args extends any[]>(
    apiFunc: (...args: Args) => Promise<T>,
    options: UseApiOptions<T> = {}
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const optionsRef = useRef(options);
    optionsRef.current = options;

    const execute = useCallback(
        async (...args: Args) => {
            setLoading(true);
            setError(null);
            try {
                const result = await apiFunc(...args);
                setData(result);
                if (optionsRef.current.successMessage) {
                    toast.success(optionsRef.current.successMessage);
                }
                optionsRef.current.onSuccess?.(result);
                return result;
            } catch (err) {
                const axiosError = err as AxiosError<{ detail?: string }>;
                const errorMessage =
                    axiosError.response?.data?.detail ||
                    axiosError.message ||
                    'An unknown error occurred';
                setError(errorMessage);
                toast.error(errorMessage);
                optionsRef.current.onError?.(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [apiFunc]
    );

    return { data, loading, error, execute, setData };
}
