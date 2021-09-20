### Coding Challenge Guidelines
1. Create a Serverless framework application. 

2. The serverless application should contain a dynamodb table to house "User" data. Attributes:
id: String UUID
firstName: String
lastName: String
email: String

3. Create Lambdas to create and list items from this DynamoDB table.

4. Email attribute should be unique.

5. Make the Lambda function available via an AWS API Gateway endpoint.

6. Write unit tests for your code by mocking AWS DynamoDB API. You don't have to provide 100% code coverage.
Please write some test cases to demonstrate your approach.

7. Make response JSON:API 1.0 compatible.

8. Build a REACT application to display and create user data. The application will consist of the following pages:
- main page to list all the existing users
- user should be able to delete users
- a page to create or update existing users
- authentication of react app is not required

### Evaluation Criteria

Please complete as much as you can within 2 hours. We are looking for your approach
and coding style rather than complete functionality. Please structure your code in a well
defined and readable way.

### Useful Links

https://www.serverless.com/framework/docs/
https://jsonapi.org/format/1.0/
https://www.npmjs.com/package/aws-sdk-mock

### CodeSubmit

Please organize, design, test and document your code as if it were
going into production - then push your changes to the master branch.

All the best,

The CodeSubmit Team
