export function extractTime (dateString) {
  const date = new Date(dateString)
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const period = date.getHours() >= 12 ? 'PM' : 'AM'

  return `${hours}:${minutes} ${period}`
}
