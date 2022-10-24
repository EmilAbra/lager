import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Base, Typography, Map } from "../../styles";
import { DataTable } from "react-native-paper";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }) {
    const {order} = route.params;
    
    const [marker, setMarker] = useState<any>(null);
    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            
            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    const productRows = order.order_items
        .map((prod, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell style={{flex: 1}}>{prod.product_id}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 2}}>{prod.name}</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1, marginRight:20}}>{prod.price}</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1}}>{prod.amount}</DataTable.Cell>
                </DataTable.Row>
            )
        });

    return (
        <View style={Map.container}>
            <ScrollView style={{flex: 1, flexGrow: 1}}>
                <View style={Map.protuctText}>
                    <Text style={Typography.header2}>Skicka order</Text>
                    <Text >{order.name}, {order.address}</Text>
                    <Text >{order.zip} {order.city}</Text>
                    <DataTable style={Typography.header2}>
                        <DataTable.Header>
                            <DataTable.Title style={{flex: 1}}>Id</DataTable.Title>
                            <DataTable.Title style={{flex: 2}}>Namn</DataTable.Title>
                            <DataTable.Title numeric style={{flex: 1, marginRight:20}}>Pris</DataTable.Title>
                            <DataTable.Title numeric style={{flex: 1}}>Antal</DataTable.Title>
                        </DataTable.Header>
                        {productRows}
                    </DataTable>
                </View>
            </ScrollView>
            <MapView
                style={Map.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                }}>
                {marker}
                {locationMarker}
            </MapView>
        </View>
    );
};
