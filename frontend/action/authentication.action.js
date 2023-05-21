import fetch from 'isomorphic-fetch';
import { API } from '../config';
// export const signupAction = (user) => {
//   return fetch(`${API}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   }).then((response) => {});
// };

async function signup(user) {
  const response = await fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'something went wrong');
    throw error;
  }

  return data;
}

async function signin(user) {
  const response = await fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'something went wrong');
    throw error;
  }

  return data;
}

export { signup, signin };
