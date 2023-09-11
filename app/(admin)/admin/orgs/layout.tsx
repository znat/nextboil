import React from 'react';

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
