import { BASE_URL } from 'src/config'
import { responseHandler, errorHandler, HEADERS, request } from 'src/helper'


const DEFAULT_ANALYTICS = [
  {
    type: 'referrals',
    value: 1345,
    percentage: 5,
  },
  {
    type: 'purchase',
    value: 913,
    percentage: -8,
  },
  {
    type: 'calls',
    value: 156,
    percentage: 15,
  },
  {
    type: 'reviews',
    value: 40,
    percentage: -5,
  },
  {
    type: 'rewards',
    value: 10506,
    percentage: 23,
  }
]


export const fetchUser = (id) => {
  return request(`users/${id}`)
}



export const fetchFeedback = (id) => {
  return fetch(`${BASE_URL}/post/${id}/comment`, {method: 'GET', headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}
