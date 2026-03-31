import { z } from 'zod'

export const inquirySchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  country: z.string().min(2),
  treatment_interest: z.string().min(2),
  message: z.string().optional().default('')
})

export const quoteRequestSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  treatment_interest: z.string().min(2),
  travel_window: z.string().optional().default(''),
  diagnosis_summary: z.string().optional().default('')
})

export const bookingSchema = z.object({
  case_id: z.string().min(2),
  booking_type: z.string().min(2),
  provider_name: z.string().min(2),
  start_date: z.string().min(4),
  end_date: z.string().min(4),
  notes: z.string().optional().default('')
})

export const uploadCompleteSchema = z.object({
  case_id: z.string().min(2),
  file_name: z.string().min(1),
  file_path: z.string().min(1),
  file_type: z.string().min(1),
  category: z.string().min(1)
})

export async function validateBody(event, schema) {
  const body = await readBody(event)
  return schema.parse(body)
}
