export type UserRole = "ADMIN" | "AGENT"; //role can be either be ADMIN or AGENT type

export interface User {
  username: string;
  password: string;
  role: UserRole;
  canDeleteLeads: boolean;
}

// export const admin: TestUser = {
//   username: "admin.qrius",
//   password: "Admin@123",
//   role: "ADMIN",
// };

// export const agent: TestUser = {
//   username: "agent.qrius",
//   password: "Agent@123",
//   role: "AGENT",
// };

export const USERS = {
  admin: {
    username: "admin.qrius",
    password: "Admin@123",
    role: "ADMIN",
    canDeleteLeads: true,
  },
  agent: {
    username: "agent.qrius",
    password: "Agent@123",
    role: "AGENT",
    canDeleteLeads: false,
  },
} satisfies Record<string, User>;
