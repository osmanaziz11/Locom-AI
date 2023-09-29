import { BASE_URL } from "src/config"
import { HEADERS, errorHandler, responseHandler } from "src/helper"

export const fetchNotifications = () => {
  return fetch(`${BASE_URL}/user?limit=3`, {method: 'GET', headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}
