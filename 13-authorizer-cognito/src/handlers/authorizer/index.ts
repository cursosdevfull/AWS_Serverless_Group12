import * as jwt from 'jsonwebtoken'
import { SSMClient, GetParameterCommand, GetParameterCommandInput } from "@aws-sdk/client-ssm";

type Payload = {
  email: string
}

const ssmClient = new SSMClient();

const validateToken = (token: string, secret: string): Promise<Payload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

const getParameterFromSSM = async (ssmName: string) => {
  const input: GetParameterCommandInput = {
    Name: ssmName
  }

  const command = new GetParameterCommand(input);
  const result = await ssmClient.send(command);
  return result.Parameter?.Value || "";
}

export const main = async (event: any) => {
  const { authorizationToken, methodArn } = event

  try {
    const keySecretName = process.env["SSM_KEY_SECRET"] || "";
    const keySecretValue = await getParameterFromSSM(keySecretName)
    const payload: Payload = await validateToken(authorizationToken, keySecretValue)

    return {
      principalId: payload.email,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: methodArn
          }
        ]
      }
    }
  } catch (error) {
    console.error(error)
    return {
      principalId: "user",
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: methodArn
          }
        ]
      }
    }
  }

  return {
    statusCode: 200,
    body: "Hello world",
  }
};
