import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../../config/supbase';
import Loading from '../components/Loading';
import { Box, CardMedia, Rating } from '@mui/material';

export default function ProductDetail() {
    const {productId} = useParams ();

    const {isLoading,data, error} = useQuery({
        queryKey: ["products", productId],
        queryFn: () => supabase.from("product").select().eq("id", productId).single(),
        select: (res) => res.data,
    })
    if (isLoading) return <Loading/>

    return (
        <Box sx={{width: 500}}>
            <CardMedia component="img" image={data.thumbnail}/>
            <h1>{data.title}</h1>
            <p>Price: {data.pricce}$</p>
            <p>In stock: {data.stock}</p>
            <p>Description: {data.description}</p>
            <p>Rating: <br />
                <Rating value={data.rating} readOnly precision={0.5}/>
            </p>
        </Box>
    )
}
