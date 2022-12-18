import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import './styles.css';
import { useRegisterUserMutation } from "../../services/public";
import { MenuBook } from "@mui/icons-material";

export const RegisterForm = () => {

    const schema = yup.object({
        name: yup
            .string()
            .required('Complete Name is required!'),
        email: yup
            .string()
            .required('E-mail is required!'),
        password: yup
            .string()
            .required('Password is required!'),
        passwordConfirmation: yup
            .string()
            .required('Password Confirmation is required!')
            .oneOf([yup.ref('password')], 'Password confirmation does not match with password!')
    }).required();
    
    const { register, formState: {errors, isSubmitting}, handleSubmit, reset } = useForm({resolver: yupResolver(schema)});
    
    const {data: response, mutate, error} = useRegisterUserMutation();

    const onSubmit = (data) => {
        mutate({
            user: data.email,
            pwd: data.password
        });
        (response?.status === 201 || error?.response?.status === 500) && reset();
    };

    return (
        (response?.status === 201)
        ? <Box>
            <Typography variant='h3' textAlign='center' sx={{mb: 6}}>¡Se ha registrado correctamente!</Typography>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button variant='contained' sx={{width: '100%', height: '60px'}}>Ir al Login</Button>
            </Link>
        </Box>
        : (error?.response?.status === 500)
            ? <Box>
                <Typography variant='h3' textAlign='center' sx={{mb: 6}}>¡Se produjo un error! Por favor vuelta a intentarlo.</Typography>
                <Link to='/register' style={{ textDecoration: 'none' }}>
                    <Button variant='contained' sx={{width: '100%', height: '60px'}}>Volver</Button>
                </Link>
            </Box>
            : <form onSubmit={handleSubmit(onSubmit)}>
                <MenuBook sx={{fontSize: '50px', color: '#429CE3'}}/>
                <Typography variant='h1' sx={{mb: 4, fontSize: '50px'}}>Registro</Typography>
                <TextField 
                    type='text' 
                    placeholder='Complete Name' 
                    label='Complete Name' 
                    variant='outlined' 
                    autoComplete='off' 
                    sx={{mb: 2, width: '100%'}}
                    //React Hook Form.
                    {...register('name', {required: true})}
                    error={!!errors.name}
                    helperText={!!errors.name ? errors.name?.message : null}
                />
                <TextField 
                    type='text' 
                    placeholder='E-Mail' 
                    label='E-Mail' 
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
                <TextField 
                    type='password' 
                    placeholder='Password Confirmation' 
                    label='Password Confirmation' 
                    variant='outlined' 
                    autoComplete='off' 
                    sx={{mb: 2, width: '100%'}}
                    name='passwordConfirmation'
                    //React Hook Form.
                    {...register('passwordConfirmation', {required: true})}
                    error={!!errors.passwordConfirmation}
                    helperText={!!errors.passwordConfirmation ? errors.passwordConfirmation?.message : null}
                />
                {
                    (error?.response?.status === 409) && 
                    <Typography textAlign='left' sx={{width: '100%', color: 'red', mb: 2}}>
                        Ya existe una cuenta con ese usuario!
                    </Typography>
                }
                <Button type='submit' variant='contained' sx={{width: '100%', height: '60px', mb: 4, backgroundColor: '#429CE3', '&:hover': {backgroundColor: '#429CE3'}}} disabled={isSubmitting}>Registrar</Button>
                <Link to='/login'>Ya tengo cuenta. Ir al login!</Link>
            </form>
    )
};

//Explanation:
//201 - User created.
//500 - Backend Error.
//409 - User with that e-mail already exists.