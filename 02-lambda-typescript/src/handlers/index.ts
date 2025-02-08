export const registerUser = async (event: any) => {
  console.log("event", event);

  return {
    statusCode: 200,
    body: "All's ok",
  };
};
