import { useAxios } from "../Helpers/Hooks";

const useGetBokemonDetails = () => {
  const axios = useAxios();

  return (url) =>
    new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          let endErrors = [];
          if (error.response) {
            const { data, status } = error.response;
            if (status === 403) {
              endErrors.push({
                message: "Authentication error",
                languageKey: "errors.authentication",
              });
            } else if (status === 401) {
              endErrors.push({
                message: "Authorization error",
                languageKey: "errors.authorization",
              });
            } else if (status === 400) {
              const joi = Array.from(data.errors.joi);
              endErrors = joi.map((e) => ({
                field: e.context.key,
                message: e.message,
                languageKey: `validation.${e.context.key}.${e.type}`,
              }));
            } else if (status === 404) {
              endErrors.push({
                message: "Data not found",
                languageKey: "errors.data.not.found",
              });
            } else if (status === 500) {
              endErrors.push({
                message: "Server error",
                languageKey: "errors.server.error",
              });
            }
          } else if (error.request) {
            endErrors.push({
              message: "Server did not respond",
              languageKey: "errors.server.no.response",
            });
          } else {
            endErrors.push({
              message: "Network or Browser error",
              languageKey: "errors.network.error",
            });
          }

          reject(endErrors);
        });
    });
};

export default useGetBokemonDetails;
