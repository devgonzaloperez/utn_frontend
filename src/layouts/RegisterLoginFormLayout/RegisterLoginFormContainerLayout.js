import { Box, Grid } from '@mui/material';

export const RegisterLoginFormContainerLayout = ({title, children}) => {
    return (
        <Grid item xs={10} sm={8} md={6} lg={4} sx={{height: '80vh', backgroundColor: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 8}}>
            <Box sx={{height: '100%', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                {children}
            </Box>
        </Grid>
    )
};