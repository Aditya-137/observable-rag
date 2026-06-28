import { prisma } from "@/lib/prisma"

export async function GET() {
  const documents = await prisma.document.findMany()
  return Response.json({ documents, count: documents.length })
}