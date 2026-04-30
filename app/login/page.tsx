"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

const supabase = await createClient();

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push("/");
        }
    };

    const register = async () => {
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage(
                "✅ Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail avant de vous connecter."
            );
        }
    };

    return (
        <main style={{ padding: 20 }}>
            <h1>Connexion</h1>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
            />

            <div style={{ marginTop: 10 }}>
                <button onClick={login}>Se connecter</button>
                <button onClick={register}>Créer un compte</button>
            </div>

            {message && (
                <p style={{ color: "green", marginTop: 10 }}>{message}</p>
            )}

            {error && (
                <p style={{ color: "red", marginTop: 10 }}>{error}</p>
            )}
        </main>
    );
}