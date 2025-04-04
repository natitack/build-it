# NextJS + AWS starter project

This is a starter NextJS application that integrates with AWS S3 and DynamoDB.  It can be used as a starting point for your own projects.  AWS credentials must be configured in the ~/.aws/credentials on your dev workstation or in the .env.local file.

This application uses native AWS SDK components to communicate with the services.  The communication to AWS services are implemented through NextJS API routes to keep secrets server side.

## Workstation Setup
1. Install [Node](https://nodejs.org/en/download) JS version 21 LTS or newer 
2. Install [AWS CLI](https://aws.amazon.com/cli) tools for your workstation
3. Clone this repository into your workstation in a local folder
4. `cd <working directory>`
5. run `npm install` to install all the packages you will need


## How to Configure
These steps describe how to install this application

1. Configure your workstation environment with the AWS credentials by adding the following to your ~/.aws/credentials file:
```[default]
  aws_access_key_id=
  aws_secret_access_key=
  aws_session_token=
```
2. Create an S3 bucket and a DynamoDB database table
3. Configure the names for the bucket and table in the .env.local file.  Use the .env.example as a starting point.

## How to Use

1. At the top of the working directory, start the NextJS dev environment with
`npm run dev`
2. On successful startup, open a browser and go to http://localhost:3000 
3. The application has the following features:
  - List objects in the configured S3 bucket
  - Upload new objects to the configured S3 bucket
  - Create, List, and Delete nosql database entries in the configured DynamoDB tables.
  - Handle and display AWS communication error messages.  Details are in the JS console.