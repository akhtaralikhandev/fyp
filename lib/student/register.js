export const createStudent = async (data) => {
  const response = await fetch("/api/student/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};
