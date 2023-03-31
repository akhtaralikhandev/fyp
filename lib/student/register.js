export const createStudent = async (data) => {
  const response = await fetch(
    "https://6426af785d5fc106cddaf79d--delicate-gumption-e9b089.netlify.app/api/student/register",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.json();
};
