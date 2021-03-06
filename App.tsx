import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles';

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
};


const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);

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
                        {() => <Home products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Plock">
                        {() => <Pick setProducts={setProducts} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
