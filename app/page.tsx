import { prisma } from '@/lib/prisma'
import BrandsList from '@/components/BrandsList'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import SideDock from '@/components/SideDock'
import TerritorySection from '@/components/TerritorySection'
import Footer from '@/components/Footer'
import TimelineSection from '@/components/TimelineSection'

export default async function HomePage() {
  const brands = await prisma.brand.findMany({
    orderBy: { sort_order: 'asc' }
  })

  return (
    <div className="min-h-screen bg-[#e8f4fd]">
      <SideDock />
      <Navbar />
      <HeroSection />
      <TerritorySection />   {/* ← add here */}
      <TimelineSection />
      <Footer />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <BrandsList brands={brands} />
      </main>
    </div>
  )
}
