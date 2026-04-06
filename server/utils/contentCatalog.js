import { doctors as mockDoctors, hospitals as mockHospitals, treatments as mockTreatments } from '~/utils/mockData'
import { getSupabaseAdmin } from '~/server/utils/supabase'

function normalizeText(value) {
  return String(value || '').trim()
}

export function slugify(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatSpecialtyName(slug = '') {
  if (slug === 'ivf') {
    return 'Fertility and IVF'
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatDoctorSpecialty(slug = '') {
  if (slug === 'ivf') {
    return 'Fertility'
  }

  return formatSpecialtyName(slug)
}

function mergeBySlug(baseItems, overrideItems) {
  const merged = new Map()

  for (const item of baseItems) {
    merged.set(item.slug, item)
  }

  for (const item of overrideItems) {
    merged.set(item.slug, item)
  }

  return Array.from(merged.values())
}

function sortByName(items) {
  return [...items].sort((left, right) => left.name.localeCompare(right.name))
}

function buildMockCatalog() {
  const specialtyMap = new Map()

  for (const treatment of mockTreatments) {
    specialtyMap.set(treatment.specialty, {
      id: treatment.specialty,
      slug: treatment.specialty,
      name: formatSpecialtyName(treatment.specialty)
    })
  }

  const hospitals = mockHospitals.map((hospital) => ({
    id: hospital.slug,
    slug: hospital.slug,
    name: hospital.name,
    city: hospital.city || '',
    country: hospital.country || '',
    specialtyFocus: hospital.specialtyFocus || '',
    summary: hospital.summary || '',
    address: hospital.address || ''
  }))

  const specialtyByDoctorSlug = new Map()

  for (const treatment of mockTreatments) {
    for (const doctorSlug of treatment.doctorSlugs || []) {
      specialtyByDoctorSlug.set(doctorSlug, treatment.specialty)
    }
  }

  const doctors = mockDoctors.map((doctor) => {
    const specialtySlug = specialtyByDoctorSlug.get(doctor.slug) || slugify(doctor.specialty)

    return {
      id: doctor.slug,
      slug: doctor.slug,
      name: doctor.name,
      title: doctor.title || '',
      hospitalId: doctor.hospitalSlug || null,
      hospitalSlug: doctor.hospitalSlug || '',
      specialtyId: specialtySlug,
      specialtySlug,
      specialty: formatDoctorSpecialty(specialtySlug),
      summary: doctor.summary || '',
      languages: Array.isArray(doctor.languages) ? doctor.languages : []
    }
  })

  const treatments = mockTreatments.map((treatment) => ({
    id: treatment.slug,
    slug: treatment.slug,
    name: treatment.name,
    specialtyId: treatment.specialty,
    specialty: treatment.specialty,
    specialtyLabel: formatSpecialtyName(treatment.specialty),
    summary: treatment.summary || '',
    overview: treatment.overview || '',
    priceFrom: Number(treatment.priceFrom || 0),
    duration: treatment.duration || '',
    hospitalId: treatment.hospitalSlugs?.[0] || null,
    primaryDoctorId: treatment.doctorSlugs?.[0] || null,
    featured: true
  }))

  return {
    specialties: sortByName(Array.from(specialtyMap.values())),
    hospitals: sortByName(hospitals),
    doctors: sortByName(doctors),
    treatments: [...treatments].sort((left, right) => left.name.localeCompare(right.name))
  }
}

function mapDatabaseCatalog({
  specialties = [],
  hospitals = [],
  doctors = [],
  treatments = []
}) {
  const specialtyById = new Map(
    specialties.map((specialty) => [
      specialty.id,
      {
        id: specialty.id,
        slug: specialty.slug,
        name: specialty.name || formatSpecialtyName(specialty.slug)
      }
    ])
  )

  const mappedHospitals = hospitals.map((hospital) => ({
    id: hospital.id,
    slug: hospital.slug,
    name: hospital.name,
    city: hospital.city || '',
    country: hospital.country || '',
    specialtyFocus: hospital.specialty_focus || '',
    summary: hospital.summary || '',
    address: hospital.address || ''
  }))

  const hospitalById = new Map(mappedHospitals.map((hospital) => [hospital.id, hospital]))

  const mappedDoctors = doctors.map((doctor) => {
    const specialty = specialtyById.get(doctor.specialty_id) || null
    const hospital = hospitalById.get(doctor.hospital_id) || null

    return {
      id: doctor.id,
      slug: doctor.slug,
      name: doctor.full_name,
      title: doctor.title || '',
      hospitalId: doctor.hospital_id || null,
      hospitalSlug: hospital?.slug || '',
      specialtyId: doctor.specialty_id || null,
      specialtySlug: specialty?.slug || '',
      specialty: formatDoctorSpecialty(specialty?.slug || ''),
      summary: doctor.summary || '',
      languages: Array.isArray(doctor.languages) ? doctor.languages : []
    }
  })

  const mappedTreatments = treatments.map((treatment) => {
    const specialty = specialtyById.get(treatment.specialty_id) || null

    return {
      id: treatment.id,
      slug: treatment.slug,
      name: treatment.name,
      specialtyId: treatment.specialty_id || null,
      specialty: specialty?.slug || '',
      specialtyLabel: specialty?.name || formatSpecialtyName(specialty?.slug || ''),
      summary: treatment.summary || '',
      overview: treatment.overview || '',
      priceFrom: Number(treatment.price_from || 0),
      duration: treatment.duration || '',
      hospitalId: treatment.hospital_id || null,
      primaryDoctorId: treatment.primary_doctor_id || null,
      featured: Boolean(treatment.featured)
    }
  })

  return {
    specialties: sortByName(Array.from(specialtyById.values())),
    hospitals: sortByName(mappedHospitals),
    doctors: sortByName(mappedDoctors),
    treatments: [...mappedTreatments].sort((left, right) => {
      if (left.featured !== right.featured) {
        return Number(right.featured) - Number(left.featured)
      }

      return left.name.localeCompare(right.name)
    })
  }
}

export async function getWebsiteContent() {
  const fallback = buildMockCatalog()
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return fallback
  }

  try {
    const [
      { data: specialties, error: specialtyError },
      { data: hospitals, error: hospitalError },
      { data: doctors, error: doctorError },
      { data: treatments, error: treatmentError }
    ] = await Promise.all([
      supabase
        .from('specialties')
        .select('id, name, slug')
        .order('name', { ascending: true }),
      supabase
        .from('hospitals')
        .select('id, name, slug, city, country, specialty_focus, summary, address')
        .order('name', { ascending: true }),
      supabase
        .from('doctors')
        .select('id, hospital_id, specialty_id, full_name, slug, title, summary, languages')
        .order('full_name', { ascending: true }),
      supabase
        .from('treatments')
        .select('id, specialty_id, hospital_id, primary_doctor_id, name, slug, summary, overview, price_from, duration, featured')
        .order('featured', { ascending: false })
        .order('name', { ascending: true })
    ])

    const firstError = specialtyError || hospitalError || doctorError || treatmentError

    if (firstError) {
      throw firstError
    }

    const database = mapDatabaseCatalog({
      specialties: specialties || [],
      hospitals: hospitals || [],
      doctors: doctors || [],
      treatments: treatments || []
    })

    return {
      specialties: mergeBySlug(fallback.specialties, database.specialties),
      hospitals: mergeBySlug(fallback.hospitals, database.hospitals),
      doctors: mergeBySlug(fallback.doctors, database.doctors),
      treatments: mergeBySlug(fallback.treatments, database.treatments)
    }
  } catch (error) {
    console.error('Unable to load website content from Supabase:', error)
    return fallback
  }
}

export async function ensureSpecialtyRecord(supabase, specialtyInput) {
  const specialtyName = normalizeText(specialtyInput)
  const specialtySlug = slugify(specialtyName)

  if (!specialtyName || !specialtySlug) {
    return null
  }

  const { data, error } = await supabase
    .from('specialties')
    .upsert([
      {
        name: specialtyName,
        slug: specialtySlug
      }
    ], {
      onConflict: 'slug'
    })
    .select('id, name, slug')
    .single()

  if (error) {
    throw error
  }

  return data
}

export function parseLanguages(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeText(item))
      .filter(Boolean)
  }

  return normalizeText(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function normalizeContentValue(value) {
  return normalizeText(value) || null
}
