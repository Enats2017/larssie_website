"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface Location {
  coords: [number, number];
  title: string;
  date: string;
  country: string;
  description: string;
}

export default function WorldMap(): React.ReactElement {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
    center: [8, 50],
      zoom: 3.5,
      projection: "mercator",
    });

    const locations: Location[] = [
      {
        coords: [2.3522, 48.8566],
        title: "Paris Cycling Tour",
        date: "15 July",
        country: "France",
        description:
          "Experience one of the most beautiful cycling routes through the iconic roads of Paris.",
      },
      {
        coords: [12.4964, 41.9028],
        title: "Rome Gran Fondo",
        date: "5 May",
        country: "Italy",
        description:
          "Ride through ancient streets and rolling countryside on this historic Italian cycling route.",
      },
      {
        coords: [4.9041, 52.3676],
        title: "Amsterdam Classic",
        date: "20 June",
        country: "Netherlands",
        description:
          "A flat, fast circuit through canals and countryside, perfect for both pros and amateurs.",
      },
      {
        coords: [13.405, 52.52],
        title: "Berlin Endurance Ride",
        date: "10 August",
        country: "Germany",
        description:
          "A challenging long-distance ride through the heart of Berlin and its surrounding forests.",
      },
    ];

    locations.forEach((location) => {
      const popupHTML = `
  <div class="popup-card">

    <button class="popup-close">✕</button>

    <h2 class="popup-title">${location.title}</h2>

    <div class="popup-meta">
      <span>📅 ${location.date}</span>
      <span class="divider">|</span>
      <span>📍 ${location.country}</span>
    </div>

    <p class="popup-description">${location.description}</p>

    <button class="popup-btn">
      <span class="popup-btn-text">About event</span>
      <span class="arrow-box">
        <span style="transform: translateX(-2px);">→</span>
      </span>
    </button>

  </div>

  <style>

    .popup-close {
      position: absolute;
      top: 16px;
      left: 16px;
      width: 34px;
      height: 34px;
      border: none;
      border-radius: 50%;
      background: #e0f2fe;
      color: #0d2a4a;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      z-index: 9999;
    }

    .popup-close:hover {
      background: #0284c7;
      color: white;
    }

    .mapboxgl-popup {
      max-width: 380px !important;
    }

    .mapboxgl-popup-content {
      padding: 0 !important;
      border-radius: 28px !important;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(13,42,74,0.15);
    }

    .popup-card {
      width: 100%;
      min-width: 320px;
      background: white;
      padding: 28px;
      border-radius: 28px;
      font-family: sans-serif;
    }

    .popup-title {
      font-size: 34px;
      line-height: 1.2;
      font-weight: 700;
      color: #0d2a4a;
      margin-bottom: 18px;
      padding-left: 48px;
    }

    .popup-meta {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      font-size: 22px;
      font-weight: 600;
      color: #0d2a4a;
      margin-bottom: 24px;
    }

    .divider { opacity: 0.4; }

    .popup-description {
      font-size: 22px;
      line-height: 1.8;
      color: #64748b;
      margin-bottom: 34px;
    }

    .popup-btn {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: stretch;
      border: 2px solid #0d2a4a;
      background: white;
      cursor: pointer;
      overflow: hidden;
      padding: 0;
      transition: border-color 0.3s;
    }

    .popup-btn:hover {
      border-color: #0284c7;
    }

    .popup-btn-text {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      color: #0d2a4a;
      background: white;
      transition: color 0.3s;
    }

    .popup-btn:hover .popup-btn-text {
      color: #0284c7;
    }

    .arrow-box {
      width: 90px;
      height: 100%;
      background: #0284c7;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 34px;
      clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
      transition: background 0.3s, transform 0.3s;
    }

    .popup-btn:hover .arrow-box {
      background: #0d2a4a;
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .mapboxgl-popup { max-width: 320px !important; }
      .popup-card { min-width: auto; padding: 22px; }
      .popup-title { font-size: 28px; }
      .popup-meta { font-size: 18px; }
      .popup-description { font-size: 18px; line-height: 1.6; }
      .arrow-box { width: 74px; height: 100%; font-size: 28px; }
    }

    @media (max-width: 480px) {
      .mapboxgl-popup { max-width: 280px !important; }
      .popup-card { padding: 18px; }
      .popup-title { font-size: 24px; }
      .popup-meta { gap: 10px; font-size: 16px; }
      .popup-description { font-size: 16px; }
      .popup-btn-text { font-size: 16px; }
      .arrow-box { width: 64px; height: 100%; font-size: 24px; }
    }

  </style>
`;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);

      new mapboxgl.Marker({ color: "#0284c7" })
        .setLngLat(location.coords)
        .setPopup(popup)
        .addTo(map.current!);

      popup.on("open", () => {
        setTimeout(() => {
          const popupElement = popup.getElement();
          const closeBtn = popupElement?.querySelector(".popup-close");
          if (closeBtn) {
            (closeBtn as HTMLButtonElement).onclick = () => {
              popup.remove();
            };
          }
        }, 0);
      });
    });
  }, []);

  return (
    <section className="bg-white py-24 px-6">

      {/* HEADING */}
      <div className="text-center mb-14">

      

        <h2 className="font-black text-3xl md:text-4xl text-gray-900 tracking-wide mb-0">
         CALENDAR
        </h2>

        <p className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mt-4">
          Find Your Next Event
        </p>

      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(13,42,74,0.1)] border border-sky-100">
        <div ref={mapContainer} className="w-full h-[600px]" />
      </div>

    </section>
  );
}