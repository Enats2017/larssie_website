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
      {/* <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8"> */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 xl:pl-16 mt-10">

        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <div className="group relative w-full h-[280px] sm:h-[360px] md:h-[460px] lg:h-[566px] rounded-[15px] overflow-hidden cursor-pointer">
            <Image
              src={territoryImg}
              alt="Val Thorens trail runners"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-1 p-2 md:p-4 text-center md:text-left">
            <p className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-6 transition-all duration-300 hover:translate-x-1">
              The Territory
            </p>

            <h2 className="font-black text-3xl md:text-4xl text-white md:text-gray-900 tracking-wide mb-0">
              VAL THORENS
            </h2>

          <div className="flex items-center justify-center md:justify-start gap-3 text-white md:text-gray-700 text-sm md:text-base font-[500] italic mb-3">
            <Image src={mountainIcon} alt="Altitude" width={40} height={40} className="brightness-0 invert md:filter-none" />
            <span>
              <b>Altitude :<span className="md:hidden"> </span><br className="hidden md:inline" />2,300m to 3,200m</b>
            </span>
          </div>

            <div
              className="group flex flex-col gap-[15px] mb-6 text-white md:text-black"
              style={{
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                lineHeight: '28px',
              }}
            >
              <p>Val Thorens is located in the heart of the 3 Valleys, the world&apos;s largest ski area.</p>
              <p>A unique alpine destination with breathtaking panoramas all year round.</p>
            </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {/* Explore */}
            {/* <a
              href="/territory"
              className="
                group
                relative overflow-hidden
                flex items-center justify-between
                w-full sm:w-[264px]
                h-[52px]
                rounded-full
                bg-[#36A5DD]
                px-6
                text-white text-sm font-bold

                before:absolute before:inset-0
                before:bg-white before:rounded-full
                before:-translate-x-[110%]
                hover:before:translate-x-0
                before:transition-transform
                before:duration-[600ms]
                before:ease-in-out

                transition-colors duration-[600ms]
                hover:text-[#36A5DD]
              "
            >
              <span className="relative z-10">
                Explore The Territory
              </span>

              <span
                className="
                  relative z-10
                  flex h-8 w-12 items-center justify-center
                  rounded-full bg-white shrink-0
                  transition-all duration-300
                  group-hover:bg-[#36A5DD]
                "
              >
                <svg
                  className="
                    w-6 h-6 text-[#36A5DD]
                    transition-all duration-300
                    group-hover:text-white
                    group-hover:-rotate-45
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-5-5 5 5-5 5"
                  />
                </svg>
              </span>
            </a> */}
            <a
              href="/territory"
              className="
                relative overflow-hidden
                flex items-center justify-center
                w-full sm:w-[264px]
                h-[52px]
                rounded-full
                bg-[#36A5DD]
                border-2 border-[#36A5DD]
                px-6
                text-white text-sm font-bold

                before:absolute before:inset-0
                before:bg-white before:rounded-full
                before:-translate-x-[110%]
                hover:before:translate-x-0
                before:transition-transform
                before:duration-[600ms]
                before:ease-in-out

                transition-colors duration-[600ms]
                hover:text-[#36A5DD]
              "
            >
              <span className="relative z-10">
                Explore The Territory
              </span>
            </a>

            {/* FAQ */}
            <a
              href="/faq"
              className="
                relative overflow-hidden
                flex items-center justify-center
                w-full sm:w-[139px]
                h-[52px]
                rounded-full
                bg-white
                border-2 border-[#36A5DD]
                px-6
                text-[#36A5DD]
                text-sm font-bold

                before:absolute before:inset-0
                before:bg-[#36A5DD]
                before:rounded-full
                before:-translate-x-[110%]
                hover:before:translate-x-0
                before:transition-transform
                before:duration-[600ms]
                before:ease-in-out

                transition-colors duration-[600ms]
                hover:text-white
              "
            >
              <span className="relative z-10">
                FAQs
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