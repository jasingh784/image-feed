import React from 'react'
import { StyleSheet, View, Text, Pressable} from 'react-native'
import { PropTypes } from 'prop-types'
import Avatar from './Avatar'
import getAvatarColor from '../utils/getAvatarColor';
import getInitials from '../utils/getInitials'

function AuthorRow({fullname, linkText, onPressLinkText}) {
    return (
        <View style={styles.container} > 
            <Avatar 
                size={35}
                initials={getInitials(fullname)}
                backgroundColor={getAvatarColor(fullname)}
            />

            <Text style={styles.text} numberOfLines={1} >
                {fullname}
            </Text>
            {!!linkText && (
                <Pressable onPress={onPressLinkText}>
                    <Text numberOfLines={1}>{linkText}</Text>
                </Pressable>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
        container: {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        text: {
            flex: 1,
            marginHorizontal: 6,
        },
});

AuthorRow.prototype = {
    fullname: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    onPressLinkText: PropTypes.func.isRequired,
}
export default AuthorRow
