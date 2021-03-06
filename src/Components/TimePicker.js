import React, { useState } from 'react';
import { View, Button, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';

const TimePicker = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        // pros.callBack_(date);
        props.callBack(date);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", margin : '2%' , marginBottom : '7%' }}>
                <View>
                    <Button onPress={showDatepicker} title="Change Date" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Change Time" />
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={onChange}
                />
            )}

            <Input
                placeholder={date.toDateString()}
                editable={false}
                style={{ color: 'black' }}
                label="Date of Pickup"
                onChangeText={(val) => { emailHandler(val) }}
            />

            <Input
                placeholder={date.toLocaleTimeString()}
                editable={false}
                style={{ color: 'black' }}
                label="Time of Pickup"
                onChangeText={(val) => { emailHandler(val) }}
            />


        </SafeAreaView>
    );
};
export default TimePicker;