"use client";

import Image from "next/image";
import { useState } from "react";
import arrowImg from "@/assets/Group 27.png";
import mailImg from "@/assets/Mask group.png";
import arrowBlue from "@/assets/Group 27_blue.png";
import logoImg from "@/assets/2eae9c879606bbbcc759.png";

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

const Footer = () => {
    const [openSection, setOpenSection] = useState<string | null>("distance");

    const toggle = (key: string) =>
        setOpenSection(prev => (prev === key ? null : key));

    return (
        <footer className="w-full font-poppins">

            {/* ── MAIN FOOTER ── */}
            <div className="bg-white py-10 md:py-12 xl:pl-16">
              <div className="max-w-[1280px] mx-auto px-6 md:px-10">

                {/* ── DESKTOP GRID (lg+) ── */}
                <div className="hidden lg:grid w-full grid-cols-[auto_1px_auto_1px_auto_auto] gap-y-10 gap-x-6 items-start">

                    {/* Brand + Social */}
                    <div className="flex flex-col gap-4 items-start">
                  <Image
  src={logoImg}
  alt="Trail Running"
  width={200}
  height={80}
  style={{ filter: 'brightness(0)' }}
/>
                        <p className="text-[#002248] font-bold italic text-[16px] leading-none">Follow Us on:</p>
                        <div className="flex flex-row items-center gap-3">
                            <a href="#" aria-label="Instagram" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" /></svg>
                            </a>
                            <a href="#" aria-label="TikTok" className="w-[43px] h-[43px] rounded-full bg-[#36A5DD] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.14a4.85 4.85 0 0 1-1-.45z" /></svg>
                            </a>
                            <a href="#" aria-label="YouTube" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.9C6.8 19 12 19 12 19s4.4 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.3l5.5 2.6-5.5 2.6z" /></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className="w-px bg-white self-stretch" />

                    {/* Choose Your Distance */}
                    <div className="flex flex-col gap-3 items-start">
                        <h3 className="text-[#36A5DD] font-bold text-[17px] leading-none">Choose Your Distance</h3>
                        <ul className="flex flex-col gap-[10px] items-start">
                            {["50K / 50KM D+", "25K / 26KM D+", "15K / 35KM D+", "10K / 23KM D+", "21K / 1,180M D+", "32K / 1,740M D+", "42K / 2,250M D+"].map((item) => (
                                <li key={item}><a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[14px] font-semibold leading-none">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden lg:block w-px bg-[#36A5DD]/40 self-stretch" />

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3 items-start">
                        <h3 className="text-[#36A5DD] font-bold text-[17px] leading-none">Quick Links</h3>
                        <ul className="flex flex-col gap-[10px] items-start">
                            {["Discover", "Events", "Community", "Faq", "Privacy Policy", "Contact Us"].map((item) => (
                                <li key={item}><a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[14px] font-semibold leading-none">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Engage + Explore */}
                    <div className="flex flex-col gap-8 items-start">
                        <div className="flex flex-col gap-3 items-start w-full">
                            <h3 className="text-[#36A5DD] font-bold text-[17px] leading-none">Engage With Us</h3>
                            <ul className="flex flex-col gap-[10px] items-start">
                                {["Become a volunteer", "Become a partner/sponsor", "Become ambassador", "Become member"].map((item) => (
                                    <li key={item}><a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[14px] font-semibold leading-none">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 items-start w-full">
                            <h3 className="text-[#36A5DD] font-bold text-[17px] leading-none">Explore With us</h3>
                            <ul className="flex flex-col gap-[10px] items-start">
                                {["Whet to do", "Where to sleep"].map((item) => (
                                    <li key={item}><a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[14px] font-semibold leading-none">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* ── MOBILE LAYOUT (< lg) ── */}
                <div className="lg:hidden flex flex-col">

                    {/* Brand + Social */}
                    <div className="flex flex-col gap-4 items-start pb-4 border-b border-gray-200">
                        <Image src={logoImg} alt="Trail Running" width={200} height={80} />
                        <p className="text-[#002248] font-bold italic text-[16px] leading-none">Follow Us on:</p>
                        <div className="flex flex-row items-center gap-3">
                            <a href="#" aria-label="Instagram" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" /></svg>
                            </a>
                            <a href="#" aria-label="TikTok" className="w-[43px] h-[43px] rounded-full bg-[#36A5DD] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.14a4.85 4.85 0 0 1-1-.45z" /></svg>
                            </a>
                            <a href="#" aria-label="YouTube" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.9C6.8 19 12 19 12 19s4.4 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.3l5.5 2.6-5.5 2.6z" /></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Accordion rows — all flat siblings, identical structure */}
                    {[
                        {
                            key: "distance",
                            label: "Choose Your Distance",
                            items: ["50K / 50KM D+", "25K / 26KM D+", "15K / 35KM D+", "10K / 23KM D+", "21K / 1,180M D+", "32K / 1,740M D+", "42K / 2,250M D+"],
                        },
                        {
                            key: "links",
                            label: "Quick Links",
                            items: ["Discover", "Events", "Community", "Faq", "Privacy Policy", "Contact Us"],
                        },
                        {
                            key: "engage",
                            label: "Engage With Us",
                            items: ["Become a volunteer", "Become a partner/sponsor", "Become ambassador", "Become member"],
                        },
                        {
                            key: "explore",
                            label: "Explore With us",
                            items: ["Whet to do", "Where to sleep"],
                        },
                    ].map(({ key, label, items }, idx) => (
                        <div key={key}>
                            <button
                                className={`w-full flex items-center justify-between py-4 cursor-pointer ${idx === 0 ? "" : "border-t border-gray-200"}`}
                                onClick={() => toggle(key)}
                                aria-expanded={openSection === key}
                            >
                                <h3 className="text-[#36A5DD] font-bold text-[17px] leading-none">{label}</h3>
                                <span className="text-[#36A5DD]">
                                    {openSection === key ? <ChevronUp /> : <ChevronDown />}
                                </span>
                            </button>
                            {openSection === key && (
                                <ul className="flex flex-col gap-[10px] items-start pb-4">
                                    {items.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[14px] font-semibold leading-none">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                </div>
              </div>
            </div>

            {/* ── CTA BAR ── */}
						{/* ── CTA BAR ── */}
						<div className="bg-[#36A5DD] lg:bg-white lg:border-t lg:border-gray-200 py-6 mx-4 lg:mx-0 rounded-2xl lg:rounded-none mb-4 lg:mb-0 xl:pl-16">
							<div className="max-w-[1280px] mx-auto px-6 md:px-10">
								<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] items-center gap-5 lg:gap-12">

									{/* Left Text */}
									<p className="text-white lg:text-[#36A5DD] font-black uppercase leading-tight text-[clamp(22px,3vw,36px)] text-left">
										SEE YOU AT
										<br />
										THE START LINE
									</p>

									{/* Buttons */}
									<div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">

										{/* Register Now */}
									<a
										href="#"
										className="
											relative overflow-hidden
											inline-flex items-center justify-center

											bg-white lg:bg-[#36A5DD]
											text-[#36A5DD] lg:text-white

											border-2 border-[#36A5DD]

											font-bold
											rounded-full
											px-8 py-4
											text-[17px]
											whitespace-nowrap

											before:absolute before:inset-0
											before:bg-[#36A5DD] lg:before:bg-white
											before:rounded-full
											before:-translate-x-[110%]
											hover:before:translate-x-0
											before:transition-transform
											before:duration-[600ms]
											before:ease-in-out

											transition-colors duration-[600ms]
											hover:text-white
											lg:hover:text-[#36A5DD]
										"
									>
										<span className="relative z-10">
											Register Now
										</span>
									</a>

										{/* Become Member */}
									<a
										href="#"
										className="
											relative overflow-hidden
											inline-flex items-center justify-center

											bg-[#002248]
											text-white

											border-2 border-[#002248]

											font-bold
											rounded-full
											px-8 py-4
											text-[17px]
											whitespace-nowrap

											before:absolute before:inset-0
											before:bg-white
											before:rounded-full
											before:-translate-x-[110%]
											hover:before:translate-x-0
											before:transition-transform
											before:duration-[600ms]
											before:ease-in-out

											transition-colors duration-[600ms]
											hover:text-[#002248]
										"
									>
										<span className="relative z-10">
											Become Member
										</span>
									</a>

									</div>

									{/* Mail Section */}
									{/* Mail Section */}
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
															Mail Us:
													</span>
													<a
															href="mailto:info@trailrunning.com"
															className="text-white lg:text-[#36A5DD] font-medium text-[12px] lg:text-[14px] leading-tight hover:underline"
													>
															info@trailrunning.com
													</a>
											</div>
									</div>

								</div>
							</div>
						</div>

            {/* ── COPYRIGHT BAR ── */}
            <div className="bg-white border-t border-gray-100 py-3 px-4">
                <p className="text-[#002248] text-[14px] text-center">
                    © 2026 Trail Running. All Rights Reserved.
                </p>
            </div>

        </footer>
    );
};

export default Footer;