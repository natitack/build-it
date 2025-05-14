import { NextResponse } from "next/server";
import { getZoningData } from "../../lib/zoningService";
import { auth0 } from "@/lib/auth0";

export async function POST(request: Request) {
    try {
        const {address} = await request.json();
        if (!address) {
            return NextResponse.json({ error: "Address Required"}, { status: 400 })
        }
        const result = await getZoningData(address);

        // Test user auth
        const { user } = await auth0.getSession(); 
        console.log(user.sub);


        return NextResponse.json(result);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}