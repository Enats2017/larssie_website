'use client'

import { useState } from 'react'
import Image from 'next/image'
import support1 from '@/assets/support1.jpg'
import support2 from '@/assets/support2.jpg'

interface FaqItem {
    faqEventItemId: number
    question: string
    answer: string
    images: string[]
}

interface FaqEventSectionProps {
    items: FaqItem[]
}

export default function FaqEventSection({ items }: FaqEventSectionProps) {
    const [openId, setOpenId] = useState<number | null>(null)
    const [search, setSearch] = useState('')

    if (!items || items.length === 0) return null

    const toggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id))
    }

    const filteredItems = items.filter((item) =>
        item.question.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            {/* Top row: Solution eyebrow (left) + Search bar (right), same line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mb-4">
                {/* Solution — same font as InfoSection's tagline ("The Territory") */}
                <span className="font-playlist text-[28px] md:text-[40px] text-sky-500">
                    Solution
                </span>

                <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search a topic..."
                        className="w-full pl-12 pr-5 py-4 rounded-full border border-gray-200 outline-none focus:border-[#36A5DD] text-sm"
                    />
                </div>
            </div>

            {/* Heading, above the image */}
            <h2 className="font-black text-3xl md:text-4xl text-gray-900 tracking-wide mb-8">
                Frequently asked questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left: hardcoded images, reduced size */}
                <div className="flex flex-col gap-4 max-w-xs">
                    <div className="rounded-2xl overflow-hidden">
                        <Image src={support1} alt="Support" className="w-full h-auto object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                        <Image src={support2} alt="Support" className="w-full h-auto object-cover" />
                    </div>
                </div>

                {/* Right: accordion */}
                <div>
                    <div>
                        {filteredItems.map((item, idx) => {
                            const isOpen = openId === item.faqEventItemId
                            return (
                                <div key={item.faqEventItemId} className={`py-5 ${idx !== 0 ? 'border-t border-gray-200' : ''}`}>
                                    <button
                                        onClick={() => toggle(item.faqEventItemId)}
                                        className="w-full flex items-center justify-between text-left gap-4"
                                    >
                                        <span
                                            className="font-bold text-[15px]"
                                            style={{ color: '#0d2a4a' }}
                                            dangerouslySetInnerHTML={{ __html: item.question }}
                                        />
                                        <span
                                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors"
                                            style={
                                                isOpen
                                                    ? { backgroundColor: '#36A5DD', borderColor: '#36A5DD' }
                                                    : { backgroundColor: 'transparent', borderColor: '#cbd5e1' }
                                            }
                                        >
                                            <i
                                                className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} text-xs`}
                                                style={{ color: isOpen ? '#ffffff' : '#64748b' }}
                                            />
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-3 pr-10">
                                            <div
                                                className="text-gray-500 text-[15px] leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.answer }}
                                            />
                                            {item.images && item.images.length > 0 && (
                                                <div className="flex flex-wrap gap-3 mt-4">
                                                    {item.images.map((src, i) => (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img key={i} src={src} alt="" className="w-24 h-24 object-cover rounded-md" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {filteredItems.length === 0 && (
                            <p className="text-gray-400 text-sm py-6">No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}