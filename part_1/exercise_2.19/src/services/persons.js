import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (updatePerson) => {
  const request = axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson);
  return request.then((response) => response.data);
};

const remove = (removePerson) => {
  return axios.delete(`${baseUrl}/${removePerson.id}`);
};

const personService = {
  getAll,
  create,
  update,
  remove,
};

export default personService;
