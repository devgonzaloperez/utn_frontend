import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const FAB = ({onClick}) => {
    return (
        <IconButton sx={{backgroundColor: '#429CE3', height: '80px', width: '80px', position: 'absolute', right: 16, bottom: 16}} onClick={onClick}>
            <Add sx={{fontSize: '60px', color: 'white'}}/>
        </IconButton>
    )
};