import { z } from 'zod'

export const QueryParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  sortBy: z.string().optional(),
  direction: z.string().optional(),
  search: z.string().optional(),
  filter: z.string().optional(),
  timeframe: z.string().optional(),
})

export type QueryParams = z.infer<typeof QueryParamsSchema>

export const IdentityQueryParamsSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  identity_ids: z.array(z.string()).optional(),
  creators: z.array(z.string()).optional(),
  display_names: z.array(z.string()).optional(),
  descriptions: z.array(z.string()).optional(),
})

export type IdentityQueryParams = z.infer<typeof IdentityQueryParamsSchema>
