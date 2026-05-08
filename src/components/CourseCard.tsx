import type { CourseWithRoles } from '../types';
import './CourseCard.css';

interface CourseCardProps {
  course: CourseWithRoles;
  selectedRole: string;
}

export default function CourseCard({ course, selectedRole }: CourseCardProps) {
  if (selectedRole !== 'all') {
    const isMandatory = course.mandatory.includes(selectedRole);
    const isRecommended = course.recommended.includes(selectedRole);
    return (
      <div className="course-card">
        <h3 className="course-name">{course.name}</h3>
        {isMandatory && (
          <div className="requirement-section">
            <div className="requirement-header mandatory">
              <span className="requirement-badge">Required</span>
            </div>
          </div>
        )}
        {isRecommended && (
          <div className="requirement-section">
            <div className="requirement-header recommended">
              <span className="requirement-badge">Recommended</span>
            </div>
          </div>
        )}
      </div>
    );
  }

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