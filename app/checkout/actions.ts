'use server';
import { cookies } from 'next/headers';

export default async function deleteCookie() {
  (await cookies()).delete('cart');
}
