export interface Course {
  id: number;
  name: string;
  rawHeader: string;
}

export interface Role {
  id: number;
  name: string;
  requirements: {
    [courseName: string]: 'mandatory' | 'recommended';
  };
}

export interface TrainingData {
  source: string;
  parsedAt: string;
  legend: {
    mandatory: string;
    recommended: string;
    unset: string;
  };
  notes: string[];
  courses: Course[];
  roles: Role[];
}

export interface CourseWithRoles extends Course {
  mandatory: string[];
  recommended: string[];
}