import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList.js';
import ShipOrder from './ShipOrder.js';

const Stack = createNativeStackNavigator();

export default function Ship({ props }) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {() => <ShipList allOrders={props.allOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    );
}
