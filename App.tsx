import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Auth from "./components/auth/Auth.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Invoices from "./components/Invoices.tsx";
import Ship from "./components/ship/Ship.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles';
import authModel from './models/auth.ts';

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "add-circle-outline",
  "Faktura": "clipboard-outline",
  "Logga in": "enter-outline",
  "Skicka": "send-outline"
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [allOrders, setAllOrders] = useState([]);

    // console.log("orders" + allOrders);
    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn());
        })();
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
                    <Tab.Screen name="Lager" options={{ headerShown: false }}>
                        {() => <Home products={products} setProducts={setProducts} delivery={delivery} />}
                    </Tab.Screen>
                    <Tab.Screen name="Plock" options={{ headerShown: false }}>
                        {() => <Pick setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Inleveranser" options={{ headerShown: false }}>
                        {() => <Deliveries delivery={delivery} setDelivery={setDelivery} />}
                    </Tab.Screen>
                    {isLoggedIn ?
                        <>
                            <Tab.Screen name="Skicka" options={{ headerShown: false }}>
                                {() => <Ship allOrders={allOrders} setAllOrders={setAllOrders} />}
                            </Tab.Screen>
                            <Tab.Screen name="Faktura" options={{ headerShown: false }}>
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
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}
