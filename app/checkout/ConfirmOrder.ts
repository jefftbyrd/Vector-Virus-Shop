'use server';
import deleteCookie from './actions';

export default async function ConfirmOrder() {
  return await deleteCookie();
}

// export default function ConfirmOrder() {
//   return (
//     <button
//       form="checkOutForm"
//       data-test-id="checkout-confirm-order"
//       formAction={async () => {
//         'use server';
//         await deleteCookie();
//         // window.location.href = '/thank-you';
//         // location.href = 'http://example.com';
//         window.location.replace('/thank-you');
//       }}
//     >
//       Confirm Order
//     </button>
//   );
// }
