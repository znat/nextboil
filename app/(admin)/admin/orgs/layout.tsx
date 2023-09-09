import React from 'react';
import { MainNav } from './components/main-nav';
import { UserNav } from '@/components/navbar/user-nav';
import { ModeToggle } from '@/components/mode-toggle';

const title = 'Nested Layouts';

export const metadata = {
    title,
    openGraph: {
        title,
        images: [`/api/og?title=${title}`],
    },
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    //   const categories = await getCategories();

    return (
        <>
            <div>{children}</div>
        </>
    );
}
