export {};

// Create a type for the roles
export type Roles = "superAdmin" | "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
