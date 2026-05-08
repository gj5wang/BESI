import type { CourseWithRoles } from '../types';
import './CourseCard.css';

interface CourseCardProps {
  course: CourseWithRoles;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="course-card">
      <h3 className="course-name">{course.name}</h3>
      
      {course.mandatory.length > 0 && (
        <div className="requirement-section">
          <div className="requirement-header mandatory">
            <span className="requirement-badge">Required</span>
          </div>
          <p className="role-list">{course.mandatory.join(', ')}</p>
        </div>
      )}
      
      {course.recommended.length > 0 && (
        <div className="requirement-section">
          <div className="requirement-header recommended">
            <span className="requirement-badge">Recommended</span>
          </div>
          <p className="role-list">{course.recommended.join(', ')}</p>
        </div>
      )}
    </div>
  );
}