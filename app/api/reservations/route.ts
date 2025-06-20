import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { date } from "zod";

export async function GET(req: Request) {
    
    const reservations = await prisma.reservation.findMany({});

    return new Response(JSON.stringify(reservations), { status: 201 });
}


