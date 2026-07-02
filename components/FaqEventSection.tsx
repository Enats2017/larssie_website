import {prisma} from '@/lib/prisma';
import FaqAccordionList, { FaqItem } from './Faqaccodionlist';

const BASE_URL = 'http://91.99.229.154';

function imgUrl(path?: string | null) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

type Locale = 'en' | 'nl' | 'fr';

function pickLang(
  en: string | null | undefined,
  nl: string | null | undefined,
  fr: string | null | undefined,
  locale: Locale
) {
  const byLocale: Record<Locale, string | null | undefined> = { en, nl, fr };
  return byLocale[locale] || en || '';
}

interface FaqEventSectionProps {
  brandId: number;
  eventId: number;
  locale?: Locale;
}

export default async function FaqEventSection({
  brandId,
  eventId,
  locale = 'en',
}: FaqEventSectionProps) {
  const faqBuilder = await prisma.faq_event_builder.findFirst({
    where: { brand_id: brandId, event_id: eventId },
    include: {
      items: {
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      },
    },
  });

  if (!faqBuilder || faqBuilder.items.length === 0) return null;

  const items: FaqItem[] = faqBuilder.items.map((item) => {
    let images: string[] = [];
    try {
      images = item.images ? JSON.parse(item.images) : [];
    } catch {
      images = [];
    }

    return {
      id: item.faq_event_item_id,
      question: pickLang(item.question, item.question_nl, item.question_fr, locale),
      answer: pickLang(item.answer, item.answer_nl, item.answer_fr, locale),
      images: images.map(imgUrl),
    };
  });

  return <FaqAccordionList items={items} />;
}