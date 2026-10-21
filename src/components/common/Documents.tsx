import { prisma } from "@/lib/prisma";

export default async function Documents() {
  const docs = await prisma.document.findMany();

  return (
    <div className="flex flex-col px-auto justify-center items-center flex-1 p-8 gap-4">
      {docs.map((doc) => (
        <div
          key={doc.id}
          className="w-50 overflow-hidden rounded-2xl border p-3 text-center font-bold text-white bg-black"
          title={doc.name}
        >
          <div className="line-clamp-1 ">{doc.name}</div>
        </div>
      ))}
    </div>
  );
}
