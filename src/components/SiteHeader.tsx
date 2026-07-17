import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { GITHUB_REPO_URL } from "@/lib/site";

type Props = {
  /** Center content width class, defaults to max-w-6xl */
  maxWidthClass?: string;
  showGithub?: boolean;
};

/**
 * Shared marketing-site header. Used on home, templates, topics, and about
 * so About / Topics stay discoverable everywhere.
 */
export function SiteHeader({ maxWidthClass = "max-w-6xl", showGithub = true }: Props) {
  return (
    <header className="border-b">
      <div
        className={`mx-auto flex ${maxWidthClass} items-center justify-between px-6 py-4`}
      >
        <Link to="/" className="font-semibold tracking-tight">
          Portfolio<span className="text-primary">.</span>build
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Templates
          </Link>
          <Link
            to="/topics"
            className="text-muted-foreground hover:text-foreground"
          >
            Topics
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          {showGithub && (
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>MIT licensed. Everything you generate is yours.</div>
        <nav className="flex flex-wrap items-center gap-4">
          <Link to="/templates" className="hover:text-foreground">
            Templates
          </Link>
          <Link to="/topics" className="hover:text-foreground">
            Topics
          </Link>
          <Link to="/about" className="hover:text-foreground">
            About
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
