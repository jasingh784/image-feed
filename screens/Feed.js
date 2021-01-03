import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text, ViewPropTypes, SafeAreaView, } from 'react-native';
import PropTypes from 'prop-types'

import { fetchImages } from '../utils/api'
import CardList from '../components/CardList'

function Feed(props) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        //create a scoped async function in the hook
        async function getImage() {
            try {
                console.log('starting to fetchImages')
                const items = await fetchImages();

                setLoading(false);
                setItems(items);
                
            } catch (e) {
                setLoading(false);
                setError(true);
            }
            
        }

        //execute the created function directly
        getImage();
        
    }, [])

    const { style, commentsForItem, onPressComments } = props;

    if(loading) {
        return <ActivityIndicator size='large' />
    }

    if(error) {
        return <Text>Error...</Text>
    }
    
    return (
        <SafeAreaView style={style}>
            <CardList 
                items={items}
                commentsForItem={commentsForItem}
                onPressComments={onPressComments}
            />
        </SafeAreaView>
    )
}

Feed.propTypes = {
    style: ViewPropTypes.style,
    commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    onPressComments: PropTypes.func.isRequired,
}

Feed.defaultProps = {
    style: null,
}


export default Feed
