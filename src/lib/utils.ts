export { cn } from "cn"

/**
 * Prefix a root-relative file path from /public with the deploy base.
 * With a custom domain, BASE_URL is "/". Route paths use the router basename.
 */

export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  return `${import.meta.env.BASE_URL}${path.slice(1)}`
}

/** True for a root-relative path that points at a file, e.g. "/resume.pdf". */
export function isStaticFile(path: string): boolean {
  return path.startsWith("/") && /\.[a-z0-9]+$/i.test(path)
}
