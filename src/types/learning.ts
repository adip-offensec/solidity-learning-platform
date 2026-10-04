export type DifficultyLevel = "Level 0" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5" | "Level 6" | "Security Lab";

export interface DocReference {
  title: string;
  url: string;
  section: string;
}

export interface StepExecution {
  step: number;
  title: string;
  description: string;
  evmDetail?: string;
}

export type ExerciseType = "predict" | "bugfix" | "complete" | "scratch" | "security";

export interface TestCase {
  description: string;
  targetFunction?: string;
  args?: any[];
  expectedReturn?: any;
  expectedRevert?: boolean;
  expectedStateChange?: Record<string, any>;
  checkCodePattern?: RegExp[];
}

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  prompt: string;
  starterCode: string;
  solutionCode: string;
  hints: [string, string, string];
  solutionExplanation: string;
  testCases: TestCase[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  deepDiveReasoning: string;
}

export interface SecurityNote {
  vulnerability: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  vulnerablePattern: string;
  fixedPattern: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: DifficultyLevel;
  levelNumber: number;
  category: string;
  summary: string;
  docRef: DocReference;
  prerequisites: string[];
  beginnerExplanation: string;
  developerExplanation: string;
  evmExplanation: string;
  securityNotes: SecurityNote[];
  codeExample: {
    filename: string;
    code: string;
  };
  stepByStepExecution: StepExecution[];
  commonMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
  }[];
  exercise: Exercise;
  quiz: QuizQuestion[];
  relatedLessonIds: string[];
}

export interface DocCoverageItem {
  section: string;
  officialDocUrl: string;
  coveredInLessonId: string;
  keyConcepts: string[];
  hasExercise: boolean;
  hasSecurityLab: boolean;
}
