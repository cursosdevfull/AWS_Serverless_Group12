import { DynamoDBClient, PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import * as bcrypt from "bcryptjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient();

export const main = async (event: any) => {
  const { email, password } = JSON.parse(event.body);
  const passwordHash = bcrypt.hashSync(password, 10);

  const tableName = process.env.USER_TABLE || "";

  const inputPut: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      email: { S: email },
      password: { S: passwordHash }
    },
  }

  const commandPut = new PutItemCommand(inputPut);
  await client.send(commandPut);

  return {
    statusCode: 200,
    body: "Hello world",
  }
};
