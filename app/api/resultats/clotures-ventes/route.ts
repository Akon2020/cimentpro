import { prisma } from "@/lib/prisma";
import { Pagination } from "@/prisma/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    
    // La bare des recherches
    // La pagination

    const FetchParams = request.nextUrl.searchParams;
    const dateCloture = FetchParams.get('date');

    const day = dateCloture ? new Date(dateCloture) : new Date();
    
    const startDayUTC = new Date(
        Date.UTC(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        0, 0, 0, 0 // Heure, minute, seconde, milliseconde
        )
    );

    const endDayUTC = new Date(
        Date.UTC(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        23, 59, 59, 999 // Heure, minute, seconde, milliseconde
        )
    ); 

    const condition = {
        updatedAt: {
            gte: startDayUTC,
            lte: endDayUTC
        }
    }

    const selection = {
        dateCloture: true
    }
    
    const data = await Pagination(request, 'clotureCaisse', condition, selection, null);

    return new Response(JSON.stringify(data), { status: 201 });
}

