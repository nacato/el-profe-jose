import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { AdminDashboard } from '@/components/sections/AdminDashboard'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      <Navbar />
      <div className="pt-10 w-full">
        <AdminDashboard />
      </div>
      <MobileNav />
    </main>
  )
}