import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Typography, Table } from '../styles';

import config from "./../config/config.json";
import authModel from "../models/auth.ts";
import invoiceModel from "../models/invoices.ts";
import { DataTable } from "react-native-paper";

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices())
    }

    useEffect( () => {
        reloadInvoices();
    }, []);

    const invoicesRows = allInvoices
        .map((invoice, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell style={{flex: 2}}>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1, marginRight:20}}>{invoice.total_price}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 2}}>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>
            )
        });

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable style={Typography.header2}>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 2}}>Namn</DataTable.Title>
                    <DataTable.Title numeric style={{flex: 1, marginRight:20}}>Pris</DataTable.Title>
                    <DataTable.Title style={{flex: 2}}>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>
            <View style={{marginTop: 15, marginBottom: 20}}>
                <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
                />
            </View>
            <View style={{marginBottom: 20}}>
                <Button
                title="Logga ut"
                onPress={async () => {
                    await authModel.logout();
                    setIsLoggedIn(false);
                    navigation.navigate('Lager');
                }}
                />
            </View>
        </ScrollView>
    );
}
