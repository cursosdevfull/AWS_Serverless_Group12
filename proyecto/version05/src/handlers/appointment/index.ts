import { DataSourceService, SNSService } from "../services";

export const handler = async (event: any) => {
  console.log("event", event);
  const { body, source } = DataSourceService.getBody(event);
  console.log("body2", body);
  console.log("source2", source);

  const data = source !== "SQS" ? JSON.stringify(body) : JSON.stringify(body.detail);

  const topicArn = process.env["SNS_APPOINTMENT"] || "";

  const service = new SNSService();
  const result = await service.publish(topicArn, data);

  return {
    statusCode: 200,
    //body: JSON.stringify({ message: `Message sent: ${topicArn}` }),
    body: JSON.stringify(result)
  };
};
