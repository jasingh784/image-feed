import React, { useState } from 'react'
import { Image, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types';

import AuthorRow from './AuthorRow';

function Card(props) {

    propTypes = {
        fullname: PropTypes.string.isRequired,
        image: Image.propTypes.source.isRequired,
        linkText: PropTypes.string,
        onPressLinkText: PropTypes.func,
    }

    defaultProps = {
        linkText: '',
        onPressLinkText: () => {},
    }
    
    const [loading, setLoading] = useState(true)

    const { fullname, image, linkText, onPressLinkText} = props;

    handleLoad = () => {
        setLoading(false);
    }

    return (
        <View>
            <AuthorRow
                fullname={fullname}
                linkText={linkText}
                onPressLinkText={onPressLinkText}
            />
            <Image style={styles.image} source={image} onLoad={handleLoad}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,02)',
    },
})

export default Card
