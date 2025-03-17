import { DataSourceService, SNSService } from "../services";

export const handler = async (event: any) => {
  const { body, source } = DataSourceService.getBody(event);

  const data = source !== "SQS" ? JSON.stringify(body) : JSON.stringify(body.detail);

  console.log("body", body)
  console.log("source", source)
  console.log("data", data)

  const topicArn = process.env["SNS_APPOINTMENT"] || "";

  const service = new SNSService();
  await service.publish(topicArn, data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Message sent: ${topicArn}` }),
  };
};
