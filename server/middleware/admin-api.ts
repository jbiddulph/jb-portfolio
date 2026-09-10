export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  if (!pathname.startsWith('/api/admin')) {
    return
  }

  await requireAdminUser(event)
})
