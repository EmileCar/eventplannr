import { Platform } from "react-native";

const defaultPadding = Platform.OS === 'web' ? 28 : 16;

export default {
    COLOR_PRIMARY: '#006ff5',
    COLOR_SECONDARY: 'lightblue',
    COLOR_WHITE: 'white',
    COLOR_BLACK: 'black',
    COLOR_INACTIVE: 'lightgray',
    COLOR_LIGHT_GRAY: '#eaeaea',
    FONT_SIZE_SMALL: 16,
    FONT_SIZE_MEDIUM: 20,
    FONT_SIZE_LARGE: 24,
    FONT_SIZE_DISPLAY: 32,
    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_BOLD: 800,
    DEFAULT_PADDING: defaultPadding,
};