import { request } from "src/helper";


export const signUp = (post) => {
  return request('auth/local/register', 'POST', post)
}

export const login = (post) => {
  return request('auth/local', 'POST', post)
}
