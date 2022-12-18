import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <Grid container sx={{height: '100vh', width: '100vw'}}>
            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant='h1' sx={{fontSize: '60px', mb: 2}}>Error 404</Typography>
                <Typography variant='h2' sx={{fontSize: '45px', mb: 4}}>Página No Encontrada</Typography>
                <Link to='/home' style={{textDecoration: 'none'}}>
                    <Button variant='outlined' sx={{px: 6, py: 2}}>Volver</Button>
                </Link>
            </Grid>
        </Grid>
    )
};