import { Avatar, Box, CardMedia, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import Loading from "../../product/components/Loading";

export default function UserListing() {
    const { isLoading, data: users, error,} = useQuery({
        queryKey: ["users"],
        queryFn: () => supabase.from("user").select("*, role (name)"),
        select: (res) => {
            return res.data.map((item) => ({
                ...item,
                role: item.role.name,
            }));
        },
    });

    if (isLoading) return <Loading />;

    const gridData = {
    columns: [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "full_name",
            headerName: "Full Name",
            width: 250,
            renderCell: (params) => {
                const fullName = params.value || "Hacker Vietnam";
                const avatar = params.row.avatar;
                return (
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar src={avatar} alt={fullName}></Avatar>
                        <Box>{fullName}</Box>
                    </Stack>
                );
            }
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "role",
            headerName: "Role",
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 150
        },
    ],
    rows: users,
    };

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
                {...gridData}
                slots={{
                toolbar: GridToolbar,
                }}
            />
        </Box>
    );
}