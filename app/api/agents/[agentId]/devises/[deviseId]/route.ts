import { Devise } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { DeviseRouteParams } from "@/prisma/definitions";


export async function PUT(request: Request, { params }: DeviseRouteParams) {
    const { deviseId } = await params;
    const data: Devise = await request.json();

    const devise = await prisma.devise.findUnique({
        where: { id: parseInt(deviseId)}
    });

    if (!devise) return new Response("Devise Not Found!", { status: 404 });

    try {
        await prisma.devise.update({
            where: { id: parseInt(deviseId) },
            data: data
        });
        return new Response("Devise Updated!", { status: 404 });
    } catch (error) {
        return new Response("Invalid Form!", { status: 404 });   
    }
} 