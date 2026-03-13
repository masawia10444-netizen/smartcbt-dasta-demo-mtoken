"use client";

import { AuthContext, Session } from "@/contexts/Auth.context";
import { useContext } from "react";

type Props = {
  session: Session | null;
  children?: React.ReactNode;
};

export function useSession() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children, session }: Props) => {
  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
