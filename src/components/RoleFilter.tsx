import type { Role } from '../types';
import './RoleFilter.css';

interface RoleFilterProps {
  roles: Role[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export default function RoleFilter({ roles, selectedRole, onRoleChange }: RoleFilterProps) {
  return (
    <div className="role-filter">
      <label htmlFor="role-select" className="filter-label">
        Filter by role:
      </label>
      <select
        id="role-select"
        className="filter-select"
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
      >
        <option value="all">All roles</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
}