import { LambdaService } from "@curso-aws-group12/lib"

export const main = async (event: any) => {
    const lambdaService = new LambdaService();
    console.log(lambdaService);


    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" })
    }
}