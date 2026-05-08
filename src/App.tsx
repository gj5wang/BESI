import { useState, useMemo } from 'react';
import trainingData from './data/training_matrix.json';
import type { TrainingData, CourseWithRoles } from './types';
import CourseCard from './components/CourseCard';
import RoleFilter from './components/RoleFilter';
import './App.css';

const data = trainingData as TrainingData;

function App() {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Transform courses to include which roles need them
  const coursesWithRoles: CourseWithRoles[] = useMemo(() => {
    return data.courses.map((course) => {
      const mandatory: string[] = [];
      const recommended: string[] = [];

      data.roles.forEach((role) => {
        const requirement = role.requirements[course.name];
        if (requirement === 'mandatory') {
          mandatory.push(role.name);
        } else if (requirement === 'recommended') {
          recommended.push(role.name);
        }
      });

      return {
        ...course,
        mandatory,
        recommended,
      };
    });
  }, []);

  // Filter and sort courses based on selected role
  const filteredCourses = useMemo(() => {
    if (selectedRole === 'all') {
      return coursesWithRoles;
    }

    const relevant = coursesWithRoles.filter(
      (course) =>
        course.mandatory.includes(selectedRole) ||
        course.recommended.includes(selectedRole)
    );

    // mandatory courses first
    return [...relevant].sort((a, b) => {
      const aM = a.mandatory.includes(selectedRole) ? 0 : 1;
      const bM = b.mandatory.includes(selectedRole) ? 0 : 1;
      return aM - bM;
    });
  }, [coursesWithRoles, selectedRole]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>BESI Training Portal</h1>
        <p className="subtitle">Health and Safety Course Catalog</p>
      </header>

      <main className="app-main">
        <RoleFilter
          roles={data.roles}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} selectedRole={selectedRole} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="no-results">No courses found for this role.</p>
        )}
      </main>
    </div>
  );
}

export default App;