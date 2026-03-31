import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.extend(relativeTime)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs
    }
  }
})
