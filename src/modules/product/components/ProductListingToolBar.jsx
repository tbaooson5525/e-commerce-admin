import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

export default function ProductListingToolBar() {
    return (
        <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button to="/products/new" variant="outlined" startIcon={<AddIcon />} sx={{marginLeft: "auto"}}>
            New Product
        </Button>
        </GridToolbarContainer>
    )
}
