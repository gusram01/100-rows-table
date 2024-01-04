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
const MY_FULLY_SECURE_SEED = 'R4nDm$up3rS3cuR3533d';

const DESIRED_RESULTS = 10;

/**
 * @returns {Promise<User[]>}
 */
export const getUsers = (page = 1) => {
  const url = new URL(USERS_ENDPOINT, API_BASE_URL);
  const params = new URLSearchParams({
    results: DESIRED_RESULTS,
    seed: MY_FULLY_SECURE_SEED,
    page,
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
