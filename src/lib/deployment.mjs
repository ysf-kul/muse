/** Resolve GitHub user sites and project sites without assuming a repository. */
export function resolveDeployment(env = process.env) {
  const repository = env.GITHUB_REPOSITORY;
  const [owner, name] = repository?.split("/") ?? [];
  const isUserSite =
    owner && name?.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const inferredBase = owner && name && !isUserSite ? `/${name}/` : "/";
  const input = env.BASE_PATH ?? inferredBase;
  if (!/^\/(?:[a-zA-Z0-9._~-]+\/)*$/.test(input)) {
    throw new Error(
      "BASE_PATH must start and end with / and contain safe path segments.",
    );
  }
  if (input.split("/").some((segment) => segment === "." || segment === "..")) {
    throw new Error("BASE_PATH cannot contain relative path segments.");
  }
  const site =
    env.SITE_URL || (owner ? `https://${owner}.github.io` : undefined);
  if (
    site &&
    (!/^https?:\/\//.test(site) ||
      new URL(site).pathname !== "/" ||
      new URL(site).search ||
      new URL(site).hash)
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) origin, without a path, query, or fragment.",
    );
  }
  return { base: input, site };
}
