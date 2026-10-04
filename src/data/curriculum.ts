import { ALL_LESSONS, DOC_COVERAGE_MAP } from "./lessons";
import { Lesson, DocCoverageItem } from "@/types/learning";

export function getAllLessons(): Lesson[] {
  return ALL_LESSONS;
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

export function getLessonsByLevel(): Record<string, Lesson[]> {
  const grouped: Record<string, Lesson[]> = {};
  for (const lesson of ALL_LESSONS) {
    if (!grouped[lesson.level]) {
      grouped[lesson.level] = [];
    }
    grouped[lesson.level].push(lesson);
  }
  return grouped;
}

export function getDocCoverageMap(): DocCoverageItem[] {
  return DOC_COVERAGE_MAP;
}

export function searchCurriculum(query: string): Lesson[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_LESSONS;

  return ALL_LESSONS.filter((lesson) => {
    const titleMatch = lesson.title.toLowerCase().includes(q);
    const summaryMatch = lesson.summary.toLowerCase().includes(q);
    const categoryMatch = lesson.category.toLowerCase().includes(q);
    const codeMatch = lesson.codeExample.code.toLowerCase().includes(q);
    const conceptMatch = lesson.beginnerExplanation.toLowerCase().includes(q) || lesson.developerExplanation.toLowerCase().includes(q);

    return titleMatch || summaryMatch || categoryMatch || codeMatch || conceptMatch;
  });
}
