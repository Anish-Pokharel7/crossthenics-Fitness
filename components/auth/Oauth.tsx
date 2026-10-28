"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function OAuth(){
   return (
    <Button onClick={() => 
        signIn("google")}>
            Continue with Google
        </Button>
   ) 
}

