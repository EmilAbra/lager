import { Dimensions } from "react-native";

export const container = {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
};

export const map = {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
};

export const protuctText = {
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
};