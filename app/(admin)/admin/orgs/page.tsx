'use client';

import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import type { Organization } from '@prisma/client';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { OrganizationEditor } from './components/editor';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const GET_ALL_ORGANIZATIONS = gql`
    query {
        organizations {
            id
            name
        }
    }
`;

const DELETE_ORGANIZATION = gql`
    mutation deleteOrganization($id: String!) {
        deleteOrganization(id: $id) {
            id
            name
        }
    }
`;

interface Props {
    name: string;
}

const HelloWorld: React.FC<Props> = () => {
    const { data, loading, error } = useQuery(GET_ALL_ORGANIZATIONS);
    const [deleteOrganization, { data: deleteResult }] = useMutation(
        DELETE_ORGANIZATION,
        {
            refetchQueries: [{ query: GET_ALL_ORGANIZATIONS }],
        }
    );
    const onEdit = (row: Organization) => {
        console.log('edit', row);
    };
    const onDelete = async ({ id }: Organization) => {
        const result = await deleteOrganization({
            variables: { id },
        });
        if (result) {
            toast({
                description: 'Organization succesfully deleted',
            });
        } else {
            toast({
                variant: "destructive",
                description: 'Organization could not be deleted',
            });
        }
    };
    if (loading) return <></>;
    if (error) return <p>Oh no... {error.message}</p>;
    return (
        <>
            <div className='container mx-auto py-10'>
                <div className='flex justify-end mb-10'>
                    <OrganizationEditor>
                        <Button>
                            <Plus className='mr-2 h-4 w-4' />
                            New
                        </Button>
                    </OrganizationEditor>
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
