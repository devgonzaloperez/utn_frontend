import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const CustomDialog = ({open, onClose, title, confirmButtonTitle, confirmButtonAction, confirmButtonDisabled, children}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle align='center' sx={{fontWeight: 'bold', fontSize: '28px'}}>{title}</DialogTitle>
            {
                (children) && <DialogContent>{children}</DialogContent>
            }
            <DialogActions sx={{p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Button variant='outlined' sx={{px: 5, py: 2}} onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='outlined' sx={{backgroundColor: 'blue', color: 'white', px: 5, py: 2}} onClick={confirmButtonAction} disabled={confirmButtonDisabled}>
                    {confirmButtonTitle}
                </Button>
            </DialogActions>
        </Dialog>     
    )
};