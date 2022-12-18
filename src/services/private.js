import { useQuery, useMutation } from 'react-query';
import { axiosPrivateInstance } from './axios';

//1. GET ALL CONTACTS (GET).
export const useGetContactsQuery = (queryOptions) => useQuery({
    ...queryOptions,
    queryKey: '/contacts (get)',
    queryFn: () => axiosPrivateInstance.get('/contacts')
});

//2. CREATE A CONTACT (POST).
export const useCreateContactMutation = (mutationOptions) => useMutation({
    ...mutationOptions,
    mutationKey: '/contacts (post)',
    mutationFn: (newContact) => axiosPrivateInstance.post('/contacts', newContact)
});

//3. DELETE A CONTACT (POST).
export const useDeleteContactMutation = (mutationOptions) => useMutation({
    ...mutationOptions,
    mutationKey: '/contacts (delete)',
    mutationFn: (contactID) => axiosPrivateInstance.delete('/contacts', {data: contactID})
});
