import { prisma } from '@/lib/prisma'
import NavbarBrand from '@/components/NavbarBrand'
import Hero from '@/components/Hero'
import WorldMap from '@/components/WorldMap'
import EventsCards from '@/components/EventsCards'
// import Partners from '@/components/Partners'
import SideDock from '@/components/SideDock'



const BRAND_ID = 1
const EVENT_ID = 78
const BASE_URL = 'http://91.99.229.154'
// const BASE_URL = 'http://localhost'

function resolveUrl(path: string | null | undefined): string | null {
    if (!path) return null
    if (path.startsWith('http') || path.startsWith('//')) return path
    return `${BASE_URL}${path}`
}

function parseJson<T>(raw: unknown, fallback: T): T {
    if (!raw) return fallback
    if (typeof raw !== 'string') {
        try { return raw as T } catch { return fallback }
    }
    try { return JSON.parse(raw) as T } catch { return fallback }
}

export default async function BrandPage() {

    // ── Navbar ──────────────────────────────────────────────────────
    const menu = await prisma.menu.findFirst({
        where: { brand_id: BRAND_ID, event_id: EVENT_ID },
        orderBy: { menu_id: 'desc' },
        include: { tabs: { orderBy: { id: 'asc' } } },
    })

    if (!menu) return <div>No menu found</div>

    const tabIds = menu.tabs.map((tab) => tab.id)
    const allFields = await prisma.menuField.findMany({
        where: { menu_id: menu.menu_id, tab_id: { in: tabIds } },
        orderBy: [{ column: 'asc' }, { sort_order: 'asc' }],
    })

    const tabs = menu.tabs.map((tab) => ({
        ...tab,
        fields: allFields.filter((field) => field.tab_id === tab.id),
    }))

    // ── Hero ────────────────────────────────────────────────────────
    const heroData = await prisma.heroEventBuilder.findFirst({
        where: { brand_id: BRAND_ID, event_id: EVENT_ID },
    })

    const brand = await prisma.brand.findUnique({
        where: { brand_id: BRAND_ID },
    })

    const ctaButtons = parseJson<{ label: string; url?: string; link?: string; style?: 'primary' | 'secondary' }[]>(
        heroData?.cta_buttons,
        []
    )


    return (
        <div>
            <NavbarBrand
                tabs={tabs}
                brand_logo={menu.brand_logo}
                lang="en"
            />
            <Hero
                brand_name={brand?.brand_name ?? ''}
                description={heroData?.description ?? ''}
                cta_buttons={ctaButtons}
                bg_desktop={resolveUrl(heroData?.bg_desktop)}
            />
            <WorldMap />
            <EventsCards />
            {/* <Partners /> */}
        </div>
    )
}