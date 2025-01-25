"use client"
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Info() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logoutUser);
    useEffect(() => {
        console.log(user)
        if (!user) {
            router.push("/")
        }
    })

    const signOut = () => {
        logoutUser()
        router.push("/")
    }
    if(user) {
    }
    return(
        <>
        <h1>Hellow</h1>
        <button onClick={signOut}>Log out</button>
        </>
    )
}