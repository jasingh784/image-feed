import React from 'react'
import { ColorPropType, StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

function Avatar( {size, backgroundColor, initials}) {
    const style = {
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor,
    }
    
    return (
        <View style={[styles.container, style]} >
            <Text style={styles.text}>{initials}</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    }
});

Avatar.prototype =  {
    initials: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    backgroundColor: ColorPropType.isRequired,
};
export default Avatar
