import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: .75,
    bacon: 1,
    meat: 2
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        ordered: false
    }

    orderHandler = () => {
        this.setState({ordered: true});
    }

    updatePurchaseState = (ingredients) => {
        console.log(Object.keys(ingredients));
        const sum = Object.keys(ingredients).map(i => {
            return ingredients[i];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] = this.state.ingredients[type] + 1;
        const price = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: price, ingredients: ingredients});
        this.updatePurchaseState(ingredients);
    }

    removeIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] = this.state.ingredients[type] - 1;
        const price = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: price, ingredients: ingredients});
        this.updatePurchaseState(ingredients);
    }

    purchaseCancelHandler = () => {
        this.setState({ordered: false})
    }

    purchaseContinueHandler = () => {
        alert('Continuing now');
    }

    render() {

        return(
            <Aux>
                <Modal show={this.state.ordered} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cost={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div><BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.orderHandler}
                    ingredients={this.state.ingredients}/></div>
            </Aux>
        );
    }
}

export default BurgerBuilder;