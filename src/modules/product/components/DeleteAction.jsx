import { IconButton, Tooltip } from "@mui/material";
import DeleteModal from './DeleteModal';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";

export default function DeleteAction({id}) {
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        };

    return (
        <Box>
            <Tooltip title="Delete" placement="top">
                <IconButton aria-label="Delete" onClick={handleOpen}>
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>
            <DeleteModal id={id} open={open} onClose={handleClose}/>
        </Box>
    )
}
