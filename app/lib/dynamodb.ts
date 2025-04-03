import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: process.env.AWS_REGION })
export const docClient = DynamoDBDocumentClient.from(client)

export interface DynamoEntry {
  id: string
  createdAt: string
  updatedAt: string
  [key: string]: any  // Allow any additional fields
} 