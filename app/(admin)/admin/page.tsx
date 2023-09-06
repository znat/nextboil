"use client"

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import type { Organization } from '@prisma/client';

const AllLinksQuery = gql`
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

const HelloWorld: React.FC<Props> = ({ name }) => {
    const { data, loading, error } = useQuery(AllLinksQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    return <>{data.organizations.map((o: Organization) => o.name)}</>;
};

export default HelloWorld;
