import { SendMessageCommand, SendMessageCommandInput, SQSClient } from "@aws-sdk/client-sqs";

export class SQSService {
    private client: SQSClient;

    constructor() {
        this.client = new SQSClient();
    }

    async sendMessage(queueUrl: string, messageBody: string) {
        const input: SendMessageCommandInput = {
            QueueUrl: queueUrl,
            MessageBody: messageBody,
        };

        const command = new SendMessageCommand(input);
        return await this.client.send(command);
    }
}