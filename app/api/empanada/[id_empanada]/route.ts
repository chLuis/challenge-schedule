import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo_db';
import { ObjectId } from 'mongodb';


export async function DELETE(request: Request, context?: { params: { id_empanada : string } }) {
  const _id = context?.params.id_empanada // '1'
  try {
    const client = await clientPromise;
    const db = client.db('Ruta');
    const collection = db.collection('empanada');
    //const { id } = await request.json();
    const item = await collection.deleteOne({ _id: new ObjectId(_id) });
    return NextResponse.json(item)
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 },
    );
  }
}