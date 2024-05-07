import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/util'

export const GET = async (request: NextRequest, response: NextResponse) => {
    const case_id = request.nextUrl.searchParams.get("case_id");
    const result = await pool.query(`SELECT * FROM patient WHERE pid = ${case_id}`);

    let success = false;
    if (result && result.length > 0 && result[0].length > 0 && result[0][0].name) {
        success = true;
    }
    const result1 = result[0];
    const jsonResponse = {
        success: success,
        data: result1
    };

    const headers = {};

    if (success) {
        return NextResponse.json(
            jsonResponse,{
                headers: {
                    'Set-Cookie': `patientId=${case_id};Path=/patient/${case_id}`
                }
            }
        );
    }

    return NextResponse.json(jsonResponse, { headers });
}
