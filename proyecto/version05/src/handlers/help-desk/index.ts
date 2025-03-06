export const handler = async (event: any) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "response from help desk",
      input: event,
    }),
  };
};
