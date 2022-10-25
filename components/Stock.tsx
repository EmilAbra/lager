import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';
import productsModel from "../models/products.ts";
import StockList from "./StockList.tsx";

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={Typography.header2}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}
