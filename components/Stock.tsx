import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text style={ styles.list } key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
            <Text style={styles.header}>Lagerförteckning</Text>
            <StockList/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        color: '#333',
        fontSize: 24,
        paddingLeft: 12,
        marginTop: 0,
        marginBottom: 10
    },
    list: {
        paddingLeft: 12,
        fontSize: 17,
        marginBottom: 10,
        color: '#444'
    }
});
