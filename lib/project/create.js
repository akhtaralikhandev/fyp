export const createProject = async (data) => {
  const response = await fetch("/api/project/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
};

export const joinProject = async (data) => {
  const response = await fetch("/api/project/create", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
};
