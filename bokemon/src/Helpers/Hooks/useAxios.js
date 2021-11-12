import axios from "axios";

const useAxios = () => {
  return axios.create({
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default useAxios;
