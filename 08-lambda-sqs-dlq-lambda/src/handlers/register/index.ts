import { SQSService } from "../services";

export const register = async (event: any) => {
  const sqsUrl = process.env["MY_SQS"] || "";

  console.log("event", event);
  console.log("sqsUrl", sqsUrl);

  const service = new SQSService();
  await service.sendMessage(sqsUrl, event.body)

  return {
    statusCode: 200,
    body: "Message sent to SQS",
  };
};
