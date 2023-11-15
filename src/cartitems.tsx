import React from 'react';
import { useLocation } from 'react-router-dom'

function CartItems() {
    const location = useLocation();
    const Items = location.state;
    console.log(Items)
    return (

        <h1>Test</h1>
    )
}

export default CartItems;