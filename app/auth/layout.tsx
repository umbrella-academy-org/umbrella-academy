import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join Dreamize Academy",
    description: "Create your account at Umbrella Academy and start your learning journey with expert mentors and industry trainers.",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
