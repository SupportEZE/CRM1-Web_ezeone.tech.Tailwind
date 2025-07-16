import { AUTH_KEYS } from "./constants";

export class AuthUtils {
  static  async getOrgId(): Promise<any> {
    try {
      const data = await localStorage.getItem(AUTH_KEYS.ORG);
      const org = data ? JSON.parse(data) : null;
      return org ?? null;
    } catch {
      return null;
    }
  }
}