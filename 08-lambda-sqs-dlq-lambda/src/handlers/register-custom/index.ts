export const registerCustom = async (event: any) => {
  throw new Error("Error from register custom");


  console.log("event", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "response from register custom",
      input: event,
    }),
  };
};
