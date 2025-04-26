import { NextResponse } from "next/server";
import { getZoningData } from "../../lib/zoningService";

export async function POST(request: Request) {
    try {
        const {address} = await request.json();
        if (!address) {
            return NextResponse.json({ error: "Address Required"}, { status: 400 })
        }
        const result = await getZoningData(address);
        return NextResponse.json(result);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}