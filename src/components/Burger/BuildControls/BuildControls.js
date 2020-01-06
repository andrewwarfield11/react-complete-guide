import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl, index)=> {
            return (
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label} 
                    added={() => props.add(ctrl.type)}
                    removed={() => props.remove(ctrl.type)}
                    disable={props.ingredients[ctrl.type] <= 0}/>
            )
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>Order Now</button>
    </div>
);
export default buildControls;