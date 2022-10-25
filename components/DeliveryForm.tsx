import { useState } from "react";
import { Text, ScrollView, Button, TextInput } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { showMessage } from "react-native-flash-message";
import Delivery from '../interfaces/delivery';
import DateDropDown from './DeliveryDateDropDown.tsx';
import ProductDropDown from './ProductDropDown.tsx';

import productModel from "../models/products.ts";
import deliveryModel from "../models/deliveries.ts";


export default function DeliveryForm({ navigation }) {

    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    const [currentProduct, setCurrentProduct] = useState({});

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={ Base.base }>

            <Text style={ Typography.header1 }> Ny inleverans </Text>

            <Text style={ Forms.label }>Välj produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={ Forms.label }> Datum </Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={ Forms.label }> Antal </Text>
            <TextInput
            style={ Forms.input }
            onChangeText={(content: string) => {
                setDelivery({ ...delivery, amount: parseInt(content) });
            }}
            value={delivery?.amount?.toString()}
            keyboardType="numeric"
            />

            <Text style={ Forms.label }> Kommentar </Text>
            <TextInput
                style={ Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content });
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress = {() => {
                    const allFieldsEntered = Object.keys(delivery).length === 4;
                    if (allFieldsEntered) {
                        addDelivery();
                    } else {
                        showMessage({
                            message: "Saknas",
                            description: "Alla fält måste vara ifyllda",
                            type: "warning",
                        });
                    }
                    
                }}
            />
        </ScrollView>
    );
};
