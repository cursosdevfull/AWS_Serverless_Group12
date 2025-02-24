import { EventBridgService } from "../services";

export const handler = async (event: any) => {
  const eventBusName = process.env["EVENT_BUS_NAME"] || "";

  const service = new EventBridgService();
  await service.putEvent(eventBusName, "appointment_mobile", "event_create_appointment", event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Message sent: ${eventBusName}` }),
  };
};
