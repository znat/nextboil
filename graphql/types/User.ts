import { builder } from "../builder";

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email', { nullable: true }),
    profile: t.relation('profile'),
    organizations: t.relation('organizations'),
  })
})

builder.prismaObject('Profile', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
  })
})

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
})

builder.queryField("users", (t) =>
  t.prismaField({
    type: ['User'],
    resolve: (query, _parent, _args, _ctx, _info) =>{
      console.log(query)
      return prisma.user.findMany({ ...query })
    }
  })
)