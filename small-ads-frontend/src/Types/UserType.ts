/**
 * Type UserType.
 * Contient les attributs d'un utilisateurs.
 */
export interface UserType {
  id: string;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  companyId: number;
  archived: boolean;
  role: string;
}
