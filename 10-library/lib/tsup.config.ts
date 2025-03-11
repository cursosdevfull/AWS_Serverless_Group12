import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        lambda: 'src/lambda.ts',
        sns: 'src/sns.ts',
        sqs: 'src/sqs.ts',
        "event-bridge": 'src/event-bridge.ts',
        "data-source": 'src/data-source.ts',
        dynamodb: 'src/dynamodb.ts'
    },
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
})