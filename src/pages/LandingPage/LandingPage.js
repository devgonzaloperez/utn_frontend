import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LandingPageAnimation } from '../../components/LandingPageAnimation/LandingPageAnimation';
import { PublicHeader } from '../../components/Headers/PublicHeader';  

export const LandingPage = () => {
    
    return (

    <>
        {/* Header */}
        <PublicHeader/>
        {/* Grid */}
        <Grid container sx={{width: '100vw', height: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: 4}}>
            <Grid item xs={5} sx={{height: '100%', mx: {xs: 0, md: 1}, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Box sx={{width: '80%'}}>
                    <Typography variant='h1' sx={{fontWeight: 'bold'}}>AgendApp!</Typography>
                    <Typography variant='h2' sx={{fontSize: '30px', mt: 2, color: 'grey'}} textAlign='justify'>La aplicación para gestionar todos tus contactos en la nube de manera segura.</Typography>
                    <Link to='/login' style={{textDecoration: 'none'}}>
                        <Button sx={{backgroundColor: '#429CE3', color: 'white', px: 6, py: 2, fontSize: '24px', mt: 4, '&:hover': {backgroundColor: '#429CE3'}}}>Empezar</Button>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={5} sx={{height: '100%', mx: {xs: 0, md: 1}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <LandingPageAnimation size='700px'/>
            </Grid>
        </Grid>
    </>
    )
};