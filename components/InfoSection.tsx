import Image from 'next/image'
import territoryImg from '@/assets/trek.png'
import mountainIcon from '@/assets/Mask group.png'
import amazonLogo from '@/assets/amazon.png'
import facebookLogo from '@/assets/facebook.png'
import goproLogo from '@/assets/gopro.png'
import northfaceLogo from '@/assets/face.png'
import nikeLogo from '@/assets/nike.png'

type Brand = {
  brand_id: number
  brand_name: string
  sort_order: number
}

type Props = {
  brands: Brand[]
}

const demoBrands = [
  { brand_id: 1, name: 'Amazon', logo: amazonLogo },
  { brand_id: 2, name: 'Facebook', logo: facebookLogo },
  { brand_id: 3, name: 'GoPro', logo: goproLogo },
  { brand_id: 4, name: 'The North Face', logo: northfaceLogo },
  { brand_id: 5, name: 'Nike', logo: nikeLogo },
]

export default function InfoSection({ brands }: Props) {
  return (
    <section className="w-full bg-[#0d2a4a] md:bg-white py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">

        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[280px] sm:h-[360px] md:h-[460px] lg:h-[566px] rounded-[15px] overflow-hidden">
            <Image
              src={territoryImg}
              alt="Val Thorens trail runners"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-1 p-2 md:p-4 text-center md:text-left">
          <p className="text-base md:text-2xl text-sky-500 italic font-light -mb-2">
            <b>The Territory</b>
          </p>

          <h2 className="font-black text-3xl md:text-4xl text-white md:text-gray-900 tracking-wide mb-3">
            VAL THORENS
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-3 text-white md:text-gray-700 text-sm md:text-base font-[500] italic mb-3">
            <Image src={mountainIcon} alt="Altitude" width={62} height={62} className="brightness-0 invert md:filter-none" />
            <span>
              <b>Altitude :<span className="md:hidden"> </span><br className="hidden md:inline" />2,300m to 3,200m</b>
            </span>
          </div>

          <div
            className="flex flex-col gap-[15px] mb-6 text-white md:text-black"
            style={{ fontWeight: 400, fontStyle: 'normal', fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: '30px' }}
          >
            <p>Val Thorens is located in the heart of the 3 Valleys, the world&apos;s largest ski area.</p>
            <p>A unique alpine destination with breathtaking panoramas all year round.</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="/territory"
              className="flex items-center justify-center gap-2 bg-[#36A5DD] hover:bg-sky-400
                        text-white text-sm font-bold
                        w-full sm:w-[264px] h-[52px]
                        rounded-full transition-colors shadow-lg"
            >
              Explore The Territory
              <span className="bg-white rounded-full p-1 flex items-center justify-center">
                <svg className="w-7 h-3.5 text-[#36A5DD]" fill="none" viewBox="0 0 32 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7l5 5-5 5M6 12h21" />
                </svg>
              </span>
            </a>

            <a
              href="/faq"
              className="flex items-center justify-center gap-2 bg-white md:bg-[#10899E] hover:bg-sky-400
                        text-[#0d2a4a] md:text-white text-sm font-bold
                        w-full sm:w-[139px] h-[52px]
                        rounded-full transition-colors shadow-lg"
            >
              FAQs
              <span className="bg-[#36A5DD] md:bg-white rounded-full p-1 flex items-center justify-center">
                <svg className="w-7 h-3.5 text-white md:text-[#0f7587]" fill="none" viewBox="0 0 32 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7l5 5-5 5M6 12h21" />
                </svg>
              </span>
            </a>
          </div>
        </div>

      </div>

      {/* Mobile-only: Proudly Supported By (animated marquee) */}
      <div className="max-w-7xl mx-auto md:hidden mt-8 pt-6 border-t border-white/20 text-center overflow-hidden">
        <p className="text-white/70 text-xs italic tracking-widest uppercase mb-4">
          Proudly Supported By
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-10 animate-marquee whitespace-nowrap w-max items-center">
            {[...demoBrands, ...demoBrands].map((brand, index) => (
              <div
                key={`${brand.brand_id}-${index}`}
                className="shrink-0 flex items-center justify-center h-8"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  height={32}
                  className="h-8 w-auto object-contain brightness-0 invert opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}