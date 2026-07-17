import { withDefaults, type PortfolioConfig } from "./types";

export function draftStorageKey(templateId: string): string {
  return `portfolio-builder:draft:${templateId}`;
}

export function loadDraft(templateId: string): PortfolioConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(draftStorageKey(templateId));
    if (!raw) return null;
    return withDefaults(JSON.parse(raw));
  } catch (err) {
    console.warn("[portfolio] failed to load draft", err);
    return null;
  }
}

export function saveDraft(templateId: string, config: PortfolioConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(draftStorageKey(templateId), JSON.stringify(config));
  } catch (err) {
    console.warn("[portfolio] failed to save draft", err);
  }
}

export function clearDraft(templateId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(draftStorageKey(templateId));
  } catch (err) {
    console.warn("[portfolio] failed to clear draft", err);
  }
}
