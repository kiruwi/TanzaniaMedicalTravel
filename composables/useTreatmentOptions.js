export async function useTreatmentOptions() {
  const { items } = await useTreatments()

  function formatSpecialtyLabel(specialty = '') {
    if (specialty.toLowerCase() === 'ivf') {
      return 'Fertility and IVF'
    }

    return specialty.charAt(0).toUpperCase() + specialty.slice(1)
  }

  const groupedTreatmentOptions = computed(() => {
    const groups = new Map()

    for (const treatment of items.value) {
      const specialtyKey = treatment.specialty || 'general'

      if (!groups.has(specialtyKey)) {
        groups.set(specialtyKey, {
          label: formatSpecialtyLabel(specialtyKey),
          options: []
        })
      }

      groups.get(specialtyKey).options.push({
        value: treatment.name,
        label: treatment.name
      })
    }

    return [
      ...groups.values(),
      {
        label: 'General',
        options: [
          {
            value: 'I need help choosing a treatment',
            label: 'I need help choosing a treatment'
          }
        ]
      }
    ]
  })

  return {
    groupedTreatmentOptions
  }
}
