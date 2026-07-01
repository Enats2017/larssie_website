"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import mailImg from "@/assets/Mask group.png";

const ChevronUp = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
    </svg>
);

const ChevronDown = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

function ScrollInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        observer.observe(el); return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 md:-translate-x-16"}`}>
            {children}
        </div>
    );
}

function ScrollFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        observer.observe(el); return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 md:translate-y-8"}`}>
            {children}
        </div>
    );
}

interface SocialIcon { icon: string; link: string }
interface LinkItem { label: string; link: string }
interface DistItem { label: string; value: string }

interface FooterProps {
    footer: any
    brandLogo: string
    lang: string
    activeColor?: string
}

// Icon class → inline SVG map (only the 4 social icons used)
const ICON_SVG = (iconClass: string): React.ReactNode => (
    <i className={iconClass} style={{ fontSize: '18px' }} />
)

const DEFAULT_ICON_BG = 'bg-[#002248]'

const Footer = ({ footer, brandLogo, lang, activeColor = '#36A5DD' }: FooterProps) => {
    const [openSection, setOpenSection] = useState<string | null>("distance");
    const toggle = (key: string) => setOpenSection(prev => (prev === key ? null : key));

    const L = lang
    const f = footer

    // TikTok is highlighted with the active color, rest stay navy
    const ICON_HIGHLIGHT_STYLE: Record<string, React.CSSProperties> = {
        'fa-brands fa-tiktok': { backgroundColor: activeColor },
    }

    // ── Lang-aware values with fallbacks ──
    const distHeading = (L === 'nl' ? f?.distance_heading_nl : L === 'fr' ? f?.distance_heading_fr : null) || f?.distance_heading || 'Choose Your Distance'
    const quickHeading = (L === 'nl' ? f?.quick_heading_nl : L === 'fr' ? f?.quick_heading_fr : null) || f?.quick_heading || 'Quick Links'
    const engageHeading = (L === 'nl' ? f?.engage_heading_nl : L === 'fr' ? f?.engage_heading_fr : null) || f?.engage_heading || 'Engage With Us'
    const exploreHeading = (L === 'nl' ? f?.explore_heading_nl : L === 'fr' ? f?.explore_heading_fr : null) || f?.explore_heading || 'Explore With us'
    const ctaLine1 = (L === 'nl' ? f?.cta_line1_nl : L === 'fr' ? f?.cta_line1_fr : null) || f?.cta_line1 || 'SEE YOU AT'
    const ctaLine2 = (L === 'nl' ? f?.cta_line2_nl : L === 'fr' ? f?.cta_line2_fr : null) || f?.cta_line2 || 'THE START LINE'
    const registerText = (L === 'nl' ? f?.register_text_nl : L === 'fr' ? f?.register_text_fr : null) || f?.register_text || 'Register Now'
    const memberText = (L === 'nl' ? f?.member_text_nl : L === 'fr' ? f?.member_text_fr : null) || f?.member_text || 'Become Member'
    const mailLabel = (L === 'nl' ? f?.mail_label_nl : L === 'fr' ? f?.mail_label_fr : null) || f?.mail_label || 'Mail Us:'
    const mailEmail = f?.mail_email || ''
    const copyright = (L === 'nl' ? f?.copyright_text_nl : L === 'fr' ? f?.copyright_text_fr : null) || f?.copyright_text || `© ${new Date().getFullYear()} Trail Running. All Rights Reserved.`
    const registerLink = f?.register_link || '#'
    const memberLink = f?.member_link || '#'

    // ── JSON fields ──
    const socialIcons: SocialIcon[] = Array.isArray(f?.social_icons) ? f.social_icons : []
    const distanceItems: DistItem[] = Array.isArray(f?.distance_items) ? f.distance_items : []
    const quickItems: LinkItem[] = Array.isArray(f?.quick_items) ? f.quick_items : []
    const engageItems: LinkItem[] = Array.isArray(f?.engage_items) ? f.engage_items : []
    const exploreItems: LinkItem[] = Array.isArray(f?.explore_items) ? f.explore_items : []

    // ── Mobile accordion sections ──
    const accordionSections = [
        { key: 'distance', label: distHeading, items: distanceItems.map(d => ({ label: `${d.label} / ${d.value}`, link: '#' })), animDelay: 100 },
        { key: 'links', label: quickHeading, items: quickItems, animDelay: 200 },
        { key: 'engage', label: engageHeading, items: engageItems, animDelay: 300 },
        { key: 'explore', label: exploreHeading, items: exploreItems, animDelay: 400 },
    ]

    return (
        <footer className="w-full font-poppins">

            {/* ── MAIN FOOTER ── */}
            <div className="bg-white py-10 md:py-12 xl:pl-16">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10">

                    {/* ── DESKTOP GRID (lg+) ── */}
                    <div className="hidden lg:grid w-full grid-cols-[200px_1px_auto_1px_auto_auto] gap-y-10 gap-x-6 items-start">

                        {/* Brand + Social */}
                        <ScrollFadeUp delay={0}>
                            <div className="flex flex-col gap-4 items-start">
                                {brandLogo && (
                                    <img
                                        src={brandLogo}
                                        alt="Brand Logo"
                                        style={{ height: 80, width: 200, objectFit: 'contain', background: 'dimgray', borderRadius: '9px' }}
                                    />
                                )}
                                <p className="text-[#002248] font-bold italic text-[16px] leading-none">Follow Us on:</p>
                                <div className="flex flex-row items-center gap-3">
                                    {socialIcons.map((s, i) => (
                                        <a key={i} href={s.link || '#'} aria-label={s.icon}
                                            className={`w-[43px] h-[43px] rounded-full ${ICON_HIGHLIGHT_STYLE[s.icon] ? '' : DEFAULT_ICON_BG} flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0`}
                                            style={ICON_HIGHLIGHT_STYLE[s.icon]}>
                                            {ICON_SVG(s.icon)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </ScrollFadeUp>

                        <div className="w-px bg-white self-stretch" />

                        {/* Choose Your Distance */}
                        <ScrollInLeft delay={100}>
                            <div className="flex flex-col gap-3 items-start">
                                <h3 className="font-bold text-[17px] leading-none" style={{ color: activeColor }}>{distHeading}</h3>
                                <ul className="flex flex-col gap-[10px] items-start">
                                    {distanceItems.map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href="#"
                                                className="text-[#002248] transition-colors text-[14px] font-semibold leading-none hover:[color:var(--active-color)]"
                                                style={{ '--active-color': activeColor } as React.CSSProperties}
                                            >
                                                {item.label} / {item.value}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollInLeft>

                        <div className="hidden lg:block w-px self-stretch" style={{ backgroundColor: `${activeColor}66` }} />

                        {/* Quick Links */}
                        <ScrollInLeft delay={200}>
                            <div className="flex flex-col gap-3 items-start">
                                <h3 className="font-bold text-[17px] leading-none" style={{ color: activeColor }}>{quickHeading}</h3>
                                <ul className="flex flex-col gap-[10px] items-start">
                                    {quickItems.map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href={item.link || '#'}
                                                className="text-[#002248] transition-colors text-[14px] font-semibold leading-none hover:[color:var(--active-color)]"
                                                style={{ '--active-color': activeColor } as React.CSSProperties}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollInLeft>

                        {/* Engage + Explore */}
                        <ScrollInLeft delay={300}>
                            <div className="flex flex-col gap-8 items-start">
                                <div className="flex flex-col gap-3 items-start w-full">
                                    <h3 className="font-bold text-[17px] leading-none" style={{ color: activeColor }}>{engageHeading}</h3>
                                    <ul className="flex flex-col gap-[10px] items-start">
                                        {engageItems.map((item, i) => (
                                            <li key={i}>
                                                <a
                                                    href={item.link || '#'}
                                                    className="text-[#002248] transition-colors text-[14px] font-semibold leading-none hover:[color:var(--active-color)]"
                                                    style={{ '--active-color': activeColor } as React.CSSProperties}
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3 items-start w-full">
                                    <h3 className="font-bold text-[17px] leading-none" style={{ color: activeColor }}>{exploreHeading}</h3>
                                    <ul className="flex flex-col gap-[10px] items-start">
                                        {exploreItems.map((item, i) => (
                                            <li key={i}>
                                                <a
                                                    href={item.link || '#'}
                                                    className="text-[#002248] transition-colors text-[14px] font-semibold leading-none hover:[color:var(--active-color)]"
                                                    style={{ '--active-color': activeColor } as React.CSSProperties}
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollInLeft>

                    </div>

                    {/* ── MOBILE LAYOUT (< lg) ── */}
                    <div className="lg:hidden flex flex-col">

                        {/* Brand + Social */}
                        <ScrollFadeUp delay={0}>
                            <div className="flex flex-col gap-4 items-start pb-4 border-b border-gray-200">
                                {brandLogo && (
                                    <img
                                        src={brandLogo}
                                        alt="Brand Logo"
                                       style={{ height: 80, width: 200, objectFit: 'contain', background: 'dimgray', borderRadius: '9px' }}
                                    />
                                )}
                                <p className="text-[#002248] font-bold italic text-[16px] leading-none">Follow Us on:</p>
                                <div className="flex flex-row items-center gap-3">
                                    {socialIcons.map((s, i) => (
                                        <a key={i} href={s.link || '#'} aria-label={s.icon}
                                            className={`w-[43px] h-[43px] rounded-full ${ICON_HIGHLIGHT_STYLE[s.icon] ? '' : DEFAULT_ICON_BG} flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0`}
                                            style={ICON_HIGHLIGHT_STYLE[s.icon]}>
                                            {ICON_SVG(s.icon)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </ScrollFadeUp>

                        {/* Accordion */}
                        {accordionSections.map(({ key, label, items, animDelay }, idx) => (
                            <ScrollInLeft key={key} delay={animDelay}>
                                <div>
                                    <button
                                        className={`w-full flex items-center justify-between py-4 cursor-pointer ${idx === 0 ? "" : "border-t border-gray-200"}`}
                                        onClick={() => toggle(key)}
                                        aria-expanded={openSection === key}
                                    >
                                        <h3 className="font-bold text-[17px] leading-none" style={{ color: activeColor }}>{label}</h3>
                                        <span style={{ color: activeColor }}>
                                            {openSection === key ? <ChevronUp /> : <ChevronDown />}
                                        </span>
                                    </button>
                                    {openSection === key && (
                                        <ul className="flex flex-col gap-[10px] items-start pb-4">
                                            {items.map((item, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={item.link || '#'}
                                                        className="text-[#002248] transition-colors text-[14px] font-semibold leading-none hover:[color:var(--active-color)]"
                                                        style={{ '--active-color': activeColor } as React.CSSProperties}
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </ScrollInLeft>
                        ))}

                    </div>
                </div>
            </div>

            {/* ── CTA BAR ── */}
            <div
                className="lg:bg-white lg:border-t lg:border-gray-200 py-6 mx-4 lg:mx-0 rounded-2xl lg:rounded-none mb-4 lg:mb-0 xl:pl-16 bg-[var(--cta-bg)]"
                style={{ '--cta-bg': activeColor } as React.CSSProperties}
            >
                <div className="max-w-[1280px] mx-auto px-6 md:px-10">
                    <ScrollFadeUp delay={0}>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] items-center gap-5 lg:gap-12">

                            {/* Left Text */}
                            <p
                                className="text-white lg:[color:var(--active-color)] font-black uppercase leading-tight text-[clamp(22px,3vw,36px)] text-left"
                                style={{ '--active-color': activeColor } as React.CSSProperties}
                            >
                                {ctaLine1}
                                <br />
                                {ctaLine2}
                            </p>

                            {/* Buttons */}
                            <ScrollInLeft delay={100}>
                                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">

                                    {/* Register Now */}
                                    <a
                                        href={registerLink}
                                        className="
                                            group relative overflow-hidden
                                            inline-flex items-center justify-center
                                            bg-white
                                            font-bold rounded-full px-8 py-4 text-[17px] whitespace-nowrap
                                            border-2
                                            transition-colors duration-[600ms]
                                        "
                                        style={{
                                            color: activeColor,
                                            borderColor: activeColor,
                                        }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeColor }}
                                    >
                                        <span
                                            className="absolute inset-0 rounded-full -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-[600ms] ease-in-out"
                                            style={{ backgroundColor: activeColor }}
                                            aria-hidden="true"
                                        />
                                        <span className="relative z-10">{registerText}</span>
                                    </a>

                                    {/* Become Member */}
                                    <a
                                        href={memberLink}
                                        className="
                                            relative overflow-hidden
                                            inline-flex items-center justify-center
                                            bg-[#002248] text-white
                                            border-2 border-[#002248]
                                            font-bold rounded-full px-8 py-4 text-[17px] whitespace-nowrap
                                            before:absolute before:inset-0 before:bg-white
                                            before:rounded-full before:-translate-x-[110%]
                                            hover:before:translate-x-0 before:transition-transform
                                            before:duration-[600ms] before:ease-in-out
                                            transition-colors duration-[600ms]
                                            hover:text-[#002248]
                                        "
                                    >
                                        <span className="relative z-10">{memberText}</span>
                                    </a>

                                </div>
                            </ScrollInLeft>

                            {/* Mail Section */}
                            <ScrollInLeft delay={200}>
                                <div className="flex items-center gap-2 lg:gap-3 lg:justify-end">
                                    <Image
                                        src={mailImg}
                                        alt="Mail Us"
                                        width={40}
                                        height={40}
                                        className="w-9 h-9 lg:w-11 lg:h-11 brightness-0 invert lg:brightness-100 lg:invert-0"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-white lg:text-[#002248] font-bold text-[15px] lg:text-[18px] leading-tight">
                                            {mailLabel}
                                        </span>
                                        {mailEmail && (
                                            <a
                                                href={`mailto:${mailEmail}`}
                                                className="text-white lg:[color:var(--active-color)] font-medium text-[12px] lg:text-[14px] leading-tight hover:underline"
                                                style={{ '--active-color': activeColor } as React.CSSProperties}
                                            >
                                                {mailEmail}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </ScrollInLeft>

                        </div>
                    </ScrollFadeUp>
                </div>
            </div>

            {/* ── COPYRIGHT BAR ── */}
            <ScrollFadeUp delay={0}>
                <div className="bg-white border-t border-gray-100 py-3 px-4">
                    <p className="text-[#002248] text-[14px] text-center">
                        {copyright}
                    </p>
                </div>
            </ScrollFadeUp>

        </footer>
    );
};

export default Footer;
