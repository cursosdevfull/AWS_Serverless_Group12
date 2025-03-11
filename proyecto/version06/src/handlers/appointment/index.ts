import { DataSourceService, SNSService, DynamoDBService, Item } from "../services";

const insertAppointment = async (tableName: string, body: Record<string, any>) => {
  const item: Item = {
    id: { S: new Date().getTime().toString() },
    patientId: { N: body.patientId.toString() },
    scheduleId: { N: body.scheduleId.toString() },
    status: { S: "PENDING" },
    countryISO: { S: body.countryISO },
    createdAt: { S: new Date().toISOString() },
    updatedAt: { NULL: true }
  }

  const serviceDynamo = new DynamoDBService();
  await serviceDynamo.add(tableName, item);
}

const sentAppointment = async (topicArn: string, data: string) => {
  const serviceSNS = new SNSService();
  await serviceSNS.publish(topicArn, data);
}

export const handler = async (event: any) => {
  const { body, source } = DataSourceService.getBody(event);

  const data = source !== "SQS" ? body : JSON.stringify(body.detail);

  const topicArn = process.env["SNS_APPOINTMENT"] || "";
  const tableName = process.env["APPOINTMENT_TABLE"] || "";

  await sentAppointment(topicArn, data as string);
  await insertAppointment(tableName, body);

  return {
    statusCode: 200,
    body: "Appointment created"
  };
};
