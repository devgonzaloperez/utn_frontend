import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './styles.css';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/login";
import { MenuBook } from "@mui/icons-material";
import { useEffect } from "react";

export const LoginForm = () => {

    const schema = yup.object({
        email: yup
            .string()
            .required('E-mail is required!'),
        password: yup
            .string()
            .required('Password is required!')
    }).required();
    
    const { register, formState: {errors, isSubmitting}, handleSubmit, reset } = useForm({resolver: yupResolver(schema)});
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

    const authStore = useSelector(state => state.authStore);

    const onSubmit = async (data) => {
        await dispatch(login({user: data.email, pwd: data.password}));
        navigate(from, {replace: true});
        reset();
    };

    // useEffect(()=>{
    //     if(authStore.accessToken){
    //         navigate(from, {replace: true});
    //         reset();
    //     } 
    // }, [authStore]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MenuBook sx={{fontSize: '50px', color: '#429CE3'}}/>
            <Typography variant='h1' sx={{mb: 4, fontSize: '50px'}}>
                Login
            </Typography>
            <TextField 
                type='text' 
                placeholder='E-mail' 
                label='E-mail' 
                variant='outlined' 
                autoComplete='off' 
                sx={{mb: 2, width: '100%'}}
                //React Hook Form.
                {...register('email', {required: true})}
                error={!!errors.email}
                helperText={!!errors.email ? errors.email?.message : null}
            />
            <TextField 
                type='password' 
                placeholder='Password' 
                label='Password' 
                variant='outlined' 
                autoComplete='off' 
                sx={{mb: 2, width: '100%'}}
                name='password'
                //React Hook Form.
                {...register('password', {required: true})}
                error={!!errors.password}
                helperText={!!errors.password ? errors.password?.message : null}
            />
            {
                (authStore.errorMessage) && 
                <Typography textAlign='left' sx={{width: '100%', color: 'red', mb: 2}}>
                    {authStore.errorMessage}!
                </Typography>
            }
            <Button type='submit' variant='contained' sx={{width: '100%', height: '60px', mb: 4, backgroundColor: '#429CE3', '&:hover': {backgroundColor: '#429CE3'}}} disabled={isSubmitting}>Ingresar</Button>
            <Link to='/register'>No tengo cuenta aún. Registrarme!</Link>
        </form>
    )
};