import { GameSession } from '@/classes';

export class SessionManager {
  private static instance: SessionManager | undefined;
  private sessions: GameSession[] = [];

  private constructor() {}

  private static getInstance() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public static getSessions() {
    return SessionManager.getInstance().sessions as readonly GameSession[];
  }

  public static findSession(id: string) {
    for (const session of SessionManager.getSessions()) {
      if (session.id === id) return session;
    }
    return null;
  }

  public static newSession(id: string) {
    const session = new GameSession(id);
    SessionManager.getInstance().sessions.push(session);
    return session;
  }

  public static removeSession(session: GameSession) {
    const instance = SessionManager.getInstance();
    for (let i = 0; i < instance.sessions.length; i++) {
      if (instance.sessions[i] === session) instance.sessions.splice(i, 1);
    }
  }
}
