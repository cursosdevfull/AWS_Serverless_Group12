import {
  InvocationType,
  InvokeCommand,
  InvokeCommandInput,
  InvokeCommandOutput,
  LambdaClient,
} from "@aws-sdk/client-lambda";

export class LambdaService {
  private client: LambdaClient;

  constructor() {
    this.client = new LambdaClient();
  }

  async invoke(
    functionName: string,
    invocationType: InvocationType | undefined,
    payload: string
  ) {
    const input: InvokeCommandInput = {
      InvocationType: invocationType,
      FunctionName: functionName,
      Payload: payload,
    };

    const command: InvokeCommand = new InvokeCommand(input);
    const response: InvokeCommandOutput = await this.client.send(command);
    return response.Payload?.transformToString();
  }
}
