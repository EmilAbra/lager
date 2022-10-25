import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';
import productsModel from "../models/products.ts";


export default function StockList({products, setProducts}) {
    useEffect(() => {
        (async () => {
            setProducts(await productsModel.getProducts());
        })();
    }, []);

    const list = products.map((product, index) => {
        return <Text
            style={Typography.normal}
            key={index}>
                { product.name } - { product.stock }
            </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
}
