import { z } from 'zod'

export const launchSchema = z.object({
  name: z.string(),
  id: z.string(),
  dataType: z.literal('Launches'),
  success: z.boolean(),
  flight_number: z.number(),
  links: z.object({
    webcast: z.string(),
    wikipedia: z.string(),
    patch: z.object({
      small: z.string()
    })
  }),
  rocket: z.string(),
  details: z.string().nullable(),
  isFavorite: z.boolean().optional(),
  favoriteDate: z.number().optional().nullable()
})

export const arrLaunchesSchema = z.array(launchSchema)

export type ILaunchesData = z.infer<typeof launchSchema>;

export const rocketSchema = z.object({
  name: z.string(),
  id: z.string(),
  flickr_images: z.array(z.string()),
  dataType: z.literal('Rockets'),
  description: z.string(),
  isFavorite: z.boolean().optional(),
  height: z.object({
    meters: z.number()
  }),
  diameter: z.object({
    meters: z.number()
  }),
  mass: z.object({
    kg: z.number()
  }),
  favoriteDate: z.number().optional()
})

export const arrRocketsSchema = z.array(rocketSchema)

export type IRocketsData = z.infer<typeof rocketSchema>
