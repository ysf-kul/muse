import { isLocalizedText, type LocalizedText } from "../i18n/messages.ts";

export type DesktopPlatform = "Windows" | "Linux";
export type AppStatus =
  "prototype" | "in-development" | "released" | "archived";
export interface MuseApp {
  id: string;
  name: string;
  tagline: LocalizedText;
  description: LocalizedText;
  status: AppStatus;
  published: boolean;
  icon?: string;
  screenshots?: {
    src: string;
    alt: LocalizedText;
    width: number;
    height: number;
    caption?: LocalizedText;
  }[];
  features?: LocalizedText[];
  platforms?: DesktopPlatform[];
  testedPlatforms?: {
    platform: DesktopPlatform;
    environment: LocalizedText;
    notes?: LocalizedText;
  }[];
  buildVerifiedPlatforms?: DesktopPlatform[];
  requirements?: LocalizedText[];
  installation?: LocalizedText[];
  limitations?: LocalizedText[];
  version?: string;
  releaseDate?: string;
  downloads?: {
    label: LocalizedText;
    platform: DesktopPlatform;
    url: string;
    size?: string;
  }[];
  repositoryUrl?: string;
  releaseUrl?: string;
  documentationUrl?: string;
  issuesUrl?: string;
  featured?: boolean;
}

export function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function isAssetPath(value: string): boolean {
  return (
    /^\/assets\/[a-zA-Z0-9/_.-]+$/.test(value) &&
    !value.split("/").includes("..")
  );
}

/** Fail the build on unsafe, contradictory, or incomplete published data. */
export function validateCatalog(entries: MuseApp[]): void {
  const ids = new Set<string>();
  const platforms = ["Windows", "Linux"];
  for (const app of entries) {
    const fail = (message: string): never => {
      throw new Error(`Catalog ${app.id}: ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(app.id))
      fail("id must be a lowercase URL slug");
    if (ids.has(app.id)) fail("duplicate id");
    ids.add(app.id);
    if (!app.name?.trim()) fail("name is required");
    for (const key of ["tagline", "description"] as const) {
      if (!isLocalizedText(app[key]))
        fail(`${key}: non-empty Turkish and English translations are required`);
    }
    for (const key of [
      "features",
      "requirements",
      "installation",
      "limitations",
    ] as const) {
      for (const value of app[key] ?? []) {
        if (!isLocalizedText(value))
          fail(
            `${key}: non-empty Turkish and English translations are required`,
          );
      }
    }
    if (typeof app.published !== "boolean") fail("published must be a boolean");
    if (
      !["prototype", "in-development", "released", "archived"].includes(
        app.status,
      )
    )
      fail("invalid status");
    for (const key of [
      "repositoryUrl",
      "releaseUrl",
      "documentationUrl",
      "issuesUrl",
    ] as const) {
      if (app[key] !== undefined && !isWebUrl(app[key]!))
        fail(`${key} must be an HTTP(S) URL`);
    }
    if (app.icon && !isAssetPath(app.icon))
      fail("icon must be a local /assets/ path");
    for (const screenshot of app.screenshots ?? []) {
      if (!isAssetPath(screenshot.src) || !isLocalizedText(screenshot.alt))
        fail("screenshots need local assets and meaningful alt text");
      if (
        screenshot.caption !== undefined &&
        !isLocalizedText(screenshot.caption)
      )
        fail("screenshot captions need Turkish and English translations");
      if (
        !Number.isInteger(screenshot.width) ||
        !Number.isInteger(screenshot.height) ||
        screenshot.width < 1 ||
        screenshot.height < 1
      )
        fail("screenshots need positive intrinsic width and height");
    }
    for (const platform of [
      ...(app.platforms ?? []),
      ...(app.buildVerifiedPlatforms ?? []),
      ...(app.testedPlatforms ?? []).map((item) => item.platform),
      ...(app.downloads ?? []).map((item) => item.platform),
    ]) {
      if (!platforms.includes(platform))
        fail("only Windows and Linux are current desktop targets");
    }
    for (const platform of app.platforms ?? []) {
      if (!app.testedPlatforms?.some((item) => item.platform === platform))
        fail(`${platform} support requires runtime test details`);
    }
    for (const tested of app.testedPlatforms ?? []) {
      if (!isLocalizedText(tested.environment))
        fail("runtime tests need a specific environment");
      if (tested.notes !== undefined && !isLocalizedText(tested.notes))
        fail("runtime notes need Turkish and English translations");
    }
    for (const download of app.downloads ?? []) {
      if (!isWebUrl(download.url) || !isLocalizedText(download.label))
        fail("downloads need a label and HTTP(S) URL");
    }
    if (app.version !== undefined && !app.version.trim())
      fail("version cannot be empty");
    if (app.releaseDate !== undefined) {
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(app.releaseDate) ||
        Number.isNaN(Date.parse(app.releaseDate)) ||
        new Date(app.releaseDate).toISOString().slice(0, 10) !== app.releaseDate
      )
        fail("releaseDate must be a real ISO date");
    }
  }
}

export function publishedApps(entries: MuseApp[]): MuseApp[] {
  validateCatalog(entries);
  return entries.filter((app) => app.published);
}
