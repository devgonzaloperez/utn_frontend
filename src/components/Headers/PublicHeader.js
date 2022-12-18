import { MenuBook } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PublicHeader = () => {
    return (
        <Box sx={{flexGrow: 1, height: '60px'}}>
            <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <IconButton sx={{mr: 1}}>
                        <MenuBook sx={{color: '#429CE3', fontSize: '50px'}}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, color: '#212121', fontWeight: 'bold'}}>AgendApp!</Typography>
                    <Link to='/login' style={{textDecoration: 'none'}}>
                        <Button sx={{outline: '1px solid #429CE3', color: '#429CE3', fontWeight: 'bold', py: 1, px: 2, '&:hover': {backgroundColor: 'transparent'}}}>Login</Button>
                    </Link>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <Button sx={{backgroundColor: '#429CE3', color: 'white', fontWeight: 'bold', ml: 1, py: 1, px: 2, '&:hover': {backgroundColor: '#429CE3'}}}>Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
};