import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button } from "react-native";
import moment from 'moment';

export default function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, value) => {
                        if (event?.type === 'dismissed') {
                            setShow(false);
                            return;
                        }
                        setDropDownDate(value);
                           props.setDelivery({
                               ...props.delivery,
                               delivery_date:
                               moment(dropDownDate).format("YYYY-MM-DD"),
                           });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
