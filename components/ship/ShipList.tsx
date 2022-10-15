import { View, Text, Button } from "react-native";

export default function ShipList({navigation}) {
    return (
        <View>
            <Text>Ordrar redo att skickas:</Text>
            <Button
                onPress={() =>
                    navigation.navigate('Order')
                }
            />
        </View>
    )
}