import { View, Text, Pressable, Platform } from 'react-native'
import React from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import {format} from 'date-fns'


interface DatePickerInputProps {
    value: Date;
    onChange: (date: Date) => void;
}

const DatePickerInput = ({ value, onChange }: DatePickerInputProps) => {

    const [showPicker, setShowPicker] = React.useState(false);

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            onChange(selectedDate);
        }
    }

    return (
        <View className="p-4">
            <Text className="text-black font-semibold mb-2">Select Date</Text>

            <Pressable
                className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
                onPress={() => setShowPicker(true)}
            >
                <Text className="text-gray-700">
                    {format(value, 'dd MMM yyyy')}
                </Text>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                />
            )}
        </View>
    )
}

export default DatePickerInput