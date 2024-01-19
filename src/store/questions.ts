import { create } from 'zustand'
import { Questionnaire } from '@/types/global'

interface QuestionnaireStore {
	questions: Questionnaire[]
	setQuestions: (questionnaires: Questionnaire[]) => void
	generatedQuestion: string
	setGeneratedQuestion: (generatedQuestion: string) => void
}

export const useQuestionnaireStore = create<QuestionnaireStore>(set => ({
	questions: [],
	setQuestions: questions => set({ questions }),
	generatedQuestion: '',
	setGeneratedQuestion: generatedQuestion => set({ generatedQuestion })
}))
