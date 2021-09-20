const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
const chai = require('chai');
const { app } = require('./handler');
require('mocha');

describe('testing', () => {

    it('should mock reading from DocumentClient', async (done) => {
        // Overwriting DynamoDB.DocumentClient.get()
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            console.log('DynamoDB.DocumentClient', 'scan', 'mock called');
            callback(null, {pk: 'foo', sk: 'bar'});
        });

        const USERS_TABLE = process.env.USERS_TABLE;
        const params = {
            TableName: USERS_TABLE
        };

        const dynamoDbClientParams = {};
        if (process.env.IS_OFFLINE) {
            dynamoDbClientParams.region = 'localhost'
            dynamoDbClientParams.endpoint = 'http://localhost:8000'
        }
        const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

        // TODO: not completed
        expect(await dynamoDbClient.scan(params).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });

        AWSMock.restore('DynamoDB.DocumentClient');
        done();
    });
});
