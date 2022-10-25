import { useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';
import Invoice from "../interfaces/invoice.ts"
import DateDropDown from './InvoiceDateDropDown.tsx';
import OrderDropDown from './OrderDropDown.tsx';

import invoiceModel from "../models/invoices.ts";

export default function InvoicesForm({ navigation }) {

    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    const [currentOrder, setCurrentOrder] = useState({});

    async function addInvoice() {
        await invoiceModel.createInvoice(invoice);
        navigation.navigate("InvoicesTable", { reload: true });
    }

    return (
        <ScrollView style={ Base.base }>

            <Text style={ Typography.header1 }> Ny faktura </Text>

            <Text style={ Forms.label }>Välj order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />

            <View style={{marginBottom: 100}}>
                <Text style={ Forms.label }> Datum </Text>
                <DateDropDown
                    invoice={invoice}
                    setInvoice={setInvoice}
                />
            </View>

            <Button
                title="Skapa faktura"
                onPress = {() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );
};
