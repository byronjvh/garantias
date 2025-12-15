import { Webhook } from "svix"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function POST(req: Request) {
    try {
        const secret = process.env.CLERK_WEBHOOK_SECRET
        if (!secret) {
            return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 })
        }

        const headerList = await headers()

        const svixId = headerList.get("svix-id")
        const svixTimestamp = headerList.get("svix-timestamp")
        const svixSignature = headerList.get("svix-signature")

        if (!svixId || !svixTimestamp || !svixSignature) {
            return new Response("Missing Svix headers", { status: 400 })
        }

        const payload = await req.text()
        const wh = new Webhook(secret)

        const event = wh.verify(payload, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent

        if (event.type === "user.created") {
            const { id, email_addresses, first_name, last_name } = event.data

            const email = email_addresses[0]?.email_address ?? ""
            const nombre = [first_name, last_name].filter(Boolean).join(" ")

            await prisma.usuario.upsert({
                where: { clerkId: id },
                update: {},
                create: {
                    clerkId: id,
                    email,
                    nombre,
                },
            })
        }

        return NextResponse.json({ received: true })
    } catch (err) {
        console.error("CLERK WEBHOOK ERROR:", err)
        return new Response("Internal error", { status: 500 })
    }
}
