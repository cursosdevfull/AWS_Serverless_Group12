import { DynamoDBClient, QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { SSMClient, GetParameterCommand, GetParameterCommandInput } from "@aws-sdk/client-ssm";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import bcrypt from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";

const dynamoClient = new DynamoDBClient();
const ssmClient = new SSMClient();

const getParameterFromSSM = async (ssmName: string) => {
  const input: GetParameterCommandInput = {
    Name: ssmName
  }

  const command = new GetParameterCommand(input);
  const result = await ssmClient.send(command);
  return result.Parameter?.Value || "";
}

const generateToken = async (email: string) => {
  const keySecretName = process.env["SSM_KEY_SECRET"] || "";
  const privateKey = await getParameterFromSSM(keySecretName);
  return jsonwebtoken.sign({ email }, privateKey, { expiresIn: "1h" });
}

export const main = async (event: any) => {
  const { email, password } = JSON.parse(event.body);

  const input: QueryCommandInput = {
    TableName: process.env.USER_TABLE || "",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email }
    },
    ProjectionExpression: "password"
  }

  const command = new QueryCommand(input);
  const result = await dynamoClient.send(command);

  if (result.Items && result.Items.length > 0) {
    const user = result.Items[0];
    const response = unmarshall(user);

    const isMatch = bcrypt.compareSync(password, response.password);

    if (isMatch) {
      const token = await generateToken(email);

      return {
        statusCode: 200,
        body: token,
      }
    }
  }

  return {
    statusCode: 401,
    body: "User not authorized",
  }
};
