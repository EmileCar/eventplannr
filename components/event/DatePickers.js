import { Platform } from "react-native";
import DatePicker from "react-native-datepicker";

const DatePickers = ({datePickerStyle, startDate, endDate, setStartDate, setEndDate}) => {
    if (Platform.OS === 'web') {
      return (
        <>
        <input
          type="date"
          value={startDate}
          placeholder="Select start date"
          onChange={(e) => setStartDate(e.target.value)}
          style={{ ...datePickerStyle, border: '1px solid lightgray' }}
        />
        <input
          type="date"
          placeholder="Select end date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ ...datePickerStyle, border: '1px solid lightgray' }}
        />
        </>
      );
    } else {
      return (
        <>
        <DatePicker
          style={datePickerStyle}
          date={startDate}
          mode="date"
          placeholder="Select start date"
          format="YYYY-MM-DD"
          minDate="2023-01-01"
          maxDate="2030-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
            },
          }}
          onDateChange={(date) => setStartDate(date)}
        />
        <DatePicker
          style={datePickerStyle}
          date={endDate}
          mode="date"
          placeholder="Select end date"
          format="YYYY-MM-DD"
          minDate="2023-01-01"
          maxDate="2030-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
            },
          }}
          onDateChange={(date) => setEndDate(date)}
        />
      </>
      );
    }
  };

  export default DatePickers;