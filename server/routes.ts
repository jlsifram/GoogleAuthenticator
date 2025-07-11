import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { storage } from "./storage";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      googleId: string;
      email: string;
      name: string;
      givenName?: string | null;
      familyName?: string | null;
      picture?: string | null;
      emailVerified?: boolean | null;
      createdAt: Date | null;
      lastLoginAt: Date | null;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  }));

  // Passport configuration
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Google OAuth strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/api/auth/google/callback`
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Check if user exists
      let user = await storage.getUserByGoogleId(profile.id);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          googleId: profile.id,
          email: profile.emails?.[0]?.value || '',
          name: profile.displayName || '',
          givenName: profile.name?.givenName || null,
          familyName: profile.name?.familyName || null,
          picture: profile.photos?.[0]?.value || null,
          emailVerified: profile.emails?.[0]?.verified || false,
        });
      } else {
        // Update last login
        await storage.updateLastLogin(user.id);
      }

      return done(null, user);
    } catch (error) {
      return done(error, undefined);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Auth routes
  app.get('/api/auth/google', 
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { 
      failureRedirect: '/?error=auth_failed' 
    }),
    (req, res) => {
      // Successful authentication
      res.redirect('/?success=true');
    }
  );

  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Session destruction failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
      });
    });
  });

  // Get current user
  app.get('/api/auth/user', (req, res) => {
    if (req.isAuthenticated() && req.user) {
      res.json({
        user: req.user,
        isAuthenticated: true
      });
    } else {
      res.json({
        user: null,
        isAuthenticated: false
      });
    }
  });

  // Protected route middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Authentication required' });
  };

  // Protected dashboard data endpoint
  app.get('/api/dashboard/profile', requireAuth, (req, res) => {
    res.json({
      user: req.user,
      session: {
        loginTime: req.user?.lastLoginAt,
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
