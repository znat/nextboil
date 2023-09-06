// graphql/schema.ts

import { builder } from "./builder";

import "./types/Organization"
import "./types/User"

export const schema = builder.toSchema()