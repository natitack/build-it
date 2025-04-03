import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export async function GET() {
  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    })

    const response = await client.send(command)
    return Response.json({ objects: response.Contents || [] })
  } catch (error) {
    console.error("Error fetching objects:", error)
    return new Response(JSON.stringify({ error: "Error communicating with AWS. Check credentials" }), { status: 500 })
  }
} 