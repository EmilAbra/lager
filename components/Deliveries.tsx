import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" options={{ headerShown: false }}>
                {(screenProps) => <DeliveriesList {...screenProps} delivery={props.delivery} setDelivery={props.setDelivery} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={DeliveryForm} />
        </Stack.Navigator>
    );
};
