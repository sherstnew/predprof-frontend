"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import useUserStore from "@/lib/store/userStore";
import { getTokenFromCookie, clearTokenCookie } from "@/lib/auth";

export default function Header() {
    const token = useUserStore((s) => s.token);
    const user = useUserStore((s) => s.user);
    const setToken = useUserStore((s) => s.setToken);
    const clear = useUserStore((s) => s.clear);

    useEffect(() => {
        const t = getTokenFromCookie();
        if (t && !token) setToken(t);
    }, []);

    const handleLogout = () => {
        clearTokenCookie();
        clear();
    };

    return (
        <header className="w-full flex justify-between px-5 py-3 items-center z-20">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        height={60}
                        className="rounded-xl"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-3">
                {token ? (
                    <div className="flex items-center gap-2">
                        <Link href="/profile">
                            <Button variant="ghost" size="sm">
                                <User className="size-4" /> Профиль
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            className="p-5"
                            onClick={handleLogout}
                        >
                            Выйти
                        </Button>
                    </div>
                ) : (
                    <Link href="/login">
                        <Button size="sm" className="p-5">
                            <LogIn className="size-4" /> Войти
                        </Button>
                    </Link>
                )}
                <ThemeSwitcher />
            </div>
        </header>
    );
}
