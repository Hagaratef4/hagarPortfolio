export const INTRO_SESSION_KEY = "hasLoadedPreloader";

export function hasIntroPlayed(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function markIntroComplete(): void {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // Private mode / blocked storage should not break the intro.
  }
}
