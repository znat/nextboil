import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ErrorPlugin from '@pothos/plugin-errors';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import prisma from '../lib/prisma';

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
}>({
    plugins: [PrismaPlugin, ErrorPlugin],
    errorOptions: {
        defaultTypes: [],
    },
    prisma: {
        client: prisma,
    },
});

builder.objectType(Error, {
    name: 'Error',
    fields: (t) => ({
        message: t.exposeString('message'),
    }),
});

builder.queryType({
    description: 'The query root of Pothos GraphQL API.',
    fields: (t) => ({
        ok: t.boolean({
            resolve: () => true,
        }),
    }),
});

builder.mutationType({});
