import { Delete } from "@mui/icons-material";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CustomDialog } from "../../components/CustomDialog/CustomDialog";
import { FAB } from "../../components/FAB/FAB";
import { PrivateHeader } from "../../components/Headers/PrivateHeader";
import { useCreateContactMutation, useDeleteContactMutation, useGetContactsQuery } from "../../services/private";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQueryClient } from "react-query";

export const HomePage = () => {

    // ------------------------------ DATA ------------------------------ //
    const { data } = useGetContactsQuery({
        select: (data) => {
            const contacts = data?.data;
            return contacts.map((contact) =>({
                id: contact._id,
                name: contact.name,
                phone: contact.phone,
                email: contact.email
            }))
        }
    });

    const [selectedContact, setSelectedContact] = useState(null);

    // ------------------------------ ADD CONTACT ------------------------------ //
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const openAddDialog = () => setIsAddDialogOpen(true);
    const closeAddDialog = () => setIsAddDialogOpen(false);

    const schema = yup.object({
        name: yup.string().required('Name is required!'),
        phone: yup.string().required('Phone is required!'),
        email: yup.string().required('E-mail is required!')
    });
    
    const { register, formState: {errors, isSubmitting}, handleSubmit, reset } = useForm({resolver: yupResolver(schema)});

    const queryClient = useQueryClient();

    const { mutate: createContactMutate } = useCreateContactMutation({
        onSuccess: ()=> {
            queryClient.invalidateQueries(['/contacts (get)'])
        }
    });

    const onSubmit = (formData) =>{
        createContactMutate(formData);
        reset();
        closeAddDialog();
    };

    // ------------------------------ DELETE CONTACT ------------------------------ //
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    const { mutate: deleteContactMutate } = useDeleteContactMutation({
        onSuccess: ()=> {
            queryClient.invalidateQueries(['/contacts (get)'])
        }
    });

    const handleDeleteContact = () =>{
        deleteContactMutate({id: selectedContact?.id});
        setIsDeleteDialogOpen(false);
    };

    // ------------------------------ DATA GRID ------------------------------ //
    const ActionButtons = (params) =>{

        const handleOpenDeleteConfirmation = () =>{
            setSelectedContact(params.row);
            openDeleteDialog();
        };

        return(<Box>
            <IconButton sx={{backgroundColor: '#F5F5F5', mx: 1, height: '50px', width: '50px'}} onClick={handleOpenDeleteConfirmation}>
                <Delete/>
            </IconButton>
        </Box>)
    }

    const columns = [
        {field: 'name', headerName: 'Nombre', flex: 1},
        {field: 'phone', headerName: 'Teléfono', flex: 1},
        {field: 'email', headerName: 'Correo Electrónico', flex: 1},
        {field: 'actions', headerName: 'Acciones', flex: 1, renderCell: ActionButtons},
    ];

    return (
        <>
            <PrivateHeader/>
            <Grid container sx={{width: '100vw', height: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8, px: 14}}>
                <DataGrid
                    hideFooterPagination
                    columns={columns}
                    rows={data || []}
                    rowHeight={80}
                    cell
                    sx={{
                        ".MuiDataGrid-columnHeaders": {backgroundColor: '#E0F0FF'},
                        ".MuiDataGrid-columnHeaderTitle": {fontWeight: 'bold'},
                        ".MuiDataGrid-footerContainer": {backgroundColor: '#E0F0FF'},
                        fontSize: '16px'
                    }}
                />
                <FAB onClick={openAddDialog}/>
            </Grid>
            
            {/* Add Dialog */}
            <CustomDialog
                open={isAddDialogOpen}
                onClose={closeAddDialog}
                title='Agregar Contacto'
                confirmButtonTitle='Guardar'
                confirmButtonAction={handleSubmit((data)=> onSubmit(data))}
                confirmButtonDisabled={isSubmitting}
            >
                <form>
                    <TextField 
                        type='text' 
                        placeholder='Nombre' 
                        label='Nombre' 
                        variant='outlined' 
                        autoComplete='off' 
                        sx={{mt: 2, mb: 2, width: '100%'}}
                        //React Hook Form.
                        {...register('name', {required: true})}
                        error={!!errors.name}
                        helperText={!!errors.name ? errors.name?.message : null}
                    />
                    <TextField 
                        type='text' 
                        placeholder='Teléfono' 
                        label='Teléfono' 
                        variant='outlined' 
                        autoComplete='off' 
                        sx={{mb: 2, width: '100%'}}
                        name='password'
                        //React Hook Form.
                        {...register('phone', {required: true})}
                        error={!!errors.phone}
                        helperText={!!errors.phone ? errors.phone?.message : null}
                    />
                    <TextField 
                        type='text' 
                        placeholder='E-Mail' 
                        label='E-Mail' 
                        variant='outlined' 
                        autoComplete='off' 
                        sx={{width: '100%'}}
                        name='email'
                        //React Hook Form.
                        {...register('email', {required: true})}
                        error={!!errors.email}
                        helperText={!!errors.email ? errors.email?.message : null}
                    />
                </form>
            </CustomDialog>
                        
            {/* Delete Dialog */}
            <CustomDialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                title={`¿Seguro que desea eliminar el contacto ${selectedContact?.name}?`}
                confirmButtonTitle='Eliminar'
                confirmButtonAction={handleDeleteContact}
            />

        </>
    )
};