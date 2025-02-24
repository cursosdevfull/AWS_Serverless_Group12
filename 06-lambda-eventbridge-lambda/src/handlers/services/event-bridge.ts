import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
} from "@aws-sdk/client-eventbridge";

export class EventBridgService {
  private client: EventBridgeClient;

  constructor() {
    this.client = new EventBridgeClient();
  }

  async putEvent(
    eventBusName: string,
    source: string,
    detailType: string,
    detail: string
  ) {
    const input: PutEventsCommandInput = {
      Entries: [
        {
          Source: source,
          DetailType: detailType,
          Detail: detail,
          EventBusName: eventBusName,
        },
      ],
    };

    const command: PutEventsCommand = new PutEventsCommand(input);
    await this.client.send(command);
  }
}
