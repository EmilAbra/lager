import { Base, Typography } from '../styles';
import { useEffect } from "react";
import { ScrollView, View, Text, Button } from "react-native";
import deliveriesModel from "../models/deliveries.ts";

export default function DeliveriesList({ delivery, setDelivery, navigation }) {
    useEffect( async () => {
        setDelivery(await deliveriesModel.getDeliveries());
    }, [delivery]);

    let deliveries = !delivery.length ? false : true;
    
    const list = delivery.map((delivery, index) => {

        return <View key={index}>
                <Text style={Typography.normal} >
                { delivery.amount } st { delivery.product_name }{"\n"}
                Levererad: { delivery.delivery_date }{"\n"}
                Kommentar: { delivery.comment }
                </Text>
            </View>
    });

    return (
        <ScrollView style={Base.base}>
            <View style={Base.base}>
                <Text style={Typography.header2}>Inleveranser</Text>
                {deliveries
                    ? <Text> {list} </Text>
                    : <Text style={Typography.notInStock}>Ingen inleverans registrerad.</Text>
                }
                <Button
                    title="Skapa ny inleverans"
                    onPress={() => {
                        navigation.navigate('Form');
                    }}
                />
            </View>
        </ScrollView>
    );
};
