import React, { useContext } from 'react';
import { Switch } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeContext';

const SwitchPublic = ({ isPublic, setIsPublic }) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <Switch
            style={{ marginBottom: 10 }}
            trackColor={{ false: theme.COLOR_INACTIVE, true: theme.COLOR_PRIMARY }}
            thumbColor={isPublic ? theme.COLOR_WHITE : theme.COLOR_WHITE}
            ios_backgroundColor={theme.COLOR_INACTIVE}
            onValueChange={setIsPublic}
            value={isPublic}
        />
    );
};

SwitchPublic.propTypes = {
    isPublic: PropTypes.bool.isRequired,
    setIsPublic: PropTypes.func.isRequired,
};

export default SwitchPublic;
