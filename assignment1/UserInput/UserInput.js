import React from 'react'

const userInput = (props) => {
    const style = {
        padding: '5px'
    };
    return (
        <input 
            type="text" 
            onChange={props.changed}
            style={style}
            value={props.currentName}></input>
    )
}

export default userInput;