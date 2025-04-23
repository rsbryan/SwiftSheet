"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, Users, ArrowUpRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { type Menu } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export default function Dashboard() {
  const { user } = useAuth()
  const [menus, setMenus] = useState<Menu[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalViews, setTotalViews] = useState(0)

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return

      try {
        // Fetch menus
        const { data, error } = await supabase
          .from("menus")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (error) throw error
        
        setMenus(data || [])
        
        // For demo purposes, simulate view count
        setTotalViews(Math.floor(Math.random() * 1000))
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/menus">
            <Plus className="mr-2 h-4 w-4" /> Upload Menu
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menus.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Menus</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {menus.filter(menu => menu.is_active).length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Menus</CardTitle>
          <CardDescription>
            Your most recently uploaded menus
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading menus...</div>
          ) : menus.length > 0 ? (
            <div className="space-y-4">
              {menus.map((menu) => (
                <div key={menu.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{menu.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {formatDate(menu.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/menu/${menu.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/menus/${menu.id}`}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No menus uploaded yet</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/menus">Upload your first menu</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}