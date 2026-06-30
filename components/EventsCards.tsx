"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, RotateCw } from "lucide-react";

const responsiveStyles = `
  .filters-wrapper {
    max-width: 900px;
    margin: 0 auto 110px;
    position: relative;
  }
  .filter-outer-row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0;
  }
  .filter-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  /* ── Filter button: white slides in from left, text turns sky-blue ── */
  .filter-btn {
    position: relative;
    overflow: hidden;
    border-radius: 9999px;
    background: #36A5DD;
    width: 200px;
    padding: 18px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.08em;
    box-shadow: 0 4px 14px rgba(2,132,199,0.25);
    transition: color 0.6s ease-in-out, transform 0.2s, box-shadow 0.2s;
  }
  .filter-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    border-radius: 9999px;
    transform: translateX(-110%);
    transition: transform 0.6s ease-in-out;
    z-index: 1;
  }
  .filter-btn:hover::before,
  .filter-btn.active-filter::before { transform: translateX(0); }
  .filter-btn:hover,
  .filter-btn.active-filter { color: #36A5DD; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(54,165,221,0.35); }
  .filter-btn span, .filter-btn svg { position: relative; z-index: 2; }

  .reset-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 15px;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    letter-spacing: 0.08em;
    padding: 0 0 0 20px;
    white-space: nowrap;
  }
  .reset-btn:hover { color: #38bdf8; }

  .cards-grid {
    max-width: 1152px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  .dropdown-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  /* ── Option button: white slides in from left, text turns sky-blue ── */
  .option-btn {
    position: relative;
    overflow: hidden;
    clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
    background: #36A5DD;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 17px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    border: none;
    transition: color 0.6s ease-in-out;
  }
  .option-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    transform: translateX(-110%);
    transition: transform 0.6s ease-in-out;
    z-index: 1;
  }
  .option-btn:hover::before,
  .option-btn.selected::before { transform: translateX(0); }
  .option-btn:hover,
  .option-btn.selected { color: #36A5DD; }
  .option-btn span { position: relative; z-index: 2; }

  /* ── Region button: same sliding white effect ── */
  .region-btn {
    position: relative;
    overflow: hidden;
    clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
    background: #36A5DD;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 24px;
    gap: 14px;
    font-size: 20px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    border: none;
    transition: color 0.6s ease-in-out;
  }
  .region-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    transform: translateX(-110%);
    transition: transform 0.6s ease-in-out;
    z-index: 1;
  }
  .region-btn:hover::before,
  .region-btn.selected::before { transform: translateX(0); }
  .region-btn:hover,
  .region-btn.selected { color: #36A5DD; }
  .region-btn span,
  .region-btn svg { position: relative; z-index: 2; }
  /* SVG fill also flips on hover/selected via currentColor */
  .region-btn svg { fill: currentColor; }

  /* ── Load More / Load Less button ── */
  .load-btn {
    position: relative;
    overflow: hidden;
    border-radius: 9999px;
    background: #36A5DD;
    padding: 16px 40px;
    color: white;
    font-weight: 700;
    font-size: 18px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(54,165,221,0.25);
    transition: color 0.6s ease-in-out, transform 0.2s, box-shadow 0.2s;
  }
  .load-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    border-radius: 9999px;
    transform: translateX(-110%);
    transition: transform 0.6s ease-in-out;
    z-index: 1;
  }
  .load-btn:hover::before { transform: translateX(0); }
  .load-btn:hover { color: #36A5DD; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(54,165,221,0.35); }
  .load-btn span { position: relative; z-index: 2; }

  @media (max-width: 860px) {
    .filter-outer-row {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }
    .filter-btn {
      width: 100%;
      border-radius: 9999px;
      margin: 0;
    }
    .filter-row {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      width: 100%;
    }
    .reset-btn {
      justify-content: center;
      padding: 0;
      margin-top: 12px;
    }
    .cards-grid { grid-template-columns: 1fr; gap: 24px; }
    .dropdown-grid { grid-template-columns: 1fr; }
  }
`;

