export const registerCustom = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "response from register custom",
      input: event,
    }),
  };
};
