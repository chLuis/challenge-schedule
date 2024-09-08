import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo_db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Ruta');
    const collection = db.collection('empanada');
    const items = await collection.find({}).toArray();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}

export async function POST(request: any) {
  try {
    const client = await clientPromise;
    const db = client.db('Ruta');
    const collection = db.collection('empanada');
    const body = await request.json();
    const result = await collection.insertOne(body);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to insert data' },
      { status: 500 },
    );
  }
}