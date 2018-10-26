import React from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/BurguerAux/BurguerAux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

function BurguerBuilder(props) {
    const [purchasing, setPurchasing] = React.useState(false);

    function onFirstRender() {
        props.onInitIngredients();
    }

    React.useEffect(onFirstRender, []);

    function purchaseHandler() {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    function updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    function purchaseCancelHandler() {
        setPurchasing(false);
    }

    function purchaseContinueHandler() {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    function render() {
        const disabledInfo = {
            ...props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burguer = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if (props.ings) {
            burguer = (
                <Aux>
                    <Burguer ingredients={props.ings}/>
                    <BuildControls
                        price={props.totalPrice}
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuthenticated={props.isAuthenticated} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={props.ings}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.totalPrice}/>;
        }
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }

    return render();
}

function mapStateToProps(state) {
    return {
        ings: state.burguerBuilder.ingredients,
        totalPrice: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));