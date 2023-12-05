import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import themeStyle from '../../styles/theme.style';

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    marginRight: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
});

export default SectionHeader;
