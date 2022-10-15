import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from "../../styles";

export default function ShipList({navigation, allOrders}) {
    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <View style={Base.button} key={index}>
                <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
                />
                </View>
        });

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.header2}>Ordrar redo att Skickas</Text>
            {listOfOrders}
        </ScrollView>
    );
}