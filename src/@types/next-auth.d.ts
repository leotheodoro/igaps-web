import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    access_level: number;
    client_id?: string;
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_level: number;
    client_id?: string;
  }
}
