// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body || {};

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email et mot de passe requis." },
      { status: 400 }
    );
  }

  // Demo uniquement : accepter si password === "password"
  if (password === "password") {
    // retourner un token réel lorsqu'on intègre l'auth (ex: Supabase / JWT)
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { message: "Identifiants incorrects." },
    { status: 401 }
  );
}
