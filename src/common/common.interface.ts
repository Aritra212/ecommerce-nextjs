export interface LogoutProps {
  noredirect: boolean;
}

export interface IProfile {
  name: string;
  email: string;
  created_at: string;
  phone?: string;
}
