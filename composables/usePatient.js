import { appointments, documents, medicalCases, payments } from '~/utils/mockPortalData'

function createEmptyProfile() {
  return {
    first_name: '',
    last_name: '',
    phone: '',
    country_of_residence: '',
    preferred_contact_method: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  }
}

function splitFullName(fullName = '') {
  const value = String(fullName).trim()

  if (!value) {
    return { firstName: '', lastName: '' }
  }

  const [firstName = '', ...lastNameParts] = value.split(/\s+/).filter(Boolean)

  return {
    firstName,
    lastName: lastNameParts.join(' ')
  }
}

export function usePatient() {
  const nuxtApp = useNuxtApp()
  const { getSession, user } = useAuth()
  const profile = useState('patient:profile', () => createEmptyProfile())
  const profilePending = useState('patient:profile-pending', () => false)
  const profileError = useState('patient:profile-error', () => '')
  const loadedProfileUserId = useState('patient:profile-user-id', () => null)

  async function loadProfile(force = false) {
    if (!process.client || !nuxtApp.$supabase) {
      return profile
    }

    await getSession()

    const authUser = user.value

    if (!authUser?.id) {
      loadedProfileUserId.value = null
      profileError.value = ''
      profilePending.value = false
      profile.value = createEmptyProfile()
      return profile
    }

    if (!force && loadedProfileUserId.value === authUser.id) {
      return profile
    }

    profilePending.value = true
    profileError.value = ''

    const { firstName, lastName } = splitFullName(authUser.user_metadata?.full_name)
    const fallbackProfile = {
      ...createEmptyProfile(),
      first_name: firstName,
      last_name: lastName
    }

    const { data, error } = await nuxtApp.$supabase
      .from('patient_profiles')
      .select(`
        first_name,
        last_name,
        phone,
        country_of_residence,
        preferred_contact_method,
        emergency_contact_name,
        emergency_contact_phone
      `)
      .eq('user_id', authUser.id)
      .maybeSingle()

    if (error) {
      profile.value = fallbackProfile
      profileError.value = error.message || 'Unable to load your profile.'
      profilePending.value = false
      loadedProfileUserId.value = authUser.id
      return profile
    }

    profile.value = data
      ? {
          ...fallbackProfile,
          ...data,
          first_name: data.first_name || fallbackProfile.first_name,
          last_name: data.last_name || fallbackProfile.last_name
        }
      : fallbackProfile

    profilePending.value = false
    loadedProfileUserId.value = authUser.id
    return profile
  }

  if (process.client && !profilePending.value) {
    void loadProfile()
  }

  return {
    profile,
    profilePending,
    profileError,
    loadProfile,
    cases: medicalCases,
    documents,
    payments,
    appointments
  }
}
