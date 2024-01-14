export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContextType = {
  user: UserType;
};

export type DataType = {
  jwt?: string;
  error?: {
    message: string;
  };
  user?: UserType;
};
