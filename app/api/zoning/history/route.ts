import { NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/app/lib/dynamodb";
import { auth0 } from "@/lib/auth0";

export async function GET() {
    try {
        const { user } = await auth0.getSession();
        const userId = user.sub;

        const response = await docClient.send(
            new QueryCommand({
                TableName: process.env.AWS_DATABASE_TABLE,
                KeyConditionExpression: "userId = :uid",
                ExpressionAttributeValues: {
                    ":uid": userId,
                },
                ScanIndexForward: false,
                Limit: 20
            })
        );

        return NextResponse.json(response.Items.map(({ userId, ...rest}) => rest) ?? []);
    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}