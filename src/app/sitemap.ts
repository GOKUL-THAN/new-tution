import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/boards`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/classes`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/subjects`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/courses`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/curriculum`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/entrance-exams`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/jee`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/jee-main`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/jee-advanced`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/neet`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/school-tuition`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/olympiads`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/free-resources`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/study-planner`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/diagnostic-test`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/admissions`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/batches`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/practice`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/ncert-solutions`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/previous-year-papers`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/exam-calendar`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/college-guide`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/career-paths`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/official-resources`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/online-learning`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/offline-classes`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/scholarships`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/login`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${BASE_URL}/register`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/refund-policy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/accessibility`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/content-licensing`, changeFrequency: 'yearly', priority: 0.3 },
  // Board pages
  { url: `${BASE_URL}/boards/cbse`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/boards/icse`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/boards/isc`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/boards/tn-state-board`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/boards/tn-matriculation`, changeFrequency: 'monthly', priority: 0.7 },
  // Board-specific class pages (4 boards × 7 classes)
  ...['cbse', 'icse', 'tn-state-board', 'tn-matriculation'].flatMap((b) =>
    Array.from({ length: 7 }, (_, i) => ({
      url: `${BASE_URL}/boards/${b}/class-${i + 6}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  ),
  // Class pages (6–12 only — primary classes not served)
  ...Array.from({ length: 7 }, (_, i) => ({
    url: `${BASE_URL}/classes/class-${i + 6}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [...staticRoutes];

  try {
    // Dynamic course routes
    const courses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    });

    for (const course of courses) {
      routes.push({
        url: `${BASE_URL}/courses/${course.slug}`,
        changeFrequency: 'weekly',
        priority: 0.8,
        lastModified: course.updatedAt,
      });
    }

    // Dynamic exam routes
    const exams = await prisma.examCatalogue.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });

    for (const exam of exams) {
      routes.push({
        url: `${BASE_URL}/entrance-exams/${exam.slug}`,
        changeFrequency: 'monthly',
        priority: 0.7,
        lastModified: exam.updatedAt,
      });
    }
  } catch {
    // DB unavailable — return static routes only
  }

  return routes;
}
