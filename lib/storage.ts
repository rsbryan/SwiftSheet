import { supabase } from './supabase'

export async function uploadPDF(file: File, userId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `menus/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('menus')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage.from('menus').getPublicUrl(filePath)
    return data.publicUrl
  } catch (error) {
    console.error('Error uploading PDF:', error)
    return null
  }
}