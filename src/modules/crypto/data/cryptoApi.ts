import api from '../../../app/config/api';

export const fetchCryptosFromAPI = async () => {
  const response = await api.get('');
  return response.data;
};
