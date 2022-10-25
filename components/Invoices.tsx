import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesTable from './InvoicesTable.tsx';
import InvoicesForm from './InvoicesForm.tsx';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="InvoicesTable">
            <Stack.Screen name="InvoicesTable" options={{ headerShown: false }}>
                {(screenProps) => <InvoicesTable {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={InvoicesForm} />
        </Stack.Navigator>
    );
}
