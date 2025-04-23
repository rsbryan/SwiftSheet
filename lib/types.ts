export interface Profile {
    id: string
    restaurant_name: string | null
    address: string | null
    phone: string | null
    website: string | null
    description: string | null
    created_at: string
    updated_at: string
  }
  
  export interface Menu {
    id: string
    user_id: string
    title: string
    description: string | null
    pdf_url: string
    is_active: boolean
    created_at: string
    updated_at: string
  }