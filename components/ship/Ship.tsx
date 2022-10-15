import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList.js';
import ShipOrder from './ShipOrder.js';

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} />
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    );
}
