import { View, Text, Pressable, Platform } from 'react-native'
import React from 'react'
import {format} from 'date-fns'


interface DatePickerInputProps {
    value: Date;
    onChange: (date: Date) => void;
    className?:string;
    label?:string
}

// const DatePickerInput = ({ value, onChange, className, label }: DatePickerInputProps) => {

//     const [showPicker, setShowPicker] = React.useState(false);

//     const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
//         setShowPicker(false);
//         if (selectedDate) {
//             onChange(selectedDate);
//         }
//     }

//     return (
//         <View className={className}>
//             <Text className="text-black font-semibold mb-2">{label ? label : 'Select Date'}</Text>

//             <Pressable
//                 className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
//                 onPress={() => setShowPicker(true)}
//             >
//                 <Text className="text-gray-700">
//                     {format(value, 'dd MMM yyyy')}
//                 </Text>
//             </Pressable>

//             {showPicker && (
//                 <DateTimePicker
//                     value={value}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleChange}
//                 />
//             )}
//         </View>
//     )
// }

// export default DatePickerInput