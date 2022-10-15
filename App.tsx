import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home.js";
import Pick from "./components/Pick.js";
import Auth from "./components/auth/Auth.js";
import Deliveries from "./components/Deliveries.js";
import Invoices from "./components/Invoices.js";
import Ship from "./components/ship/Ship.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles';
import authModel from './models/auth.js';

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "add-circle-outline",
  "Faktura": "clipboard-outline",
  "Logga in": "enter-outline"
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [allOrders, setAllOrders] = useState([]);

    // console.log(isLoggedIn);
    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

    return (
        <SafeAreaView style={Base.flex}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'limegreen',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="Lager">
                        {() => <Home products={products} setProducts={setProducts} delivery={delivery} />}
                    </Tab.Screen>
                    <Tab.Screen name="Plock">
                        {() => <Pick setProducts={setProducts} allOrders={allOrders} setAllorders={setAllOrders}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Inleveranser">
                        {() => <Deliveries delivery={delivery} setDelivery={setDelivery} />}
                    </Tab.Screen>
                    {isLoggedIn ?
                        <>
                            <Tab.Screen name="ship">
                                {() => <Ship allOrders={allOrders} />}
                            </Tab.Screen>
                            <Tab.Screen name="Faktura">
                                {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
                            </Tab.Screen>
                        </>    
                        :
                        <Tab.Screen name="Logga in">
                            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                    }
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
