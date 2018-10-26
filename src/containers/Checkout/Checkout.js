import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

function Checkout(props) {

    function checkoutCancelledHandler() {
        props.history.goBack();
    }

    function checkoutContinuedHandler() {
        props.history.replace('/checkout/contact-data');
    }

    function render() {
        let summary = <Redirect to="/"/>;
        if (props.ingredients) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ingredients}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler}
                    />
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }
        return summary;
    }

    return render();

}

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default withRouter(connect(mapStateToProps)(Checkout));