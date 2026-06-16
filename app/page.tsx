import { prisma } from '@/lib/prisma'
import SideDock from '@/components/SideDock'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TerritorySection from '@/components/TerritorySection'
import InfoSection from '@/components/InfoSection'
import GearUpSection from '@/components/GearUpSection'
import AidStation from '@/components/AidStation'
import TimelineSection from '@/components/TimelineSection'
import Footer from '@/components/Footer'
import BrandsList from '@/components/BrandsList'

export default async function HomePage() {
  const brands = await prisma.brand.findMany({
    orderBy: { sort_order: 'asc' }
  })

  return (
    <div className="min-h-screen bg-[#e8f4fd]">
      <SideDock />
      <Navbar />
      <HeroSection />
      <TerritorySection />
      <InfoSection brands={brands} />
      <GearUpSection />
      <AidStation />       
      <TimelineSection />
      <Footer />
      <main >
        <div className="hidden md:block">
          {/* <BrandsList brands={brands} /> */}
        </div>
      </main>
    </div>
  )
}
