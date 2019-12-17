import React from 'react';

const validation = (props) => {
    if(props.len >= 5) {
        return (
            <p>Text long enough</p>
        )
    }
    else {
        return (
            <p>Text too short</p>
        )
    }
}

export default validation;