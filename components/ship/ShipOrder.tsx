import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

export default function ShipOrder ({ route }) {
    const { order } = route.params;

    return (
        <view style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>    
        </view>
    );
};