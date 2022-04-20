import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import icecream from '../assets/icecream.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles';

export default function Home({route, products, setProducts}) {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Lager-Appen</Text>
            <Image source={icecream} style={Base.image} />
            <Stock products={products} setProducts={setProducts}/>
        </ScrollView>
    );
}
