import { Organization } from '@prisma/client';
import { builder } from '../builder';
import { ca } from 'date-fns/locale';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

builder.prismaObject('Organization', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        users: t.relation('users'),
    }),
});

builder.queryField('organizations', (t) =>
    t.prismaField({
        type: ['Organization'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.organization.findMany({ ...query }),
    })
);

builder.mutationField('createOrganization', (t) =>
    t.prismaField({
        type: 'Organization',
        errors: {
            types: [Error],
        },
        args: {
            name: t.arg.string({ required: true }),
        },
        resolve: async (query, _parent, { name }, _ctx, _info) => {
            
            try {
                const organization = await prisma.organization.create({
                    data: {
                        name,
                    },
                    ...query,
                });
                return organization
            } catch (error) {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new Error(
                            'An organization with that name already exists'
                        );
                    } else {
                        throw new Error(error.message);
                    }
                } else {
                    throw new Error('Unknown error');
                }
            }
        },
    })
);

builder.mutationField('updateOrganization', (t) =>
    t.prismaField({
        type: 'Organization',
        args: {
            id: t.arg.string({ required: true }),
            name: t.arg.string({ required: true }),
        },
        resolve: async (query, _parent, { id, name }, _ctx, _info) =>
            prisma.organization.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
                ...query,
            }),
    })
);

builder.mutationField('deleteOrganization', (t) =>
    t.prismaField({
        type: 'Organization',
        args: {
            id: t.arg.string({ required: true }),
        },
        resolve: async (query, _parent, { id }, _ctx, _info) =>
            prisma.organization.delete({
                where: {
                    id,
                },
                ...query,
            }),
    })
);
