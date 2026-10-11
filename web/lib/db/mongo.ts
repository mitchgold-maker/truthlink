import { MongoClient, type Db } from "mongodb";

// One shared Atlas client per server instance. Server-only; never import from client code.
const g = globalThis as unknown as { __mongo?: Promise<MongoClient> };

export function mongoConfigured() {
  const uri = process.env.MONGODB_URI ?? "";
  return uri.startsWith("mongodb") && !uri.includes("<db_password>");
}

export async function db(): Promise<Db> {
  if (!mongoConfigured()) throw new Error("MONGODB_URI not configured");
  g.__mongo ??= new MongoClient(process.env.MONGODB_URI!, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 }).connect();
  try {
    return (await g.__mongo).db(process.env.MONGODB_DB ?? "truthlink");
  } catch (e) {
    g.__mongo = undefined; // retry on the next request instead of caching a failed connection
    throw e;
  }
}
