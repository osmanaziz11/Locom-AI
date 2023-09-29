import { BASE_URL } from "src/config"
import { HEADERS, errorHandler, responseHandler } from "src/helper"

export const fetchRequests = (type) => {
  const page = type === 'active' ? 0 : 1
  return fetch(`${BASE_URL}/user?page=${page}&limit=5`, {method: 'GET', headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}


