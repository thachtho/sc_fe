import http from './http';

export const createClassManagerLesson = (
  data: Pick<IClassManagerLesson, 'lessonId' | 'classManagerId'>,
) => http.post<IClassManagerLesson>(`/class-manager-lesson`, data);

export const activeClassManagerLesson = (
  id: number,
  data: {
    active: boolean;
  },
) => http.put<IClassManagerLesson>(`/class-manager-lesson/active/${id}`, data);
