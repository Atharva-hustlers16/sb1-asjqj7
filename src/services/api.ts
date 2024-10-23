import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const evaluateAnswer = async (answer: string, category: string) => {
  const response = await axios.post(`${API_URL}/evaluate`, {
    answer,
    category
  });
  return response.data;
};

export const getFeedback = async (scores: Record<string, number>) => {
  const response = await axios.post(`${API_URL}/feedback`, {
    scores
  });
  return response.data;
};