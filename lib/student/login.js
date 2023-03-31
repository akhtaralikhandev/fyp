export const loginStudent = async (data) => {
  fetch(
    "https://6426af785d5fc106cddaf79d--delicate-gumption-e9b089.netlify.app/api/student/login",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};
