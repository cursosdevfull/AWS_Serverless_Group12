import { SNSService } from "../services";

export const handler = async (event: any) => {
  const topicArn = process.env["SNS_APPOINTMENT"] || "";

  const service = new SNSService();
  await service.publish(topicArn, event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Message sent: ${topicArn}` }),
  };
};