type Region = "Asia" | "Europe" | "Africa" | "Oceania" | "America";
type FilterKey = "date" | "circuit" | "region" | "category" | "";

interface Card {
  id: number;
  title: string;
  month: string;
  circuit: string;
  region: Region;
  category: string;
  country: string;
  image: string;
}

const ContinentIcons: Record<Region, JSX.Element> = {
  Asia: (
    <svg width="58" height="50" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M 38,2 L 44,1 L 50,4 L 55,2 L 60,5 L 63,3 L 68,6 L 72,5 L 76,8 L 78,12 L 75,14 L 78,17 L 80,22 L 78,26 L 80,30 L 78,34 L 74,36 L 72,40 L 68,42 L 64,40 L 60,42 L 56,44 L 52,46 L 48,48 L 44,50 L 40,52 L 36,50 L 32,48 L 28,46 L 24,44 L 20,42 L 18,38 L 16,34 L 14,30 L 16,26 L 14,22 L 12,18 L 14,14 L 12,10 L 15,7 L 18,4 L 22,3 L 26,5 L 30,3 Z M 60,10 L 64,12 L 66,16 L 63,19 L 59,17 L 58,13 Z M 44,20 L 48,22 L 46,26 L 42,24 Z M 66,24 L 70,26 L 68,30 L 64,28 Z M 34,30 L 38,32 L 36,36 L 32,34 Z M 52,30 L 56,32 L 54,36 L 50,34 Z" />
      <ellipse cx="82" cy="18" rx="3" ry="5" transform="rotate(-30 82 18)" />
      <ellipse cx="86" cy="24" rx="2" ry="4" transform="rotate(-20 86 24)" />
      <ellipse cx="54" cy="58" rx="2" ry="3" />
      <ellipse cx="70" cy="55" rx="5" ry="2" transform="rotate(-10 70 55)" />
      <ellipse cx="80" cy="58" rx="4" ry="2" transform="rotate(-5 80 58)" />
    </svg>
  ),
  Europe: (
    <svg width="52" height="48" viewBox="0 0 90 85" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30,5 L 36,3 L 42,4 L 48,2 L 54,4 L 58,8 L 62,7 L 66,10 L 68,14 L 65,18 L 68,21 L 66,25 L 62,27 L 64,31 L 62,35 L 58,37 L 54,39 L 50,41 L 46,39 L 42,37 L 38,39 L 34,38 L 30,36 L 26,33 L 22,30 L 20,26 L 18,22 L 20,18 L 18,14 L 20,10 L 24,7 Z M 46,9 L 50,11 L 48,14 L 44,12 Z M 56,14 L 60,16 L 58,20 L 54,18 Z M 34,18 L 38,20 L 36,24 L 32,22 Z M 48,22 L 52,24 L 50,28 L 46,26 Z" />
      <path d="M 44,2 L 48,0 L 52,2 L 54,6 L 50,4 L 46,5 Z" />
      <path d="M 16,12 L 20,10 L 22,14 L 18,16 Z" />
      <path d="M 14,8 L 17,7 L 18,10 L 15,11 Z" />
      <path d="M 22,36 L 28,34 L 30,38 L 32,42 L 28,44 L 24,42 L 22,38 Z" />
      <path d="M 48,38 L 52,36 L 54,40 L 56,44 L 58,48 L 56,52 L 53,50 L 51,46 L 49,42 Z" />
      <path d="M 56,40 L 60,38 L 62,42 L 60,46 L 58,44 Z" />
    </svg>
  ),
  Africa: (
    <svg width="44" height="56" viewBox="0 0 70 95" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18,4 L 24,2 L 30,3 L 36,2 L 42,4 L 48,3 L 52,6 L 56,10 L 58,15 L 56,20 L 58,25 L 57,31 L 54,37 L 50,43 L 46,50 L 42,57 L 38,64 L 35,70 L 32,76 L 30,82 L 28,78 L 26,72 L 24,66 L 20,59 L 16,52 L 12,45 L 9,38 L 8,31 L 9,24 L 8,18 L 10,12 L 14,7 Z M 30,10 L 34,12 L 33,17 L 28,15 Z M 44,18 L 48,20 L 46,25 L 42,23 Z M 20,22 L 24,24 L 22,28 L 18,26 Z M 36,30 L 40,32 L 38,37 L 34,35 Z" />
      <path d="M 60,36 L 64,34 L 66,38 L 65,44 L 63,50 L 60,52 L 58,48 L 59,42 L 58,38 Z" />
    </svg>
  ),
  Oceania: (
    <svg width="64" height="46" viewBox="0 0 110 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10,22 L 16,18 L 22,16 L 28,16 L 34,14 L 40,15 L 46,14 L 52,16 L 56,14 L 60,16 L 62,20 L 60,24 L 62,28 L 60,33 L 56,37 L 52,40 L 48,43 L 44,46 L 40,47 L 36,46 L 32,44 L 28,42 L 24,44 L 20,43 L 16,40 L 12,36 L 9,31 L 8,26 Z M 52,20 L 56,22 L 54,26 L 50,24 Z M 22,24 L 26,26 L 24,30 L 20,28 Z M 38,28 L 42,30 L 40,34 L 36,32 Z" />
      <path d="M 56,14 L 60,10 L 62,14 L 60,18 L 58,16 Z" />
      <path d="M 84,30 L 88,28 L 92,30 L 94,34 L 92,38 L 88,40 L 84,38 L 82,34 Z" />
      <path d="M 86,42 L 90,40 L 94,42 L 96,47 L 94,52 L 90,54 L 86,52 L 84,47 Z" />
      <path d="M 44,52 L 48,50 L 51,53 L 50,58 L 47,60 L 44,58 L 43,54 Z" />
      <path d="M 62,8 L 68,6 L 74,8 L 76,12 L 72,14 L 66,13 L 62,11 Z" />
      <circle cx="96" cy="14" r="2.5" />
      <circle cx="102" cy="20" r="2" />
      <circle cx="100" cy="8" r="1.8" />
    </svg>
  ),
  America: (
    <svg width="48" height="58" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 32,2 L 38,2 L 44,4 L 50,3 L 55,6 L 58,10 L 56,14 L 60,17 L 58,21 L 54,24 L 56,28 L 52,30 L 48,28 L 44,30 L 40,32 L 36,30 L 32,32 L 28,30 L 24,28 L 20,26 L 16,22 L 14,18 L 16,14 L 14,10 L 16,6 L 20,3 L 26,2 Z M 42,8 L 46,10 L 44,14 L 40,12 Z M 28,12 L 32,14 L 30,18 L 26,16 Z M 48,16 L 52,18 L 50,22 L 46,20 Z" />
      <path d="M 48,30 L 52,28 L 54,32 L 52,37 L 50,35 L 48,33 Z" />
      <path d="M 14,22 L 18,20 L 20,24 L 19,30 L 16,32 L 14,28 Z" />
      <path d="M 46,36 L 50,34 L 52,38 L 50,42 L 47,40 Z" />
      <path d="M 36,44 L 42,42 L 48,43 L 52,46 L 54,51 L 56,57 L 54,63 L 52,69 L 48,75 L 44,80 L 40,84 L 36,88 L 32,92 L 30,88 L 28,82 L 26,76 L 24,70 L 22,64 L 20,58 L 20,52 L 22,46 L 28,43 Z M 44,50 L 48,52 L 46,56 L 42,54 Z M 32,58 L 36,60 L 34,64 L 30,62 Z M 42,66 L 46,68 L 44,72 L 40,70 Z" />
      <ellipse cx="56" cy="38" rx="3" ry="1.5" />
      <ellipse cx="60" cy="42" rx="2" ry="1.5" />
    </svg>
  ),
};

