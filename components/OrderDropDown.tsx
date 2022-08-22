import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import orderModel from "../models/orders.ts";
import storage from "../models/storage.ts";

export default function ProductDropDown(props) {
    const [orders, setOrders] = useState([]);

    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);
    // console.log(orders);
    // async function token() {
    //     let token = await storage.readToken();
    //     console.log(token);
    // }

    const itemsList = orders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
        ordersHash[order.id] = order;
        // token();

        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}
            >
            {itemsList}
        </Picker>
    );
}
