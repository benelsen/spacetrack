import {unless, of} from 'ramda'

export const coerceArray = unless(Array.isArray, of)

export function delay (ms) {

  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })

}
