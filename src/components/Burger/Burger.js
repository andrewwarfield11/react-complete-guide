import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map( igKey => {
        return [...Array(props.ingredients[igKey])].map((_,idx) => {
            return <BurgerIngredient key={igKey+idx} type={igKey} />;
        });
    }).reduce((arr,el) => { // built in js function that reduces the multiple arrays produced into one
        return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;