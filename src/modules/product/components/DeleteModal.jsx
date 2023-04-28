import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../../config/supbase';
import CircularProgress from '@mui/material/CircularProgress';


export default function DeleteModal({open, onClose, id}) {
    const queryClient = useQueryClient()
    const deleteProductMutation = useMutation({
        mutationFn: () => supabase.from("product").delete().eq("id",id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            onClose();
        }
    })

    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">DO YOU SURE???????</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really sure to delete this product????????????????????????
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined'  color='error' onClick={() => deleteProductMutation.mutate()} startIcon={deleteProductMutation.isLoading && <CircularProgress/>} >UKM</Button>
                <Button onClick={onClose} variant='outlined' color='primary' autoFocus >
                    Hong
                </Button>
            </DialogActions>
        </Dialog>
    )
}
