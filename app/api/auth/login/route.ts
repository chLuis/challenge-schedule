import clientPromise from "@/lib/mongo_db";
//import axios from "axios";
//import { COOKIE_NAME } from "@/constants";
//import { serialize } from "cookie";
//import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
//import { URL_DB } from "@/constants";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: any){
  //console.log(request.body, "Entre API LOGIN")
    const body = await request.json();
    const { username, password } = body;
    //console.log(body)
    const user = {
        name: username,
        password
    }
    //console.log(user, "USER")

    //const DB_URL = URL_DB;

    try {
      //console.log("INTENTANDO TRY");
      const client = await clientPromise;
      const db = client.db('test');
      const collection = db.collection('peluusers');
      //const body = await request.json();
      const items = await collection.find({}).toArray();
      //console.log(items)
      //const log = items.find(item => item.name === name && item.password === password)
      const log = items.some(item => {
        return item.name === user.name && item.password === user.password;
    });
      //console.log(log, "LOGF")
      if (!log) {
        //console.log("Usuario o contraseña invalida");
        return NextResponse.json(
          {message: 'Usuario o contraseña invalida'},
          {status: 401},)
        }
        //console.log("Usuario o contraseña valido");

      return NextResponse.json(
        {message: user.name},
        {status: 200},)

    
    }
    catch (error) {
        //console.log("Entre")
        //console.log("ERRRRRROR!");
        //console.log(error)
        return NextResponse.json(
            {message: 'Usuario o contraseña invalida'},
            {status: 401},)
    };
}

//TODO hacer el patch diferenciado