
import { toast } from 'react-toastify';

export const redirectToLogin = () => {
    toast.error('Session expired, please login again');
    setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('/');
    }, 2000);
};