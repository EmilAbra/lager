import { View, Text, ScrollView, Button } from "react-native";
import { useState, useEffect } from 'react';

import orderModel from "../models/orders";
import productsModel from "../models/products";
import { Base, Typography } from '../styles';


export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [listOfProducts, setListOfProducts] = useState([]);

    useEffect(() => {
        (async () => {
            setListOfProducts(await productsModel.getProducts());
        })();
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productsModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const productsHash = listOfProducts.reduce((hash, current) => ({ ...hash, [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
        }

        return <Text
                key={index}
                style={Typography.normalCentre}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Kund:</Text>
            <Text style={Typography.normalCentre}>{order.name}</Text>
            <Text style={Typography.normalCentre}>{order.address}</Text>
            <Text style={Typography.normalCentre}>{order.zip} {order.city}</Text>

            <Text style={Typography.header1}>Produkter:</Text>

            {orderItemsList}

            {allInStock
                ? <Button title="Plocka order" onPress={pick} style={Base.button} />
                : <Text style={Typography.notInStock}>Det finns inte tillräckligt med varor på lagret.</Text>
            }

        </ScrollView>
    )
};
