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
            <div className='hidden flex-col md:flex'>
                <div className='border-b'>
                    <div className='flex h-16 items-center px-4'>
                        <MainNav className='mx-6' />
                        <div className='ml-auto flex items-center space-x-4'>
                            <UserNav />
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </>
    );
}
