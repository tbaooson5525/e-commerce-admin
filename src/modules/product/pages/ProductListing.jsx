import { useQuery } from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Rating, Stack, CardMedia, Chip, IconButton, Tooltip } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
import ProductListingToolBar from "../components/ProductListingToolBar";
import Loading from "../components/Loading";
import DeleteAction from "../components/DeleteAction";


export default function ProductListing() {
  const { isLoading, data: products, error } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      supabase.from("product").select(`id, title, pricce, stock, rating, thumbnail, category (name), brand (name)`),
      select: (res) => {
        return res.data.map(
          item => ({
            ...item,
            category: item.category.name,
            brand: item.brand.name,
          })
        );
      },
  });

  if (isLoading)
    return <Loading/>;

  const gridData = {
    columns: [{
      field: "id",
      headerName: "ID"
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      renderCell: (param) => {
        const thumbnail = param.row.thumbnail;
        const title = param.value;
        return (
          <Stack direction="row" alignItems="center">
          <Box width={70} height={50}>
            <CardMedia
              component="img"
              height={50}
              width={50}
              image={thumbnail}
              alt={title}
              sx={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>{title}</Box>
        </Stack>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock"
    },
    {
      field: "pricce",
      headerName: "Price"
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (param) => {
        const categoryColors = {
          laptops: "primary",
          smartphones: "success",
          pc: "secondary",
          tablets: "error"
        }

        return <Chip label={param.value} color={categoryColors[param.value]} variant="contained" size="small"/>
      }
    },
    {
      field: "brand",
      headerName: "Brand",
      renderCell: (param) => {
        const brandColors = {
          apple: "primary",
          samsung: "success",
          lg: "secondary",
          nokia : "error"
        }

        return <Chip label={param.value} color={brandColors[param.value]} variant="outlined" size="small"/>
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      renderCell: (param) => {
        return (
          <Rating
            name = {param.field}
            value = {param.value}
            readOnly
            precision={0.5}
          />
        )
      },
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        return (
          <Stack direction="row" alignItems="center" gap={2}>

            <Tooltip title="View Detail" placement="top">
              <IconButton aria-label="View Detail" to={`/products/${param.id}`}>
                <InfoIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit" placement="top">
              <IconButton aria-label="Edit">
                <CreateIcon />
              </IconButton>
            </Tooltip>

            <DeleteAction id={param.id}/>
          </Stack>
        )
      },
      width: 200
    }
    ],
    rows: products,
  }

  return (
    <Box>
      <div sx={{ height: 600, width: '100%' }}>
        <DataGrid {...gridData} components={{Toolbar: ProductListingToolBar}}/>
      </div>
    </Box>
  )
}
