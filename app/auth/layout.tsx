'use client'

import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react";
import { AppProgressBar } from 'next-app-progress-bar';


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { handleDashboardRedirect, isAuthenticated } = useAuth();
    useEffect(() => {
        handleDashboardRedirect();
    }, [isAuthenticated]);
    return children
}
