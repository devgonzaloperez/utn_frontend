import { Grid } from '@mui/material';

export const RegisterLoginPageLayout = ({children}) => {
    return (
        <Grid container sx={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           {children}
        </Grid>
    )
};