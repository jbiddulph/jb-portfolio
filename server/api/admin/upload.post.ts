import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY
    
    if (!supabaseUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'SUPABASE_URL is required'
      })
    }
    
    if (!supabaseKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'SUPABASE_KEY or SUPABASE_SERVICE_ROLE_KEY is required'
      })
    }
    
    // For server-side storage operations, we need the service role key
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Get the form data
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }
    
    const file = formData.find(f => f.name === 'file')
    const folderField = formData.find(f => f.name === 'folder')
    
    if (!file || !folderField) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing file or folder parameter'
      })
    }
    
    const folder = folderField.data.toString()
    
    if (!file.data || !file.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file data'
      })
    }
    
    // Validate folder
    const validFolders = ['portfolio', 'site', 'avatar']
    if (!folder || !validFolders.includes(folder)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid folder. Must be one of: portfolio, site, avatar'
      })
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('jbiddulph')
      .upload(`${folder}/${fileName}`, file.data, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      })
    
    if (error) {
      console.error('Supabase upload error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to upload file'
      })
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('jbiddulph')
      .getPublicUrl(data.path)
    
    return {
      success: true,
      data: {
        path: data.path,
        url: urlData.publicUrl,
        fileName: file.name,
        size: file.data.length,
        type: file.type
      }
    }
    
  } catch (error) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to upload file'
    })
  }
})
