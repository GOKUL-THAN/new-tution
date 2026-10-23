import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Users, GraduationCap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Faculty',
  description:
    'Meet the expert faculty at Global Minds Academy — experienced teachers dedicated to student success across school tuition and competitive exam preparation.',
};

interface TeacherProfile {
  id: string;
  qualification: string | null;
  specializations: string[];
  experience: string | null;
  user: { firstName: string; lastName: string; avatarUrl: string | null; bio: string | null };
}

const placeholderTeachers = [
  {
    initials: 'RS',
    name: 'Faculty Member',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '10+ years',
    specializations: ['Mathematics', 'JEE Maths', 'Class 10–12'],
    bio: 'Experienced mathematics teacher with expertise in board exam preparation and competitive entrance training.',
  },
  {
    initials: 'PK',
    name: 'Faculty Member',
    qualification: 'M.Sc. Physics, B.Ed.',
    experience: '8+ years',
    specializations: ['Physics', 'JEE Physics', 'NEET Physics'],
    bio: 'Physics specialist with a strong focus on conceptual clarity and application-based problem solving.',
  },
  {
    initials: 'SK',
    name: 'Faculty Member',
    qualification: 'M.Sc. Biology, B.Ed.',
    experience: '7+ years',
    specializations: ['Biology', 'NEET Biology', 'Class 11–12'],
    bio: 'Biology educator dedicated to helping NEET aspirants master Botany and Zoology with structured preparation.',
  },
];

async function getTeachers(): Promise<TeacherProfile[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/teachers`, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function TeachersPage() {
  const dbTeachers = await getTeachers();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Our Faculty</h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
              Meet the educators behind Global Minds Academy — experienced, passionate, and student-first.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {dbTeachers.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dbTeachers.map((teacher) => (
                  <div key={teacher.id} className="card p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {teacher.user.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={teacher.user.avatarUrl}
                          alt={`${teacher.user.firstName} ${teacher.user.lastName}`}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {teacher.user.firstName[0]}{teacher.user.lastName[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-1">
                      {teacher.user.firstName} {teacher.user.lastName}
                    </h3>
                    {teacher.qualification && (
                      <p className="text-sm text-gray-500 mb-1">{teacher.qualification}</p>
                    )}
                    {teacher.experience && (
                      <p className="text-xs text-brand-600 font-medium mb-3">{teacher.experience} experience</p>
                    )}
                    {teacher.user.bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{teacher.user.bio}</p>
                    )}
                    {teacher.specializations.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {teacher.specializations.map((s) => (
                          <span key={s} className="badge bg-brand-50 text-brand-700 text-xs">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-center text-sm text-gray-400 mb-10">
                  Faculty profiles are managed by the academy administrator. Sample profiles are shown below.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placeholderTeachers.map((teacher, i) => (
                    <div key={i} className="card p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white font-bold text-xl">{teacher.initials}</span>
                      </div>
                      <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{teacher.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{teacher.qualification}</p>
                      <p className="text-xs text-brand-600 font-medium mb-3">{teacher.experience} experience</p>
                      <p className="text-sm text-gray-600 mb-4">{teacher.bio}</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {teacher.specializations.map((s) => (
                          <span key={s} className="badge bg-brand-50 text-brand-700 text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Join us */}
        <section className="section-padding bg-brand-50">
          <div className="container-wide text-center">
            <div className="max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Are You an Educator?</h2>
              <p className="text-gray-500 mb-6">
                Join Global Minds Academy&apos;s faculty network. Teach live classes, create course content, and help students across Tamil Nadu succeed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  <GraduationCap className="w-4 h-4" /> Apply to Teach
                </Link>
                <Link href="/about" className="btn-secondary">
                  <Star className="w-4 h-4" /> Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