interface FilterButtonProps {
  filterKey: FilterKey;
  label: string;
  selectedValue: string;
  activeFilter: FilterKey;
  setActiveFilter: (key: FilterKey) => void;
}

interface OptionButtonProps {
  item: string;
  selected: string;
  onSelect: (item: string) => void;
  setActiveFilter: (key: FilterKey) => void;
}

interface RegionButtonProps {
  item: Region;
  selected: string;
  onSelect: (item: string) => void;
  setActiveFilter: (key: FilterKey) => void;
}

const FilterButton = ({ filterKey, label, selectedValue, activeFilter, setActiveFilter }: FilterButtonProps) => {
  const isActive = activeFilter === filterKey;
  return (
    <button
      className={`filter-btn${isActive || selectedValue ? " active-filter" : ""}`}
      onClick={() => setActiveFilter(isActive ? "" : filterKey)}
    >
      <span>{selectedValue ? selectedValue.toUpperCase() : label}</span>
      {isActive
        ? <ChevronUp size={16} style={{ flexShrink: 0 }} />
        : <ChevronDown size={16} style={{ flexShrink: 0 }} />
      }
    </button>
  );
};

const OptionButton = ({ item, selected, onSelect, setActiveFilter }: OptionButtonProps) => (
  <button
    className={`option-btn${selected === item ? " selected" : ""}`}
    onClick={() => { onSelect(item); setActiveFilter(""); }}
  >
    <span>{item}</span>
  </button>
);

