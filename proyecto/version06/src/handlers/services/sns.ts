import { PublishCommand, PublishCommandInput, SNSClient } from "@aws-sdk/client-sns";

export class SNSService {
    private client: SNSClient;

    constructor() {
        this.client = new SNSClient();
    }

    async publish(topicArn: string, message: string) {
        const input: PublishCommandInput = {
            TopicArn: topicArn,
            Message: message,
        };

        console.log("input", input);

        const command = new PublishCommand(input);
        const result = await this.client.send(command);
        return result;
    }
}