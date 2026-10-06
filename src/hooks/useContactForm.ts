import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export const useContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "sending") return;

        const form = e.currentTarget;
        const data = new FormData(form);

        if (data.get("botcheck")) return;

        setStatus("sending");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: data.get("name"),
                    email: data.get("email"),
                    message: data.get("message"),
                    subject: "Portfolyodan yeni mesaj",
                }),
            });

            const json = await res.json();
            if (json.success) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return { status, handleSubmit }
}