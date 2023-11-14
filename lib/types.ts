export type ServerActionResponse<T = any> = {
  error?: string | null;
  data?: T;
};
