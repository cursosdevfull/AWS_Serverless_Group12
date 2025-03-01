export const registerFailure = async (event: any) => {
  console.log("event", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "response from register failure",
      input: event,
    }),
  };
};
