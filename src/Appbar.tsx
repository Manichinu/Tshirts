import React, { useEffect, useState } from "react";
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [cart, setCart] = useState(0);
    const [product, setProduct] = useState([]);
    const [colors, setColors] = useState<any[]>([]);
    console.log(product);

    useEffect(() => {
        fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json")
            .then(response => response.json())
            .then(data => setData(data))
    }, [])
    console.log(data)


    const searchItems = (searchVal: any) => {
        console.log(searchVal)
        setValue(searchVal)
    }
    const cartItems = (item: any) => {
        setCart(cart + 1);
        const newItems = [item];

        // Use the spread operator to create a new array by combining the existing 'product' array and the new items
        const updatedProduct: any = [...product, ...newItems];

        // Update the state with the new array of items
        setProduct(updatedProduct);
    }
    const handleChange1 = (event: any) => {
        if (event.target.checked == true) {
            var get = event.target.value;
            setValue(event.target.value)
            console.log(value)
            var selectedColors: any = [...colors, get]
            setColors(selectedColors);
            console.log(colors);
        } else {
            setValue("");
            setColors(
                colors.filter((item) => item !== event.target.value)
            )
            console.log(colors);
        }
    };
    const navigate = useNavigate();
    // console.log("test")
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: "grey" }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Products
                        </Typography>
                        <Button color="inherit">Cart</Button>
                        <Badge badgeContent={cart} color="primary" onClick={() => navigate('/cartitems', { state: { product, value } })}>
                            <AddShoppingCartIcon />
                        </Badge>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <TextField
                    id="standard-search"
                    label="Search for products..."
                    type="search"
                    variant="standard"
                    onChange={(e) => searchItems(e.target.value)}
                />
                <PageviewRoundedIcon fontSize="large" sx={{ marginTop: "18px", color: "grey" }} />
            </Box>
            <Box sx={{ display: "flex" }}>
                <Paper elevation={3} sx={{ width: "300px", height: "400px", marginLeft: "20px", marginTop: "20px" }}>
                    <div style={{ marginLeft: "15px" }}>
                        <Typography variant="h6">
                            Color
                        </Typography>
                        <FormGroup sx={{ marginLeft: "10px" }}>
                            {data.filter((item: any, index: any) => data.findIndex((i: any) => i.color === item.color) === index).map((item: any, key: any) => {
                                return (
                                    <FormControlLabel control={<Checkbox />} label={item.color} value={item.color} onChange={(e: any) => handleChange1(e)} />

                                )
                            })}
                        </FormGroup>
                        <Typography variant="h6">
                            Gender
                        </Typography>
                        <FormGroup sx={{ marginLeft: "10px" }}>
                            {data.filter((item: any, index: any) => data.findIndex((i: any) => i.gender === item.gender) === index).map((item: any, key: any) => {
                                return (
                                    <FormControlLabel control={<Checkbox />} label={item.gender} value={item.gender} onChange={(e: any) => handleChange1(e)} />

                                )
                            })}
                        </FormGroup>
                    </div>
                </Paper>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="grid">
                    {data.filter((item: any, key: any) => {
                        if (value == "") {
                            return item;
                        } else {
                            return (

                                (item.name != null && item.name.toLowerCase().includes(value.toLowerCase())) ||
                                (item.gender != null && item.gender.toLowerCase().includes(value.toLowerCase())) ||
                                (item.price != null && item.price.toString().includes(value)) ||
                                (item.color != null && item.color.toLowerCase().includes(value.toLowerCase())) ||
                                (colors.includes(item.color.toLowerCase()))

                            );
                        }

                    }).map((item: any, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140, objectFit: "fill", margin: "20px" }}
                                    image={item.imageURL}
                                    title="green iguana"
                                />
                                <Stack direction="row" spacing={2} sx={{ marginBottom: "10px", justifyContent: "space-between", margin: "10px" }}>
                                    <Typography sx={{ marginTop: "8px !important", marginLeft: "40px !important" }}>Rs.{item.price}</Typography>
                                    <Button variant="contained" size="small" sx={{ background: "black" }} onClick={() => cartItems(item)}>Add to cart</Button>
                                </Stack>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Box>



        </>
    )
}

export default Navbar;