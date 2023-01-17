import React, { useState } from "react";
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import Modal from "react-native-modal";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import COLORS from "../../consts/colors";

const COLOR_HOTEL4U = "#B71341"

const DateTimePicker = ({ isDatePickerVisible, handleConfirm, hideDatePicker, dateTime }) => {

    const [selectedDate, setSelectedDate] = useState(dateTime);

    if (Platform.OS == "ios") {
        return (
            <Modal
                isVisible={isDatePickerVisible}
                onBackdropPress={hideDatePicker}
                style={{
                    margin: 0,
                    justifyContent: 'flex-end',
                    paddingBottom: 40,
                    marginHorizontal: 10,
                }}
            >

                <View>
                    <View
                        style={{
                            height: 350,
                            backgroundColor: "#fff",
                            borderRadius: 12
                        }}
                    >

                        <RNDateTimePicker
                            
                            value={selectedDate}
                            is24Hour={true}
                            onChange={(date, date_time) => {
                                setSelectedDate(date_time)
                            }}
                            textColor={COLORS.primary}
                            display="inline"
                            maximumDate={new Date()}
                            minuteInterval={15}
                            style={{ flex: 1 }}

                        />

                        <TouchableOpacity
                            onPress={() => {
                                handleConfirm(selectedDate)
                            }}
                            style={{

                                height: 60,
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.actionBtnTxt} >{"Confirm"}</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        onPress={hideDatePicker}
                        activeOpacity={0.8}
                        style={{
                            marginTop: 14,

                            height: 60,
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={styles.actionBtnTxt} >{"Cancel"}</Text>
                    </TouchableOpacity>
                </View>



            </Modal>
        )

    }
    return (

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={dateTime}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            isDarkModeEnabled={false}
            maximumDate={new Date()}
            display={"default"}
            style={{
                // backgroundColor: '#000000',
            }}
        />


    );
};

export default DateTimePicker;

const styles = StyleSheet.create({
    actionBtnTxt: {
        fontSize: 22,
        color: COLOR_HOTEL4U
    },
})