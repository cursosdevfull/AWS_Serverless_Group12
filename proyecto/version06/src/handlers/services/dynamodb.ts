import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";

export type Item = {
    [key: string]: { S: string } | { N: string } | { NULL: boolean }
}

export type ExpressionAttributeNamesType = {
    [key: string]: string
}

export type ExpressionAttributeValuesType = {
    [key: string]: { S: string } | { N: string }
}

export class DynamoDBService {
    private client: DynamoDBClient;

    constructor() {
        this.client = new DynamoDBClient();
    }

    async add(tableName: string, item: Item) {
        const inputPut: PutItemCommandInput = {
            TableName: tableName,
            Item: item,
        }

        console.log("inputPut", inputPut);

        const commandPut = new PutItemCommand(inputPut);
        await this.client.send(commandPut);
    }

    async scan(tableName: string, expressionAttributeNamesType: ExpressionAttributeNamesType, expressionAttributeValuesType: ExpressionAttributeValuesType, filterExpression: string, projectionExpression: string) {
        const input: ScanCommandInput = {
            TableName: tableName,
            ExpressionAttributeNames: expressionAttributeNamesType,
            ExpressionAttributeValues: expressionAttributeValuesType,
            FilterExpression: filterExpression,
            ProjectionExpression: projectionExpression
        }

        const command = new ScanCommand(input);
        const result = await this.client.send(command);

        let items: any[] = [];

        if (result && result.Items && result.Items.length > 0) {
            items = result.Items.map((item) => unmarshall(item));
        }

        return items;
    }
}