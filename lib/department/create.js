export const createDepartement = async (data) => {
  fetch("/api/departement/departement", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
