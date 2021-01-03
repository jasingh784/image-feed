import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

function CommentInput(props) {

    const [text, setText] = useState('');
    const { onSubmit, placeholder } = props

    handleChangeText = text => {
        setText(text);
    }

    handleSubmitEditing = () => {
        
        if (!text) return;

        onSubmit(text);
        setText("");
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                value={text}
                placeholder={placeholder}
                underlineColorAndroid='transparent'
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,1)',
        paddingHorizontal: 20,
        height: 60,
    },
    input: {
        flex: 1,        //flex 1 means that component will fill parent view
    },
})

CommentInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

CommentInput.defaultProps = {
    placeholder: '',
}
export default CommentInput
