export interface UserProgress {
  completedLessons: string[];
  solvedExercises: string[];
  quizScores: Record<string, number>;
  userCodeStorage: Record<string, string>;
}

const STORAGE_KEY = "solidity_master_progress_v1";

export function loadUserProgress(): UserProgress {
  if (typeof window === "undefined") {
    return {
      completedLessons: [],
      solvedExercises: [],
      quizScores: {},
      userCodeStorage: {},
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedLessons: [],
        solvedExercises: [],
        quizScores: {},
        userCodeStorage: {},
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      completedLessons: [],
      solvedExercises: [],
      quizScores: {},
      userCodeStorage: {},
    };
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}
