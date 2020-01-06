import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(i => {
        return <li key={i}><span style={{textTransform: 'capitalize'}}>{i}</span>: {props.ingredients[i]}</li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Cost: ${props.cost.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btntype="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btntype="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
};

export default orderSummary;