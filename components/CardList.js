import React from 'react'
import PropTypes from 'prop-types'

import { getImageFromId } from '../utils/api'
import Card from './Card'
import { FlatList, View } from 'react-native';

const keyExtractor = ({ id }) => id.toString();

function CardList(props) {
    //renderItem is passed an object (item) which is destructered
    //same as renderItem = (obj) => {
    //          const id = obj.item.id,
    //          const author: ojb.item.author,        
    //            }
    //renderItem uses data passed into it and renders a card with that data

    renderItem = ({ item: {id, author} }) => {
        const { commentsForItem, onPressComments } = props;
        const comments = commentsForItem[id];
        return (
            <Card
            fullname={author}
            image={{ uri: getImageFromId(id) }}
            linkText={`${comments ? comments.length: 0} Comments`}
            onPressLinkText={() => onPressComments(id)}
        />
        );
        
    }

    const { items, commentsForItem } = props;
    
    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            extraData={commentsForItem}
        />
    );
}

//we will have prop of item which is an array of objects of a particular shape
CardList.propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                author: PropTypes.string.isRequired,
            }),
        ).isRequired,
        commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        onPressComments: PropTypes.func.isRequired,
    };


export default CardList
