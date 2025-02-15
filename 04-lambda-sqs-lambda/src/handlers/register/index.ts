import { SQSService } from "../services";

export const register = async (event: any) => {
  const sqsUrl = process.env["SQS_REGISTER"] || "";

  const service = new SQSService();
  await service.sendMessage(sqsUrl, event.body);

  return {
    statusCode: 200,
    body: "Message sent to SQS",
  };
};
