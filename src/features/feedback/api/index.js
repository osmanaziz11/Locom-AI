import { BASE_URL } from "src/config"
import { HEADERS, errorHandler, responseHandler } from "src/helper"

export const fetchFeedbacks = () => {
  return fetch(`${BASE_URL}/post`, {method: 'GET', headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}