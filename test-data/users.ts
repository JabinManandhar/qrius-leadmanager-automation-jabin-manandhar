export type Role = "ADMIN" | "AGENT";  //role can be either be ADMIN or AGENT type

export interface TestUser {
  username: string;
  password: string;
  role: Role;
}

export const admin: TestUser = {
  username: "admin.qrius",
  password: "Admin@123",
  role: "ADMIN",
};

export const agent: TestUser = {
  username: "agent.qrius",
  password: "Agent@123",
  role: "AGENT",
};
