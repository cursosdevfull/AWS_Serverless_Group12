import { SQSService } from "../services";

const sqsUrls = {
  PE: process.env["SQS_URL_PE"] || "",
  CO: process.env["SQS_URL_CO"] || "",
  MX: process.env["SQS_URL_MX"] || "",
};

export const handler = async (event: any) => {
  const { countryISO } = JSON.parse(event.body);

  const sqsUrl = sqsUrls[countryISO];

  const service = new SQSService();
  await service.sendMessage(sqsUrl, event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Message sent: ${sqsUrl}` }),
  };
};
