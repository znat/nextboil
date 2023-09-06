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
