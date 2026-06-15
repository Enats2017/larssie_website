import Image from "next/image";
import arrowImg from "@/assets/Group 27.png";
import mailImg from "@/assets/Mask group.png";
import arrowBlue from "@/assets/Group 27_blue.png";


const Footer = () => {
    return (
        <footer className="w-full font-['Metropolis',sans-serif]">

            {/* ── MAIN FOOTER ── */}
            <div className="bg-white pl-[68px] pr-[20px] py-10 md:py-12">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1px_auto_1px_auto_auto] gap-y-10 gap-x-6 items-start">

                    {/* Brand + Social */}
                    <div className="flex flex-col gap-4 items-center sm:items-start sm:col-span-2 lg:col-span-1">
                        <div className="flex flex-col leading-none items-center sm:items-start">
                            <div className="flex items-center gap-2">
                                <span className="border-b-2 border-[#002248] w-8 inline-block mb-1" />
                                <span className="text-[#002248] uppercase font-black italic" style={{ letterSpacing: "0.2em", fontSize: "13px" }}>
                                    Trail
                                </span>
                                <span className="border-b-2 border-[#002248] w-8 inline-block mb-1" />
                            </div>
                            <span className="text-[#002248] font-black italic" style={{ fontSize: "clamp(38px,5vw,52px)", lineHeight: 1 }}>
                                Running
                            </span>
                        </div>

                        <p className="text-[#002248] font-bold italic text-[22px] leading-none text-center sm:text-left">
                            Follow Us on:
                        </p>

                        {/* Social Icons — untouched */}
                        <div className="flex flex-row items-center gap-3">
                            <a href="#" aria-label="Instagram"
                                className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="TikTok"
                                className="w-[43px] h-[43px] rounded-full bg-[#36A5DD] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.14a4.85 4.85 0 0 1-1-.45z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube"
                                className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.9C6.8 19 12 19 12 19s4.4 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.3l5.5 2.6-5.5 2.6z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Facebook"
                                className="w-[43px] h-[43px] rounded-full bg-[#002248] flex items-center justify-center text-white hover:opacity-80 transition-opacity shrink-0">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Vertical Divider (desktop only) */}
                    <div className="hidden lg:block w-px bg-white-200 self-stretch" />

                    {/* Choose Your Distance */}
                    <div className="flex flex-col gap-3 items-center sm:items-start">
                        <h3 className="text-[#36A5DD] font-bold text-[22px] leading-none text-center sm:text-left">
                            Choose Your Distance
                        </h3>
                        <ul className="flex flex-col gap-[10px] items-center sm:items-start">
                            {["50K / 50KM D+", "25K / 26KM D+", "15K / 35KM D+", "10K / 23KM D+", "21K / 1,180M D+", "32K / 1,740M D+", "42K / 2,250M D+"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[18px] font-semibold leading-none">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Vertical Divider (desktop only) */}
                    <div className="hidden lg:block w-px bg-blue-200 self-stretch" />

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3 items-center sm:items-start">
                        <h3 className="text-[#36A5DD] font-bold text-[22px] leading-none text-center sm:text-left">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-[10px] items-center sm:items-start">
                            {["Discover", "Events", "Community", "Faq", "Privacy Policy", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[18px] font-semibold leading-none">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Engage + Explore With Us */}
                    <div className="flex flex-col gap-8 items-center sm:items-start sm:col-span-2 lg:col-span-1">
                        <div className="flex flex-col gap-3 items-center sm:items-start w-full">
                            <h3 className="text-[#36A5DD] font-bold text-[22px] leading-none text-center sm:text-left">
                                Engage With Us
                            </h3>
                            <ul className="flex flex-col gap-[10px] items-center sm:items-start">
                                {["Become a volunteer", "Become a partner/sponsor", "Become ambassador", "Become member"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[18px] font-semibold leading-none">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 items-center sm:items-start w-full">
                            <h3 className="text-[#36A5DD] font-bold text-[22px] leading-none text-center sm:text-left">
                                Explore With us
                            </h3>
                            <ul className="flex flex-col gap-[10px] items-center sm:items-start">
                                {["Whet to do", "Where to sleep"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-[#002248] hover:text-[#36A5DD] transition-colors text-[18px] font-semibold leading-none">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── CTA BAR ── */}
            <div className="bg-white border-t border-gray-200 pl-[68px] pr-[20px] py-6">
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* Headline */}
                    <p className="text-[#36A5DD] font-black uppercase leading-tight text-[clamp(24px,4vw,36px)] text-center md:text-left">
                        SEE YOU AT<br />THE START LINE
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <a href="#"
                            className="inline-flex items-center gap-2 bg-[#36A5DD] text-white font-bold rounded-full px-6 py-3 hover:opacity-90 transition-opacity text-[15px] whitespace-nowrap">
                            Register Now
                            <Image src={arrowBlue} alt="arrow" width={26} height={26} />

                        </a>
                        <a href="#"
                            className="inline-flex items-center gap-2 bg-[#002248] text-white font-bold rounded-full px-6 py-3 hover:bg-[#001530] transition-colors text-[15px] whitespace-nowrap">
                            Become Member
                           <Image src={arrowImg} alt="arrow" width={26} height={26} />
                        </a>
                    </div>

                    {/* Mail Us */}
                    <div className="flex flex-row items-center justify-center md:justify-start gap-3">
                       <Image src={mailImg} alt="Mail Us" width={50} height={50} />
                        <div className="flex flex-col">
                            <span className="text-[#002248] font-bold text-[22px] leading-tight">Mail Us:</span>
                            <a href="mailto:info@trailrunning.com"
                                className="text-[#36A5DD] font-medium text-[18px] leading-tight hover:underline break-all">
                                info@trailrunning.com
                            </a>
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