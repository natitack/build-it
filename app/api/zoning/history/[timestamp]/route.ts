import { NextResponse, NextRequest } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/app/lib/dynamodb";
import { auth0 } from "@/lib/auth0";

export async function GET(
    _request: NextRequest,
    { params }: { params: { timestamp: string } }
) {
    try {
        const { user } = await auth0.getSession();
        const userId = user.sub;
        const timestamp: number = parseInt(params.timestamp);

        if (!timestamp) {
            return Response.json({error: "No timestamp in request"})
        }

        const response = await docClient.send(
            new GetCommand({
                TableName: process.env.AWS_DATABASE_TABLE,
                Key: {
                    userId: userId,
                    timestamp: timestamp
                }
            })
        );
        if (!response.Item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(response.Item.zoningData);
    } catch (e: any) {
        console.error("API error:", e);
        return NextResponse.json({error: e.message}, {status: 500});
    }
}