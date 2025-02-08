import { LambdaService } from "../services/lambda";

const lambdaFunctions = {
  PE: process.env["APPOINTMENT_PE"] || "",
  CO: process.env["APPOINTMENT_CO"] || "",
  MX: process.env["APPOINTMENT_MX"] || "",
};

export const handler = async (event: any) => {
  const { countryISO } = JSON.parse(event.body);

  const functionName = lambdaFunctions[countryISO];

  const service = new LambdaService();
  const payload = await service.invoke(
    functionName,
    "RequestResponse",
    event.body
  );

  return {
    statusCode: 200,
    body: payload,
  };
};
