'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import support1 from '@/assets/support1.jpg';
import support2 from '@/assets/support2.jpg';

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    images: string[];
}

interface FaqAccordionListProps {
    items: FaqItem[];
    badgeLabel?: string;
    title?: string;
    searchPlaceholder?: string;
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, ' ');
}

export default function FaqAccordionList({
    items,
    badgeLabel = 'Support',
    title = 'Frequently asked questions',
    searchPlaceholder = 'Search a topic…',
}: FaqAccordionListProps) {
    const [query, setQuery] = useState('');
    const [openIds, setOpenIds] = useState<Set<number>>(
        () => new Set(items.slice(0, 3).map((i) => i.id))
    );
    const [activeImageItemId, setActiveImageItemId] = useState<number | null>(
        () => items.find((i) => i.images.length > 0)?.id ?? null
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter(
            (item) =>
                item.question.toLowerCase().includes(q) ||
                stripHtml(item.answer).toLowerCase().includes(q)
        );
    }, [items, query]);

    const activeImage =
        items.find((i) => i.id === activeImageItemId)?.images[0] ??
        items.find((i) => i.images.length > 0)?.images[0] ??
        null;

    function toggle(id: number) {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
                const item = items.find((i) => i.id === id);
                if (item && item.images.length > 0) setActiveImageItemId(id);
            }
            return next;
        });
    }

    if (items.length === 0) return null;

    return (
        <section className="faq-event-section">
            <div className="faq-event-grid">
                {/* ── LEFT: image panel ── */}
                <div className="faq-event-image-col">
                    {activeImage ? (
                        <div className="faq-event-image-frame">
                            <img
                                key={activeImage}
                                src={activeImage}
                                alt=""
                                className="faq-event-image"
                            />
                        </div>
                    ) : (
                        <div className="faq-event-image-pair">
                            <div className="faq-event-image-box">
                                <Image src={support1} alt="" fill className="faq-event-image" priority />
                            </div>
                            <div className="faq-event-image-box">
                                <Image src={support2} alt="" fill className="faq-event-image" />
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RIGHT: search + accordion ── */}
                <div className="faq-event-content-col">
                    <div className="faq-event-badge">
                        <span className="faq-event-badge-dot" />
                        {badgeLabel}
                    </div>
                    <h2 className="faq-event-title">{title}</h2>

                    <div className="faq-event-search">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                        />
                    </div>

                    <div className="faq-event-list">
                        {filtered.length === 0 && (
                            <p className="faq-event-empty">No results found.</p>
                        )}
                        {filtered.map((item) => {
                            const isOpen = openIds.has(item.id);
                            return (
                                <div
                                    key={item.id}
                                    className={`faq-event-item ${isOpen ? 'is-open' : ''}`}
                                >
                                    <button
                                        type="button"
                                        className="faq-event-item-head"
                                        onClick={() => toggle(item.id)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq-event-item-q">{item.question}</span>
                                        <span className={`faq-event-icon ${isOpen ? 'is-open' : ''}`}>
                                            {isOpen ? (
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                    <line x1="4" y1="12" x2="20" y2="12" />
                                                </svg>
                                            ) : (
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                    <line x1="12" y1="4" x2="12" y2="20" />
                                                    <line x1="4" y1="12" x2="20" y2="12" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>

                                    <div className="faq-event-item-body">
                                        <div className="faq-event-item-body-inner">
                                            <div
                                                className="faq-event-answer"
                                                dangerouslySetInnerHTML={{ __html: item.answer }}
                                            />
                                            {item.images.length > 0 && (
                                                <div className="faq-event-answer-imgs">
                                                    {item.images.map((src) => (
                                                        <img key={src} src={src} alt="" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .faq-event-section {
          background: #ffffff;
          padding: 64px 24px;
        }
        .faq-event-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .faq-event-grid {
            grid-template-columns: 0.85fr 1.15fr;
            gap: 56px;
          }
        }

        /* LEFT — image */
        .faq-event-image-col {
          position: sticky;
          top: 24px;
        }
        .faq-event-image-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #e3eef6;
          background: #f2f8fc;
          aspect-ratio: 4 / 5;
        }
        .faq-event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: faqEventFade 0.35s ease;
        }
        .faq-event-image-pair {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-event-image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e3eef6;
          background: #f2f8fc;
        }
        @keyframes faqEventFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* RIGHT — content */
        .faq-event-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7a8a97;
          margin-bottom: 14px;
        }
        .faq-event-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #36a5dd;
          flex-shrink: 0;
        }
        .faq-event-title {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #0d1f35;
          margin: 0 0 24px;
        }

        .faq-event-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e0e6ea;
          border-radius: 30px;
          padding: 12px 20px;
          margin-bottom: 8px;
          box-shadow: 0 2px 10px rgba(13, 31, 53, 0.04);
        }
        .faq-event-search svg { color: #9aa7b0; flex-shrink: 0; }
        .faq-event-search input {
          border: none;
          outline: none;
          background: none;
          font-size: 13px;
          font-family: inherit;
          width: 100%;
          color: #0d1f35;
        }
        .faq-event-search input::placeholder { color: #a8b2ba; }

        .faq-event-list { margin-top: 22px; }
        .faq-event-empty {
          color: #8a97a1;
          font-size: 13px;
          padding: 20px 4px;
        }

        .faq-event-item {
          border-bottom: 1px solid #e6ebee;
        }
        .faq-event-item:first-child { border-top: 1px solid #e6ebee; }

        .faq-event-item-head {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 4px;
          font-family: inherit;
          text-align: left;
        }
        .faq-event-item-q {
          font-size: 14px;
          font-weight: 700;
          color: #0d1f35;
          line-height: 1.4;
        }

        .faq-event-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid #cfd8dd;
          color: #7a8a97;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .faq-event-icon.is-open {
          background: #36a5dd;
          border-color: #36a5dd;
          color: #ffffff;
        }

        .faq-event-item-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.25s ease;
        }
        .faq-event-item.is-open .faq-event-item-body {
          grid-template-rows: 1fr;
        }
        .faq-event-item-body-inner {
          overflow: hidden;
        }
        .faq-event-answer {
          font-size: 13px;
          color: #6b7680;
          line-height: 1.7;
          max-width: 560px;
          padding-bottom: 18px;
        }
        .faq-event-answer :global(b),
        .faq-event-answer :global(strong) {
          color: #0d1f35;
          font-weight: 700;
        }
        .faq-event-answer-imgs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }
        .faq-event-answer-imgs img {
          width: 92px;
          height: 92px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #e6ebee;
        }
      `}</style>
        </section>
    );
}