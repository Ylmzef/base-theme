/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Html from 'Component/Html';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import CartItem from 'Component/CartItem';
import './CheckoutOrderSummary.style';

/**
 *
 */
class CheckoutOrderSummary extends Component {
    /**
     * Render price line
     */
    renderPriceLine(price, name, mods) {
        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">{ name }</strong>
                <strong block="CheckoutOrderSummary" elem="Text">
                    {/* TODO: Use value from configuration file */ }
                    $
                    <TextPlaceholder content={ price } />
                </strong>
            </li>
        );
    }

    /**
     * Render order summury cart item
     * @param key
     * @param item
     * @returns {*}
     */
    renderItem(key, item) {
        return (
            <CartItem key={ key } product={ item } />
        );
    }

    /**
     * Render checkout order summary block
     * @returns {*}
     */
    render() {
        const {
            totals: { grandTotalPrice },
            products,
            shippingMethod: { price, title }
        } = this.props;

        const productCount = Object.keys(products).length;

        // calculate grand totals including shipping price
        const grandTotalWithShipping = (price) ? parseFloat(grandTotalPrice) + parseFloat(price) : grandTotalPrice;

        return (
            <div block="CheckoutOrderSummary" aria-label="Order Summary">
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <h3>Order Summary</h3>
                    <ul>
                        { this.renderPriceLine(grandTotalPrice, 'Cart Subtotal') }
                        { title && this.renderPriceLine(String(price), `Shipping (${ title })`, { divider: true }) }
                        { this.renderPriceLine(String(grandTotalWithShipping), 'Order Total') }
                    </ul>
                </div>

                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <h3>{ `${ productCount } Items In Cart` }</h3>
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products)
                            .map(key => this.renderItem(key, products[key])) }
                    </ul>
                </div>
            </div>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType,
    products: PropTypes.objectOf(ProductType)
    // shippingMethod: PropTypes.object
};

CheckoutOrderSummary.defaultProps = {
    totals: {},
    products: {},
    // shippingMethod: {}
};

export default CheckoutOrderSummary;
