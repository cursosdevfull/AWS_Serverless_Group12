import { DataSourceService, SNSService } from "../services";

export const handler = async (event: any) => {
  console.log("event", event);
  const { body, source } = DataSourceService.getBody(event);
  console.log("body2", body);
  console.log("source2", source);

  const data = source !== "SQS" ? body : JSON.stringify(body.detail);

  console.log("body", body)
  console.log("source", source)
  console.log("data", data)

  const topicArn = process.env["SNS_APPOINTMENT"] || "";

  const service = new SNSService();
  const result = await service.publish(topicArn, data as string);

  return {
    statusCode: 200,
    //body: JSON.stringify({ message: `Message sent: ${topicArn}` }),
    body: JSON.stringify(result)
  };
};
