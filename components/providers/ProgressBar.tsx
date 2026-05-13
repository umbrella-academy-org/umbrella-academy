'use client';

import { AppProgressBar } from 'next-app-progress-bar';

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AppProgressBar
                color="#ebd20f"
                height={3}
                showSpinner={false}
            />
        </>
    );
}