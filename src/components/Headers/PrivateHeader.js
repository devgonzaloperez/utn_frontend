import { ExitToApp, MenuBook } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/logout";

export const PrivateHeader = () => {

    const authStore = useSelector(state => state.authStore);

    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logout());

    return (
        <Box sx={{flexGrow: 1, height: '60px'}}>
            <AppBar position="static" sx={{backgroundColor: 'white'}}>
                <Toolbar>
                    <IconButton sx={{mr: 1}}>
                        <MenuBook sx={{color: '#429CE3', fontSize: '50px'}}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, color: '#212121', fontWeight: 'bold'}}>AgendApp!</Typography>

                    <Typography variant="span" sx={{color: 'black', mr: 2}}>
                        {authStore?.user}
                    </Typography>
                    <IconButton sx={{backgroundColor: '#F5F5F5', height: '50px', width: '50px'}} onClick={handleLogout}>
                        <ExitToApp sx={{color: 'grey'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
};