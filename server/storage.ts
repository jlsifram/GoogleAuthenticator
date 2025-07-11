import { users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateLastLogin(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private googleIdIndex: Map<string, number>;
  private emailIndex: Map<string, number>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.googleIdIndex = new Map();
    this.emailIndex = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const id = this.googleIdIndex.get(googleId);
    return id ? this.users.get(id) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const id = this.emailIndex.get(email);
    return id ? this.users.get(id) : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      picture: insertUser.picture ?? null,
      givenName: insertUser.givenName ?? null,
      familyName: insertUser.familyName ?? null,
      emailVerified: insertUser.emailVerified ?? false,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    
    this.users.set(id, user);
    this.googleIdIndex.set(user.googleId, id);
    this.emailIndex.set(user.email, id);
    
    return user;
  }

  async updateLastLogin(id: number): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastLoginAt = new Date();
      this.users.set(id, user);
    }
  }
}

export const storage = new MemStorage();
