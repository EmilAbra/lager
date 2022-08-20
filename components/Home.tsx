import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import icecream from '../assets/icecream.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles';
import { useEffect } from "react";
import productsModel from "../models/products.ts";


export default function Home({route, products, setProducts, delivery}) {
    useEffect( async () => {
        setProducts(await productsModel.getProducts());
    }, [delivery]);

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Lager-Appen</Text>
            <Image source={icecream} style={Base.image} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}
