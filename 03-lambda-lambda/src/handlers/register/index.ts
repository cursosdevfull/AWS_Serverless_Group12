import { LambdaService } from "../services/lambda";

export const register = async (event: any) => {
  const functionName = process.env["REGISTER_CUSTOM"] || "";

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
