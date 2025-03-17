export const handler = async (event: any) => {
  throw new Error("Error from handler pe");


  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "response from handler pe",
      input: event,
    }),
  };
};
