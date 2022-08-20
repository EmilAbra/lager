import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Typography } from '../styles';

import config from "./../config/config.json";
import orderModel from "../models/orders.ts";


export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders())
    }

    useEffect( () => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <View style={Base.button} key={index}>
                <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
                />
                </View>
        });

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.header2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </ScrollView>
    );
}