const RegionButton = ({ item, selected, onSelect, setActiveFilter }: RegionButtonProps) => (
  <button
    className={`region-btn${selected === item ? " selected" : ""}`}
    onClick={() => { onSelect(item); setActiveFilter(""); }}
  >
    {ContinentIcons[item]}
    <span>{item}</span>
  </button>
);

export default function EventsCards(): JSX.Element {
  const allCards: Card[] = [
    { id: 1, title: "Tour de Yabakei", month: "May", circuit: "Road", region: "Asia", category: "Premium", country: "Japan", image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200" },
    { id: 2, title: "SENA Seorak Gran Fondo", month: "June", circuit: "Road", region: "Asia", category: "Standard", country: "South Korea", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200" },
    { id: 3, title: "Alpine Ride", month: "July", circuit: "Gravel", region: "Europe", category: "Premium", country: "Switzerland", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1200" },
    { id: 4, title: "Desert Ride", month: "August", circuit: "Road & Gravel", region: "Africa", category: "World Championship", country: "Morocco", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200" },
    { id: 5, title: "Ocean Cycling", month: "September", circuit: "Road", region: "Oceania", category: "Standard", country: "Australia", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200" },
    { id: 6, title: "Mountain Peak", month: "October", circuit: "Gravel", region: "America", category: "Premium", country: "Canada", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200" },
  ];

  const months: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const circuits: string[] = ["Road", "Gravel", "Road & Gravel"];
  const regions: Region[] = ["Asia", "Europe", "Africa", "Oceania", "America"];
  const categories: string[] = ["Premium", "Standard", "World Championship"];

  const [activeFilter, setActiveFilter] = useState<FilterKey>("");
  const [month, setMonth] = useState<string>("");
  const [circuit, setCircuit] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [visibleCards, setVisibleCards] = useState<number>(4);

  const filteredCards: Card[] = allCards.filter((card) =>
    (month === "" || card.month === month) &&
    (circuit === "" || card.circuit === circuit) &&
    (region === "" || card.region === region) &&
    (category === "" || card.category === category)
  );

  const resetFilters = (): void => {
    setMonth(""); setCircuit(""); setRegion(""); setCategory(""); setActiveFilter("");
  };

  return (
    <>
      <style suppressHydrationWarning>{responsiveStyles}</style>
      <section style={{ background: "#ffffff", padding: "20px 24px 80px", color: "#0d2a4a" }}>

        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 className="font-black tracking-wide" style={{ color: "#111827", fontSize: "clamp(28px, 4vw, 36px)", marginBottom: "0" }}>
            Upcoming Events
          </h2>
          <p className="font-playlist" style={{ color: "#0ea5e9", fontSize: "clamp(28px, 4vw, 40px)", marginTop: "-16px", marginBottom: "0" }}>
            Find Your Next Race
          </p>
        </div>

        <div className="filters-wrapper">
          <div className="filter-outer-row">
            <div className="filter-row">
              <FilterButton filterKey="date" label="DATE" selectedValue={month} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              <FilterButton filterKey="circuit" label="CIRCUIT" selectedValue={circuit} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              <FilterButton filterKey="region" label="REGION" selectedValue={region} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              <FilterButton filterKey="category" label="CATEGORY" selectedValue={category} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>
            <button className="reset-btn" style={{ color: "#0d2a4a" }} onClick={resetFilters}>
              <RotateCw size={16} style={{ color: "#0284c7" }} />
              RESET ALL
            </button>
          </div>

          {activeFilter && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: 0, right: 0,
              background: "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              zIndex: 50,
              boxShadow: "0 24px 60px rgba(13,42,74,0.25)",
            }}>
              {activeFilter === "date" && (
                <div className="dropdown-grid">
                  {months.map((item) => <OptionButton key={item} item={item} selected={month} onSelect={setMonth} setActiveFilter={setActiveFilter} />)}
                </div>
              )}
              {activeFilter === "circuit" && (
                <div className="dropdown-grid">
                  {circuits.map((item) => <OptionButton key={item} item={item} selected={circuit} onSelect={setCircuit} setActiveFilter={setActiveFilter} />)}
                </div>
              )}
              {activeFilter === "region" && (
                <div className="dropdown-grid">
                  {regions.map((item) => <RegionButton key={item} item={item} selected={region} onSelect={setRegion} setActiveFilter={setActiveFilter} />)}
                </div>
              )}
              {activeFilter === "category" && (
                <div className="dropdown-grid">
                  {categories.map((item) => <OptionButton key={item} item={item} selected={category} onSelect={setCategory} setActiveFilter={setActiveFilter} />)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cards-grid">
          {filteredCards.slice(0, visibleCards).map((card) => (
            <div key={card.id} style={{ background: "white", borderRadius: "16px", overflow: "hidden", border: "none", boxShadow: "0 8px 30px rgba(13,42,74,0.12)" }}>
              <img src={card.image} alt={card.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0284c7", marginBottom: "10px" }}>{card.title}</h2>
                <div style={{ display: "flex", gap: "12px", color: "#0d2a4a", marginBottom: "14px", fontWeight: "500" }}>
                  <span>📅 {card.month}</span>
                  <span>📍 {card.country}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
                  <span style={{ background: "#f1f5f9", color: "#475569", padding: "4px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>{card.circuit}</span>
                  <span style={{ background: "#f1f5f9", color: "#475569", padding: "4px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>{card.region}</span>
                  <span style={{ background: "#0284c7", color: "white", padding: "4px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>{card.category}</span>
                </div>
                <a
                  href="#"
                  className="relative overflow-hidden inline-flex items-center justify-center bg-[#36A5DD] text-white font-bold text-sm px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-auto
                    before:absolute before:inset-0 before:bg-white before:rounded-full
                    before:-translate-x-[110%] hover:before:translate-x-0
                    before:transition-transform before:duration-[600ms] before:ease-in-out
                    transition-colors duration-[600ms] hover:text-[#36A5DD]"
                >
                  <span className="relative z-10">Register Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "80px", fontSize: "30px", fontWeight: "700", color: "#0d2a4a" }}>
            No Events Found
          </div>
        )}

        {filteredCards.length > 4 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
            {visibleCards < filteredCards.length ? (
              <button className="load-btn" onClick={() => setVisibleCards((prev) => prev + 2)}>
                <span>Load More</span>
              </button>
            ) : (
              <button className="load-btn" onClick={() => setVisibleCards(4)}>
                <span>Load Less</span>
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}