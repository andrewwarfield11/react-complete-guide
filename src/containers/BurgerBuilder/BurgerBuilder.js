import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-complete-guide-99df8.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            })
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
        //alert('Continuing now');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Andrew Warfield',
                address: {
                    street: 'Street Road',
                    zip: '53454',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then( response => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
        })
    }

    render() {

        return(
            <Aux>
                <Modal show={this.state.ordered} modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading ? <Spinner />
                    : this.state.ingredients ? <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cost={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/> : <Spinner />}
                </Modal>
                {this.state.ingredients ? <div><Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.orderHandler}
                    ingredients={this.state.ingredients}/></div> : <Spinner />}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);