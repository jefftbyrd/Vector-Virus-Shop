'use client';
// import Link from 'next/link';
// import React from 'react';
// import { getVirusesInsecure } from '../../database/viruses';
// import { getCookie } from '../../util/cookies';
// import { parseJson } from '../../util/json';
import deleteCookie from './actions';
import Countries from './Countries';

// import RemoveFromCart from './RemoveFromCart';
// import UpdateCart from './UpdateCart';

export default function CheckoutForm() {
  return (
    <form className="customerInfo" id="checkOutForm">
      <section>
        <h2>Contact</h2>
        <div className="fitTwo">
          <label>
            First Name:{' '}
            <input
              placeholder="First Name"
              data-test-id="checkout-first-name"
              required
            />
          </label>
          <label>
            Last Name:{' '}
            <input
              placeholder="Last Name"
              data-test-id="checkout-last-name"
              required
            />
          </label>
        </div>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            data-test-id="checkout-email"
            required
          />
        </label>
      </section>
      <section>
        <h2>Delivery</h2>

        <label>
          Address:{' '}
          <input
            placeholder="Address"
            data-test-id="checkout-address"
            required
          />
        </label>
        <Countries />
        <div className="fitTwo">
          <label>
            City:{' '}
            <input placeholder="City" data-test-id="checkout-city" required />
          </label>
          <label>
            Postal Code:
            <input
              type="number"
              maxLength={8}
              placeholder="Postal Code"
              data-test-id="checkout-postal-code"
              required
            />
          </label>
        </div>
      </section>
      <section className="!border-0">
        <h2>Payment</h2>

        <label>
          Cardholder Name: <input placeholder="Cardholder Name" required />
        </label>
        <label>
          Card Number:{' '}
          <input
            data-test-id="checkout-credit-card"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength={19}
            placeholder="xxxx xxxx xxxx xxxx"
            required
          />
        </label>
        <div className="fitTwo">
          <label>
            Expiration Date: (MM/YY){' '}
            <input
              type="month"
              data-test-id="checkout-expiration-date"
              required
            />
          </label>
          <label>
            CVV: (3 digits){' '}
            <input
              maxLength={3}
              placeholder="CVV"
              data-test-id="checkout-security-code"
              required
            />
          </label>
        </div>
      </section>
      <section>
        <button
          form="checkOutForm"
          className="rounded-lg bg-light-blue uppercase font-bold text-4xl text-dark-green p-3 mt-5"
          data-test-id="checkout-confirm-order"
          formAction={async () => {
            await deleteCookie();
            window.location.href = '/thank-you';
          }}
        >
          Confirm Order
        </button>
      </section>
    </form>
  );
}
