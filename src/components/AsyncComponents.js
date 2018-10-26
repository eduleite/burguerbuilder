import React, { Suspense } from "react";

const Checkout = React.lazy(() => import("../containers/Checkout/Checkout"));

export function CheckoutAsync() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Checkout/>
        </Suspense>
    );
}

const Orders = React.lazy(() => import('../containers/Orders/Orders'));

export function OrdersAsync() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Orders/>
        </Suspense>
    );
}

const Auth = React.lazy(() => import('../containers/Auth/Auth'));

export function AuthAsync() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Auth/>
        </Suspense>
    );
}
