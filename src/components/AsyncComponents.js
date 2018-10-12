import asyncComponent from "../hoc/asyncComponent/asyncComponent";

export const asyncCheckout = asyncComponent(() => {
    return import('../containers/Checkout/Checkout');
});

export const asyncOrders = asyncComponent(() => {
    return import('../containers/Orders/Orders');
});

export const asyncAuth = asyncComponent(() => {
    return import('../containers/Auth/Auth');
});


