import React, { useEffect, useRef } from "react";

const PayPalButton = ({ amount, onSuccess, onError, onCancel }) => {
    const paypalRef = useRef();
    useEffect(() => {
        // Dynamically load the PayPal SDK
        const script = document.createElement("script");
        // script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;

        script.onload = () => {
            // Render PayPal buttons
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    onSuccess(order); // Handle successful payment
                },
                onCancel: (data) => {
                    onCancel(data); // Handle cancellation
                },
                onError: (err) => {
                    onError(err); // Handle errors
                },
            }).render(paypalRef.current); // Render the buttons into the container
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            document.body.removeChild(script);
        };
    }, [amount, onSuccess, onError, onCancel]);

    return <div ref={paypalRef} />;
};

export default PayPalButton;
