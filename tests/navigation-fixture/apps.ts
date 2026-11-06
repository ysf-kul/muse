import { fixtureApp } from "../detail-fixture/app";

// Published only within this fixture build, never in src/data/apps.ts.
export const apps = [{ ...fixtureApp(), published: true, featured: true }];
