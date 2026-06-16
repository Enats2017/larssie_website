import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import TerritorySection from '@/components/TerritorySection'
import InfoSection from '@/components/InfoSection'
import GearUpSection from '@/components/GearUpSection'
import AidStations from '@/components/AidStation'
import TimelineSection from '@/components/TimelineSection'
import Footer from '@/components/Footer'

export default async function Page() {
  const [brands] = await Promise.all([
    prisma.brand.findMany({ orderBy: { sort_order: 'asc' } }),
  ])

  const menu = await prisma.menu.findFirst({
    orderBy: { menu_id: 'desc' },
    include: {
      tabs: {
        orderBy: { id: 'asc' },
        include: {
          fields: {
            orderBy: { sort_order: 'asc' },
          },
        },
      },
    },
    where: {
      tabs: {
        some: {
          fields: {
            some: {},
          },
        },
      },
    },
  })

  if (!menu) return <div>No menu found</div>

  const hero = await prisma.heroBuilder.findFirst({
    where: {
      brand_id: 2,
      event_id: 71,
      distance_id: 49,
    },
    orderBy: { hero_id: 'desc' },
  })

  if (!hero) return <div>No hero found</div>

  if (!hero) return <div>No hero found</div>

  return (
    <>
      <Navbar tabs={menu.tabs} brand_logo={menu.brand_logo} />
      <HeroSection menu={menu} hero={hero} />
      <TerritorySection />
      <InfoSection />
      <GearUpSection />
      <AidStations />
      <TimelineSection />
      <Footer />

    </>
  )
}