import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { ThemeContext } from '../../contexts/ThemeContext';

const SectionHeader = ({ title }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionText, {color: theme.COLOR_TEXT}]}>{title}</Text>
      <View style={[styles.line, {backgroundColor: theme.COLOR_TEXT}]} />
    </View>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
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
  },
});

export default SectionHeader;
