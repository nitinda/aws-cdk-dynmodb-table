import dynamodb = require('@aws-cdk/aws-dynamodb');
import cdk = require('@aws-cdk/core');
import { StackProps } from '@aws-cdk/core';

export class DynamoDBStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props: StackProps ) {
    super(app, id, props);

    const dynamoTable = new dynamodb.Table(this, 'items', {
      partitionKey: {
        name: 'itemId',
        type: dynamodb.AttributeType.STRING
      },
      tableName: 'items',
      serverSideEncryption: true,

      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
  }
}

const app = new cdk.App();
new DynamoDBStack(app, 'DynamoDBTableExample', { tags: {'Product': 'ProductService', 'Name': 'Test'}});

app.synth();
