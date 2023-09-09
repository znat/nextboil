'use client';

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import type { Organization } from '@prisma/client';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { OrganizationEditor } from './components/editor';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AllOrganizationsQuery = gql`
    query {
        organizations {
            id
            name
        }
    }
`;

interface Props {
    name: string;
}

const HelloWorld: React.FC<Props> = () => {
    const { data, loading, error } = useQuery(AllOrganizationsQuery);
    const onEdit = (row: Organization) => {
        console.log('edit', row);
    };
    const onDelete = (row: Organization) => {
        console.log('delete', row);
    };
    if (loading) return <></>;
    if (error) return <p>Oh no... {error.message}</p>;
    return (
        <>
            <div className='container mx-auto py-10'>
                <div className='flex justify-end mb-10'>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        New
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={data.organizations}
                    editComponent={OrganizationEditor}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </>
    );
};

export default HelloWorld;
