/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} fisrtname
 * @property {string} lastname
 * @property {string} country
 * @property {string} imageUrl
 */

const API_BASE_URL = 'https://randomuser.me';
const USERS_ENDPOINT = '/api/';

const DESIRED_RESULTS = 100;

/** @type {User[]} */
const users = [];

/**
 * @returns {Promise<User[]>}
 */
export const getUsers = (desiredResults = DESIRED_RESULTS) => {
  if (users && users.length === DESIRED_RESULTS) {
    return Promise.resolve(users);
  }

  const url = new URL(USERS_ENDPOINT, API_BASE_URL);
  const params = new URLSearchParams({
    results: desiredResults,
  });

  url.search = params.toString();

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('UsersRepository::getUsers::' + response.status);
      }

      return response.json();
    })
    .then((data) => data.results)
    .catch((err) => {
      console.warn(err);

      return [];
    });
};
