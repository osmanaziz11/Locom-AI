/* eslint-disable prettier/prettier */

import { MIDDLEWARE_APP } from 'src/config';

export const GetNumbers = async (country_code) => {
  try {
    const res = await fetch(`${MIDDLEWARE_APP}/api/numbers/${country_code}`);
    const { response, status } = await res.json();
    if (status === 200) {
      return response;
    }
    throw new Error("Couldn't get numbers");
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const PurchaseNumber = async (country) => {
  return '200';
  // try {
  //   const config = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(country),
  //   };
  //   const res = await fetch(`${MIDDLEWARE_APP}/api/buy-nusmber`, config);
  //   if (!res.ok) {
  //     throw new Error(
  //       `Failed to fetch data (${res.status}): ${res.statusText}`
  //     );
  //   }
  //   const { response, status } = await res.json();
  //   if (status === 200) {
  //     return response;
  //   } else {
  //     throw new Error(`Failed to purchase number: ${status}`);
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   throw error;
  // }
};

export const VerifyNumber = async (phone_number) => {
  try {
    const res = await fetch(`${MIDDLEWARE_APP}/api/verify/${phone_number}`);
    const { response, status } = await res.json();
    if (status === 200) {
      return response;
    }
    throw new Error('Some error occurred');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const VerifyOTP = async (reqId, code) => {
  try {
    const res = await fetch(
      `${MIDDLEWARE_APP}/api/verify-check/${reqId}/${code}`
    );
    const { status } = await res.json();
    if (status === 200) {
      return 200;
    } else if (status === 401) {
      return 401;
    }
    throw new Error('Some error occurred');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
