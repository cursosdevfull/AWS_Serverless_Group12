import { SQSService } from "../services";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient();

export const register = async (event: any) => {
  const tableName = process.env.USER_TABLE || "";

  const inputPut: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      id: { S: new Date().getTime().toString() },
      email: { S: "joe.doe@email.com" },
      name: { S: "Joe Doe" },
      age: { N: "30" },
      createdAt: { S: new Date().toISOString() },
      updatedAt: { S: "" },
      deletedAt: { NULL: true }
    },
  }

  const commandPut = new PutItemCommand(inputPut);
  await client.send(commandPut);


  const input: ScanCommandInput = {
    TableName: tableName,
    ExpressionAttributeNames: {
      "#ID": "id",
      "#EMAIL": "email"
    },
    ExpressionAttributeValues: {
      ":email": {
        "S": "joe.doe@email.com"
      }
    },
    FilterExpression: "#EMAIL = :email",
    ProjectionExpression: "#ID, #EMAIL"
  }

  const command = new ScanCommand(input);
  const result = await client.send(command);

  let items: any[] = [];

  if (result && result.Items && result.Items.length > 0) {
    items = result.Items.map((item) => unmarshall(item));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  }
};
