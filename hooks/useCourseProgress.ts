import { useState, useEffect, useMemo, useCallback } from 'react';
import { Course } from '../types';

// Helper to safely get progress from localStorage
const getProgressFromStorage = (courseId: number): Set<string> => {
  try {
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    if (savedProgress) {
      // The stored value is an array of strings
      return new Set(JSON.parse(savedProgress));
    }
  } catch (error) {
    console.error('Error reading course progress from localStorage:', error);
  }
  return new Set();
};

// Helper to safely save progress to localStorage
const saveProgressToStorage = (courseId: number, completedLessons: Set<string>) => {
  try {
    // Convert Set to Array for JSON serialization
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(Array.from(completedLessons)));
  } catch (error) {
    console.error('Error saving course progress to localStorage:', error);
  }
};

const useCourseProgress = (course: Course | undefined) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Effect to load progress from storage when the course changes
  useEffect(() => {
    if (course) {
      setCompletedLessons(getProgressFromStorage(course.id));
    }
  }, [course]);

  // Calculate the total number of lessons in the course
  const totalLessons = useMemo(() => {
    if (!course) return 0;
    return course.curriculum.reduce((total, module) => total + module.lessons.length, 0);
  }, [course]);

  // Calculate the completion percentage
  const completionPercentage = useMemo(() => {
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons.size / totalLessons) * 100);
  }, [completedLessons.size, totalLessons]);

  // Function to toggle a lesson's completion status
  const toggleLessonCompletion = useCallback((lessonId: string) => {
    if (!course) return;

    setCompletedLessons(prevCompleted => {
      // Fix: Explicitly type the new Set to avoid it being inferred as Set<unknown>.
      const newCompleted = new Set<string>(prevCompleted);
      if (newCompleted.has(lessonId)) {
        newCompleted.delete(lessonId);
      } else {
        newCompleted.add(lessonId);
      }
      // Persist the new set to localStorage
      saveProgressToStorage(course.id, newCompleted);
      return newCompleted;
    });
  }, [course]);

  // Memoized function to check if a lesson is completed
  const isLessonCompleted = useCallback((lessonId: string) => {
    return completedLessons.has(lessonId);
  }, [completedLessons]);

  return {
    completionPercentage,
    toggleLessonCompletion,
    isLessonCompleted,
  };
};

export default useCourseProgress;