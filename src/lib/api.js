import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

export const api = {
  async get(path) {
    const { data } = await client.get(path);
    return { data };
  },
  async post(path, body) {
    const { data } = await client.post(path, body);
    return { data };
  },
  async patch(path, body) {
    const { data } = await client.patch(path, body);
  },
};
