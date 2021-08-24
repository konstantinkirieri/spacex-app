import {z} from 'zod'

export const launchSchema = z.object({
  name: z.string(),
  id: z.string(),
  dataType: z.literal('Launches'),
  success: z.union([z.boolean(), z.null()]),
  flight_number: z.number(),
  links: z.object({
    webcast: z.union([z.string(), z.null()]),
    wikipedia: z.union([z.string(), z.null()]),
    patch: z.object({
      small: z.union([z.string(), z.null()])
    })
  }),
  rocket: z.string(),
  date_local: z.string(),
  date_unix: z.number(),
  details: z.string().nullable(),
  favoriteDate: z.number()
})

export const arrLaunchesSchema = z.array(launchSchema)

export type ILaunchesData = z.infer<typeof launchSchema>

export const rocketSchema = z.object({
  name: z.string(),
  id: z.string(),
  flickr_images: z.array(z.string()),
  dataType: z.literal('Rockets'),
  description: z.string(),
  height: z.object({
    meters: z.number()
  }),
  diameter: z.object({
    meters: z.number()
  }),
  mass: z.object({
    kg: z.number()
  }),
  favoriteDate: z.number()
})

export const arrRocketsSchema = z.array(rocketSchema)

export type IRocketsData = z.infer<typeof rocketSchema>
