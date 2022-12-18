import { useMutation } from 'react-query';
import { axiosPublicInstance } from './axios';

//1. USER REGISTER.
export const useRegisterUserMutation = (mutationOptions) => useMutation(
    (newUser) => axiosPublicInstance.post('/register', newUser), 
    {...mutationOptions}
);