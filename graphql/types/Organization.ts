import { builder } from '../builder';

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
        args: {
            name: t.arg.string({ required: true }),
        },
        resolve: (query, _parent, { name }, _ctx, _info) =>
            prisma.organization.create({
                data: {
                    name,
                },
                ...query,
            }),
    })
);

builder.mutationField('updateOrganization', (t) =>
    t.prismaField({
        type: 'Organization',
        args: {
            id: t.arg.string({ required: true }),
            name: t.arg.string({ required: true}),
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