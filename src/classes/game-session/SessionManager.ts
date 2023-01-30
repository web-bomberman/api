import { GameSession } from '@/classes';
import { TileMap } from '@/types';

export class SessionManager {
  private static instance: SessionManager | undefined;
  private sessions: GameSession[] = [];
  private idCount: number = 0;

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

  public static findSession(id: number) {
    for (const session of SessionManager.getSessions()) {
      if (session.id === id) return session;
    }
    return null;
  }

  public static newSession(map: TileMap) {
    const instance = SessionManager.getInstance();
    const session = new GameSession(instance.idCount, map);
    instance.idCount++;
    instance.sessions.push(session);
    return session;
  }

  public static removeSession(session: GameSession) {
    const instance = SessionManager.getInstance();
    for (let i = 0; i < instance.sessions.length; i++) {
      if (instance.sessions[i] === session) instance.sessions.splice(i, 1);
    }
  }
}