import { SQSService } from "../services";
import {PublishCommand, PublishCommandInput, SNSClient} from "@aws-sdk/client-sns"

const client = new SNSClient()

export const register = async (event: any) => {
  const topicArn = process.env["SNS_REGISTER"] || "";

  const input: PublishCommandInput = {
    TopicArn: topicArn,
    Message: event.body,
  }

  const command = new PublishCommand(input)
  await client.send(command)

  return {
    statusCode: 200,
    body: "Message sent to SNS",
  };
};
