import Image from 'next/image'
import summerImg from '@/assets/rectangle1.png'
import docsImg from '@/assets/rectangle2.png'
import jacketIcon from '@/assets/cloths.png'
import pantsIcon from '@/assets/pant.png'
import glovesIcon from '@/assets/gloves.png'
import waterIcon from '@/assets/bottle.png'
import energyIcon from '@/assets/cane.png'
import shoesIcon from '@/assets/shoes.png'
import headlampIcon from '@/assets/power.png'
import polesIcon from '@/assets/sticks.png'
import gelsIcon from '@/assets/nutrition.png'
import creamIcon from '@/assets/antich.png'
import checkIcon from '@/assets/rightsign.png'
import shieldIcon from '@/assets/shield.png'

type GearItem = {
  id: number
  icon: any
  title: string
}

const mandatoryItems: GearItem[] = [
  { id: 1, icon: jacketIcon, title: 'Waterproof\nJacket with Hood' },
  { id: 2, icon: pantsIcon, title: 'Long Pants\nor Tights' },
  { id: 3, icon: glovesIcon, title: 'Gloves\nand Hat' },
  { id: 4, icon: waterIcon, title: 'Min. 1L\nWater' },
  { id: 5, icon: energyIcon, title: 'Energy Food\n& Drinks' },
]

const recommendedItems: GearItem[] = [
  { id: 1, icon: shoesIcon, title: 'Trail Running\nShoes' },
  { id: 2, icon: headlampIcon, title: 'Headlamp with\nSpare Battery' },
  { id: 3, icon: polesIcon, title: 'Trekking\nPoles' },
  { id: 4, icon: gelsIcon, title: 'Extra\nNutrition Gels' },
  { id: 5, icon: creamIcon, title: 'Anti-Chafing\nCream' },
]

export default function GearUpSection() {
  return (
    <section className="w-full bg-white py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">

          {/* LEFT COLUMN: Heading + Image Cards */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">

            <div>
              <h2 className="font-black text-3xl md:text-4xl text-[#0d2a4a] tracking-wide leading-tight">
                GEAR UP
              </h2>
              <p className="text-[#36A5DD] italic text-xl md:text-2xl font-light -mt-1">
                for the adventure
              </p>
            </div>

            {/* Card 1 */}
            <div className="relative w-full h-[160px] sm:h-[180px] rounded-xl overflow-hidden">
              <Image
                src={summerImg}
                alt="Summer at Trail Running"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <p className="text-white font-bold text-lg leading-tight">
                  Summer at<br />Trail Running
                </p>
                <span className="bg-white/90 rounded-full w-10 h-6 flex items-center justify-center shadow-sm">
                  <svg
                    className="w-7 h-4 text-[#36A5DD]"
                    fill="none"
                    viewBox="0 0 32 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7l5 5-5 5M6 12h21" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full h-[160px] sm:h-[180px] rounded-xl overflow-hidden">
              <Image
                src={docsImg}
                alt="Documentation and brochures"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <p className="text-white font-bold text-lg leading-tight">
                  Documentation<br />and brochures
                </p>
                <span className="bg-white/90 rounded-full w-10 h-6 flex items-center justify-center shadow-sm">
                  <svg
                    className="w-7 h-4 text-[#36A5DD]"
                    fill="none"
                    viewBox="0 0 32 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7l5 5-5 5M6 12h21" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* MANDATORY EQUIPMENT */}
          <div className="w-full md:w-1/3 md:border-r md:border-cyan-200 md:pr-8">
            <div className="flex items-center gap-2 md:justify-between md:items-start mb-2 md:w-full">
              <Image
                src={checkIcon}
                alt="check"
                width={36}
                height={36}
                className="order-first md:order-last w-6 h-6 md:w-10 md:h-10"
              />
              <h3 className="font-extrabold text-lg text-[#36A5DD] leading-snug">
                Mandatory<span className="md:hidden"> </span><br className="hidden md:inline" />Equipment
              </h3>
            </div>
            <p className="font-[600] text-gray-600 text-sm mb-4">
              All gear listed below must be<br />carried throughout the event.
            </p>

            <div className="flex flex-col">
              {mandatoryItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-4">
                    <Image src={item.icon} alt={item.title} width={32} height={32} />
                    <div>
                      {/* Mobile: one line */}
                      <p className="md:hidden font-semibold text-[#36A5DD] text-base leading-tight">
                        {item.title.replace('\n', ' ')}
                      </p>
                      {/* Desktop: two lines */}
                      <p className="hidden md:block font-semibold text-[#36A5DD] text-base leading-tight" style={{ whiteSpace: 'pre-line' }}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                  {index < mandatoryItems.length - 1 && (
                    <div className="h-px bg-gray-200 w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED EQUIPMENT */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 md:justify-between md:items-start mb-2 md:w-full">
              <Image
                src={shieldIcon}
                alt="shield"
                width={36}
                height={36}
                className="order-first md:order-last w-6 h-6 md:w-10 md:h-10"
              />
              <h3 className="font-extrabold text-lg text-[#0d2a4a] leading-snug">
                Recommended<span className="md:hidden"> </span><br className="hidden md:inline" />Equipment
              </h3>
            </div>
            <p className="font-[600] text-gray-600 text-sm mb-4">
              The gear listed below can help<br />improve your experience.
            </p>

            <div className="flex flex-col">
              {recommendedItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-4">
                    <Image src={item.icon} alt={item.title} width={32} height={32} />
                    <div>
                      <p className="md:hidden font-semibold text-[#0d2a4a] text-base leading-tight">
                        {item.title.replace('\n', ' ')}
                      </p>
                      <p className="hidden md:block font-semibold text-[#0d2a4a] text-base leading-tight" style={{ whiteSpace: 'pre-line' }}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                  {index < recommendedItems.length - 1 && (
                    <div className="h-px bg-gray-200 w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}