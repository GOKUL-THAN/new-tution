'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Download,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  BookMarked,
  GraduationCap,
} from 'lucide-react';
import { SubjectCurriculum, ChapterInfo, AssignmentItem, AssessmentQuiz } from '@/data/education/types';

interface SubjectInteractiveViewProps {
  curriculum: SubjectCurriculum;
  boardName: string;
  boardSlug: string;
  classNumber: number;
  classSlug: string;
}

export default function SubjectInteractiveView({
  curriculum,
  boardName,
  boardSlug,
  classNumber,
  classSlug,
}: SubjectInteractiveViewProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'curriculum' | 'chapters' | 'materials' | 'assignments' | 'assessments' | 'pyq'>('description');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [downloadModal, setDownloadModal] = useState<{ isOpen: boolean; title: string; filename: string } | null>(null);

  // Quiz state
  const currentChapter = curriculum.chapters[selectedChapterIndex] || curriculum.chapters[0];
  const currentQuiz = currentChapter?.quiz;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const toggleSolution = (qId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setIsQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const calculateScore = () => {
    if (!currentQuiz) return { score: 0, total: 0 };
    let correct = 0;
    currentQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return { score: correct, total: currentQuiz.questions.length };
  };

  const quizResult = calculateScore();

  return (
    <div className="space-y-8">
      {/* Interactive Tabs Header */}
      <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-1.5 shadow-xs sticky top-20 z-20 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'description'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            1. Subject Description
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. Curriculum &amp; Syllabus
          </button>

          <button
            onClick={() => setActiveTab('chapters')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'chapters'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            3. Chapters ({curriculum.chapters.length})
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'materials'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Download className="w-4 h-4" />
            4. Learning Materials &amp; PDFs
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'assignments'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            5. Practice Assignments
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'assessments'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-accent-500" />
            6. Chapter Assessments
          </button>

          {curriculum.previousYearPapers && curriculum.previousYearPapers.length > 0 && (
            <button
              onClick={() => setActiveTab('pyq')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'pyq'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              7. Previous Year Papers
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: SUBJECT DESCRIPTION                                   */}
      {/* ============================================================ */}
      {activeTab === 'description' && (
        <div className="space-y-8 animate-fade-in">
          {/* Overview Banner */}
          <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-2xl font-display font-black text-slate-900 mb-3">
              Comprehensive Subject Overview
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {curriculum.description.overview}
            </p>
          </div>

          {/* Core Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* What Students Learn */}
            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                What Students Will Learn
              </h3>
              <ul className="space-y-2.5">
                {curriculum.description.whatStudentsLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Topics Covered */}
            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                Important Topics Covered
              </h3>
              <ul className="space-y-2.5">
                {curriculum.description.importantTopicsCovered.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Objectives */}
            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                Specific Learning Objectives
              </h3>
              <ul className="space-y-2.5">
                {curriculum.description.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Applications */}
            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                Real-World &amp; Practical Applications
              </h3>
              <ul className="space-y-2.5">
                {curriculum.description.practicalApplications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills & Academic Progression */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-500" />
                Skills Students Will Develop
              </h3>
              <div className="flex flex-wrap gap-2">
                {curriculum.description.skillsDeveloped.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-600" />
                Academic Progression &amp; Future Pathways
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {curriculum.description.academicProgression}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CURRICULUM & SYLLABUS                                 */}
      {/* ============================================================ */}
      {activeTab === 'curriculum' && (
        <div className="space-y-8 animate-fade-in">
          {/* Prescribed Textbooks */}
          <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-xl font-display font-black text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              Prescribed Textbooks &amp; Official References
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {curriculum.prescribedTextbooks.map((tb, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      Official Curriculum Text
                    </span>
                    {tb.officialCode && (
                      <span className="text-xs text-slate-500 font-mono">Code: {tb.officialCode}</span>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base mt-2">{tb.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Publisher: {tb.publisher}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Scheme */}
          <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-xl font-display font-black text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" />
              Evaluation &amp; Marking Scheme
            </h3>
            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Theory Exam</span>
                <p className="text-2xl font-display font-black text-blue-900 mt-1">
                  {curriculum.evaluationScheme.theoryMarks} M
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Internal / Practical</span>
                <p className="text-2xl font-display font-black text-emerald-900 mt-1">
                  {curriculum.evaluationScheme.practicalOrInternalMarks} M
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Total Marks</span>
                <p className="text-2xl font-display font-black text-purple-900 mt-1">
                  {curriculum.evaluationScheme.totalMarks} M
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Duration</span>
                <p className="text-2xl font-display font-black text-amber-900 mt-1">
                  {curriculum.evaluationScheme.durationHours} Hours
                </p>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Assessment Breakdown &amp; Continuous Evaluation
            </p>
            <ul className="space-y-2">
              {curriculum.evaluationScheme.breakdown.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: CHAPTERS DIRECTORY                                    */}
      {/* ============================================================ */}
      {activeTab === 'chapters' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <h3 className="text-xl font-display font-bold text-slate-900">
              Chapter Breakdown for {boardName} Class {classNumber} {curriculum.name}
            </h3>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {curriculum.chapters.length} Chapters Mapped
            </span>
          </div>

          <div className="space-y-4">
            {curriculum.chapters.map((ch, idx) => (
              <div
                key={ch.slug}
                className="card p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-brand-500 transition-all shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 font-display font-black text-lg flex items-center justify-center shrink-0">
                      {ch.number}
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-900 mb-1">
                        Chapter {ch.number}: {ch.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                        {ch.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" /> {ch.hours} Hours
                        </span>
                        <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" /> {ch.weightageMarks} Marks Weightage
                        </span>
                      </div>

                      {/* Important topics pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {ch.importantTopics.slice(0, 4).map((top, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            • {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedChapterIndex(idx);
                        setActiveTab('materials');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors w-full sm:w-auto"
                    >
                      Study Notes &amp; PDF
                    </button>
                    <button
                      onClick={() => {
                        setSelectedChapterIndex(idx);
                        setActiveTab('assessments');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:border-brand-500 hover:text-brand-700 transition-colors w-full sm:w-auto"
                    >
                      Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: LEARNING MATERIALS & DOWNLOADABLE PDFS                */}
      {/* ============================================================ */}
      {activeTab === 'materials' && (
        <div className="space-y-6 animate-fade-in">
          {/* Chapter Selector */}
          <div className="card p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">
              Select Chapter:
            </span>
            {curriculum.chapters.map((ch, idx) => (
              <button
                key={ch.slug}
                onClick={() => setSelectedChapterIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedChapterIndex === idx
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Ch {ch.number}: {ch.title.substring(0, 20)}...
              </button>
            ))}
          </div>

          {/* Current Chapter Notes */}
          <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Chapter {currentChapter.number} Study Pack
                </span>
                <h3 className="text-2xl font-display font-black text-slate-900 mt-1">
                  {currentChapter.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setDownloadModal({
                      isOpen: true,
                      title: `Chapter ${currentChapter.number}: ${currentChapter.title} — Revision Guide`,
                      filename: `${boardName}_Class${classNumber}_${curriculum.name}_Ch${currentChapter.number}_Notes.pdf`,
                    })
                  }
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Complete PDF Notes
                </button>
              </div>
            </div>

            {/* Notes Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Conceptual Summary
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {currentChapter.notesSummary}
              </p>
            </div>

            {/* Formulas / Key Terms */}
            {currentChapter.keyFormulasOrTerms && currentChapter.keyFormulasOrTerms.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                  Important Formulas &amp; Definitions
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {currentChapter.keyFormulasOrTerms.map((f, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono font-semibold"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available PDF Resources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Downloadable PDF Guides &amp; Cheat Sheets
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {currentChapter.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 transition-all bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{mat.title}</h5>
                        <p className="text-[11px] text-slate-500">{mat.fileSize || 'PDF Document'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setDownloadModal({
                          isOpen: true,
                          title: mat.title,
                          filename: mat.downloadFilename || `${mat.title.replace(/\s+/g, '_')}.pdf`,
                        })
                      }
                      className="p-2 rounded-xl border border-slate-200 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: PRACTICE QUESTIONS & ASSIGNMENTS                      */}
      {/* ============================================================ */}
      {activeTab === 'assignments' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Chapter {currentChapter.number}: {currentChapter.title}
              </span>
              <h3 className="text-xl font-display font-black text-slate-900 mt-0.5">
                Practice Questions &amp; Assignments
              </h3>
            </div>

            <div className="card p-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 ml-1">Chapter:</span>
              <select
                value={selectedChapterIndex}
                onChange={(e) => setSelectedChapterIndex(Number(e.target.value))}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
              >
                {curriculum.chapters.map((ch, idx) => (
                  <option key={ch.slug} value={idx}>
                    Ch {ch.number}: {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {currentChapter.assignments.map((as) => (
              <div key={as.id} className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      {as.level}
                    </span>
                    <h4 className="font-display font-bold text-slate-900 text-base">{as.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {as.estimatedTime}
                  </span>
                </div>

                <div className="space-y-4">
                  {as.questions.map((q, qIdx) => (
                    <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className="font-display font-black text-brand-700 text-sm">
                            Q{qIdx + 1}.
                          </span>
                          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                            {q.question}
                          </p>
                        </div>
                        {q.marks && (
                          <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                            {q.marks} Mark{q.marks !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {/* Expand Solution Button */}
                      <div>
                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                        >
                          {expandedSolutions[q.id] ? (
                            <>
                              Hide Step-by-Step Solution <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Show Step-by-Step Solution <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                        {expandedSolutions[q.id] && (
                          <div className="mt-3 p-4 rounded-xl bg-white border border-brand-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-mono">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block mb-1 font-sans">
                              Verified Answer &amp; Step Marking:
                            </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: CHAPTER ASSESSMENTS (INTERACTIVE QUIZ)               */}
      {/* ============================================================ */}
      {activeTab === 'assessments' && (
        <div className="space-y-6 animate-fade-in">
          {currentQuiz ? (
            <div className="card p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
              {/* Quiz Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    Chapter {currentChapter.number} Self-Assessment
                  </span>
                  <h3 className="text-2xl font-display font-black text-slate-900 mt-1">
                    {currentQuiz.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <Clock className="w-4 h-4 text-brand-600" />
                    {currentQuiz.durationMinutes} Minutes
                  </div>
                  <div className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200">
                    {currentQuiz.totalMarks} Marks
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentQuiz.questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = isQuizSubmitted && userAnswer === q.correctIndex;
                  const isWrong = isQuizSubmitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border-2 transition-all ${
                        isQuizSubmitted
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/30'
                            : isWrong
                            ? 'border-rose-300 bg-rose-50/30'
                            : 'border-slate-200 bg-white'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pl-10">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = userAnswer === oIdx;
                          const isOptionCorrect = isQuizSubmitted && oIdx === q.correctIndex;

                          let optionStyle = 'border-slate-200 bg-slate-50/70 hover:border-brand-400';
                          if (isQuizSubmitted) {
                            if (isOptionCorrect) {
                              optionStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-bold';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'border-rose-500 bg-rose-100/70 text-rose-900';
                            } else {
                              optionStyle = 'border-slate-200 opacity-60';
                            }
                          } else if (isSelected) {
                            optionStyle = 'border-brand-600 bg-brand-50 text-brand-900 font-semibold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => handleSelectAnswer(q.id, oIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${optionStyle}`}
                            >
                              <span>{opt}</span>
                              {isQuizSubmitted && isOptionCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isQuizSubmitted && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after submission */}
                      {isQuizSubmitted && (
                        <div className="mt-4 ml-10 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-brand-700 block mb-0.5">Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Footer & Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {isQuizSubmitted ? (
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
                      Score: <span className="text-brand-700 text-base">{quizResult.score}</span> / {quizResult.total}
                    </div>
                    <span className="text-xs text-slate-600 font-medium">
                      {quizResult.score >= (currentQuiz.passingMarks || 2)
                        ? '🎉 Great job! You demonstrated mastery of this chapter.'
                        : 'Review the chapter notes above and try again!'}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">
                    Select your answers and click Submit for immediate evaluation.
                  </span>
                )}

                <div className="flex items-center gap-2">
                  {isQuizSubmitted ? (
                    <button
                      onClick={handleQuizReset}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Re-attempt Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Submit Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-8 rounded-3xl bg-white border border-slate-200 text-center">
              <Award className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 text-sm font-semibold">
                Self-assessment quiz for this chapter is being synchronized with the question bank.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 7: PREVIOUS YEAR PAPERS                                  */}
      {/* ============================================================ */}
      {activeTab === 'pyq' && curriculum.previousYearPapers && (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Official Board Archives
              </span>
              <h3 className="text-2xl font-display font-black text-slate-900 mt-1">
                Previous-Year Board Question Papers &amp; Marking Schemes
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Authentic, verified question papers with model answers and step marking rubrics.
              </p>
            </div>

            <div className="space-y-4">
              {curriculum.previousYearPapers.map((pyq) => (
                <div
                  key={pyq.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-brand-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                        {pyq.year} Board Exam
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{pyq.session}</span>
                    </div>
                    <h4 className="font-display font-bold text-slate-900 text-base">{pyq.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Marks: {pyq.totalMarks}M · Duration: {pyq.duration} · Solutions: Verified
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setDownloadModal({
                          isOpen: true,
                          title: pyq.title,
                          filename: `${boardName}_Class${classNumber}_${curriculum.name}_PYQ_${pyq.year}.pdf`,
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Paper &amp; Solutions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Download Alert Modal */}
      {downloadModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="card p-6 sm:p-8 rounded-3xl bg-white max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <Download className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-display font-black text-slate-900 text-lg">
                Study Material Download Ready
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {downloadModal.title}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
              File: {downloadModal.filename}
            </div>

            <p className="text-[11px] text-slate-500">
              Includes comprehensive chapter notes, formula sheets, NCERT/State textbook solutions, and revision question bank.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDownloadModal(null)}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Trigger realistic simulated download
                  const element = document.createElement('a');
                  const file = new Blob(
                    [
                      `GLOBAL MINDS ACADEMY — STUDY RESOURCE\n` +
                      `Board: ${boardName}\n` +
                      `Class: ${classNumber}\n` +
                      `Subject: ${curriculum.name}\n` +
                      `Resource: ${downloadModal.title}\n\n` +
                      `Summary:\n${curriculum.description.overview}\n\n` +
                      `Verified Academic Curriculum — Global Minds Academy`
                    ],
                    { type: 'text/plain' }
                  );
                  element.href = URL.createObjectURL(file);
                  element.download = downloadModal.filename.replace('.pdf', '.txt');
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  setDownloadModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-xs"
              >
                Confirm Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

