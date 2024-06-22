import paypal from '@paypal/checkout-server-sdk';
import { getProduct } from '../services/checkout.service.js';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const UBICATION_PRICE = {
    '4-anillo': 0,
    '5-anillo': 20 / 6.96,
    '6-anillo': 25 / 6.96,
    '7-anillo': 30 / 6.96,
    'otro': 0,
};

const createOrder = async (req, res) => {
    // product_id, quantity, ubication
    const orderProducts = req.body.products;
    const ubication = req.body.ubication;
    const items = [];
    let total = 0;

    for (const product of orderProducts) {
        const productData = await getProduct(product.product_id);
        const productItem = {
            name: productData.name,
            quantity: product.quantity,
            unit_amount: {
                currency_code: 'USD',
                value: (productData.price / 6.96).toFixed(2),
            },
        };
        total += productItem.unit_amount.value * productItem.quantity;
        items.push(productItem);
    }
    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: (total + UBICATION_PRICE[ubication]).toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: total.toFixed(2),
                        },
                        shipping: {
                            currency_code: 'USD',
                            value: UBICATION_PRICE[ubication].toFixed(2),
                        },
                    },
                },
                items: items,
            },
        ],
    });

    const response = await client.execute(paypalRequest);
    res.send(response.result.id);
}

export { createOrder };