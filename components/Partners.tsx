"use client";

import React from "react";

const partnersStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap');

  .partners-section {
    background: #f0f9ff;
    padding: 64px 20px;
  }

  .partners-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .partners-eyebrow {
    color: #0284c7;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 12px;
  }

  .partners-title {
    font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
    font-weight: 800;
    font-size: clamp(24px, 3vw, 36px);
    letter-spacing: 0.04em;
    color: #0d2a4a;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 16px 0;
  }

  .partners-divider {
    width: 64px;
    height: 4px;
    background: #38bdf8;
    border-radius: 9999px;
    margin: 0 auto 48px;
  }

  .partners-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 24px;
    align-items: center;
    width: 100%;
  }

  .partner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 16px;
    border-radius: 16px;
    background: white;
    border: 1px solid #e0f2fe;
    box-shadow: 0 2px 12px rgba(13,42,74,0.06);
    opacity: 0.7;
    filter: grayscale(100%);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .partner-item:hover {
    opacity: 1;
    filter: grayscale(0%);
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(2,132,199,0.18);
    border-color: #7dd3fc;
    background: #f0f9ff;
  }

  .partner-logo {
    width: 100%;
    height: auto;
    max-height: 60px;
    object-fit: contain;
  }

  .logo-svg {
    width: 100%;
    max-width: 160px;
    height: auto;
    max-height: 60px;
  }

  /* SVG text color: navy by default, sky on hover */
  .partner-item svg text,
  .partner-item svg circle,
  .partner-item svg path {
    transition: all 0.3s ease;
  }

  .partner-item svg text {
    fill: #0d2a4a;
  }

  .partner-item svg circle[stroke="white"] {
    stroke: #0d2a4a;
  }

  .partner-item svg circle[fill="white"] {
    fill: #0d2a4a;
  }

  .partner-item:hover svg text {
    fill: #0284c7;
  }

  .partner-item:hover svg circle[stroke="white"],
  .partner-item:hover svg circle[stroke="#0d2a4a"] {
    stroke: #0284c7;
  }

  .partner-item:hover svg circle[fill="white"],
  .partner-item:hover svg circle[fill="#0d2a4a"] {
    fill: #0284c7;
  }

  @media (max-width: 992px) {
    .partners-section { padding: 48px 24px; }
    .partners-row {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }

  @media (max-width: 640px) {
    .partners-section { padding: 40px 18px; }
    .partners-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .partner-item { padding: 16px 12px; }
    .logo-svg { width: 120px; height: 44px; }
  }
`;

const OmanLogo = (): React.ReactElement => (
  <svg viewBox="0 0 160 60" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="52" cy="30" r="22" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="52" cy="30" r="15" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="52" cy="30" r="8" fill="white" opacity="0.3" />
    <text x="76" y="18" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="9" fontWeight="600" fill="white" letterSpacing="1">Experience</text>
    <text x="76" y="34" fontFamily="'Arial', sans-serif" fontSize="11" fontWeight="700" fill="white">عُمان</text>
    <text x="76" y="48" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="13" fontWeight="800" fill="white" letterSpacing="2">OMAN</text>
  </svg>
);

const HokaLogo = (): React.ReactElement => (
  <svg viewBox="0 0 160 60" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="8" y="36" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="32" fontWeight="900" fill="white" letterSpacing="-1">HOKA</text>
    <circle cx="57" cy="24" r="5" fill="#e0f2fe" />
    <circle cx="57" cy="24" r="3" fill="white" />
    <text x="8" y="50" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="10" fontWeight="700" fill="white" letterSpacing="2">FLY HUMAN FLY</text>
  </svg>
);

const RokaLogo = (): React.ReactElement => (
  <svg viewBox="0 0 120 50" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="8" y="36" fontFamily="'Georgia', serif" fontSize="30" fontWeight="400" fill="white" letterSpacing="4">R</text>
    <text x="30" y="36" fontFamily="'Georgia', serif" fontSize="30" fontWeight="400" fill="white" letterSpacing="4">Ō</text>
    <text x="57" y="36" fontFamily="'Georgia', serif" fontSize="30" fontWeight="400" fill="white" letterSpacing="4">KA</text>
    <circle cx="110" cy="33" r="2.5" fill="white" />
  </svg>
);

const BreitlingLogo = (): React.ReactElement => (
  <svg viewBox="0 0 130 60" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="8" y="28" fontFamily="'Georgia', 'Times New Roman', serif" fontSize="22" fontStyle="italic" fontWeight="400" fill="white">B</text>
    <text x="8" y="44" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="2">BREITLING</text>
    <text x="30" y="56" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="10" fontWeight="500" fill="white" letterSpacing="2">1884</text>
  </svg>
);

const Ag1Logo = (): React.ReactElement => (
  <svg viewBox="0 0 100 50" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="40" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="40" fontWeight="900" fill="white" letterSpacing="-1">AG1</text>
    <text x="83" y="18" fontFamily="Arial" fontSize="10" fill="white">®</text>
  </svg>
);

interface Partner {
  id: number;
  name: string;
  Logo: () => React.ReactElement;
}

const partners: Partner[] = [
  { id: 1,  name: "Experience Oman", Logo: OmanLogo },
  { id: 2,  name: "HOKA",            Logo: HokaLogo },
  { id: 3,  name: "RŌKA",            Logo: RokaLogo },
  { id: 4,  name: "Breitling",       Logo: BreitlingLogo },
  { id: 5,  name: "AG1",             Logo: Ag1Logo },
];

export default function Partners(): React.ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: partnersStyles }} />
      <section className="partners-section">
        <div className="partners-container">

          {/* Heading */}
          <p className="partners-eyebrow">Our Partners</p>
          <h2 className="partners-title">
            Global Premier &amp; Technical Partners
          </h2>
          <div className="partners-divider" />

          {/* Logos */}
          <div className="partners-row">
            {partners.map(({ id, name, Logo }) => (
              <div key={id} className="partner-item" title={name}>
                <Logo />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}