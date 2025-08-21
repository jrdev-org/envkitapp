"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Terminal, Users } from "lucide-react";

function Heading({
  size,
  className,
  children,
}: {
  size?: "xl" | "lg" | "md";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = size === "xl" ? "h1" : size === "lg" ? "h2" : "h3";
  return <Tag className={className}>{children}</Tag>;
}

function Text({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={className}>{children}</p>;
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-md border border-slate-100 bg-white shadow ${
        className || ""
      }`.trim()}
    >
      {children}
    </div>
  );
}

function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 ${
        className || ""
      }`.trim()}
    >
      {children}
    </button>
  );
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 ${
        className || ""
      }`.trim()}
    >
      {children}
    </button>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header / Nav */}
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 font-semibold text-white shadow">
              EK
            </div>
            <div>
              <div className="text-lg font-semibold">envkit</div>
              <div className="text-xs text-slate-500">
                secure envs, simplified
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <GhostButton
              className="hidden sm:inline-flex"
              onClick={() => (location.hash = "#features")}
            >
              Features
            </GhostButton>
            <GhostButton
              className="hidden sm:inline-flex"
              onClick={() => (location.hash = "#cli")}
            >
              CLI
            </GhostButton>
            <GhostButton
              className="hidden sm:inline-flex"
              onClick={() => (location.hash = "#pricing")}
            >
              Pricing
            </GhostButton>
            <PrimaryButton onClick={() => (location.href = "/docs")}>
              Get Started
            </PrimaryButton>
          </nav>
        </header>

        {/* Hero */}
        <section className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <Heading size="xl" className="mb-4 text-4xl font-bold">
              Manage environment variables securely — locally or team-wide
            </Heading>
            <Text className="mb-6 max-w-xl text-slate-600">
              envkit is a developer-first environment manager. Create, sync, and
              encrypt your .env files with end-to-end encryption, easy CI/CD
              integration, and a tiny CLI that just works.
            </Text>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={() => (location.hash = "#quickstart")}>
                Quickstart
              </PrimaryButton>
              <GhostButton onClick={() => (location.href = "/docs")}>
                Docs
              </GhostButton>
              <code className="flex items-center gap-2 rounded bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <span className="text-slate-500">npm i -g envkit</span>
              </code>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
              <span className="rounded bg-indigo-50 px-2 py-1 text-indigo-600">
                Open source
              </span>
              <span>·</span>
              <span>Zero-knowledge encryption option</span>
              <span>·</span>
              <span>Works offline</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gradient-to-b from-white to-slate-50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 font-medium text-slate-600">
                      .
                    </div>
                    <div className="text-sm font-medium">envkit CLI</div>
                  </div>
                  <div className="text-xs text-slate-400">Local preview</div>
                </div>

                <div className="rounded-md bg-slate-900 p-4 font-mono text-sm text-slate-100">
                  <pre className="break-words whitespace-pre-wrap">{`# link project
envkit init

# authenticate
envkit auth login

# pull production env
envkit vars pull --use-linked --env production

# push a local .env
envkit vars push .env.production production --branch main`}</pre>
                </div>
                <div className="mt-4 text-xs text-slate-500">
                  Works with GitHub/GitLab, S3, or custom backends
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="mb-16">
          <Heading size="lg" className="mb-6 text-2xl font-bold">
            Features that make envkit useful
          </Heading>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              title="End-to-end encryption"
              desc="AES-GCM-backed encryption with per-user keys or server-managed envelope keys. Zero-knowledge option available."
              icon={<Lock className="h-5 w-5" />}
            />
            <FeatureCard
              title="Simple CLI"
              desc="Minimal commands for common workflows: init, auth, project, vars — built with ergonomics in mind."
              icon={<Terminal className="h-5 w-5" />}
            />
            <FeatureCard
              title="Team sync"
              desc="Encrypted sync to cloud stores with role-based sharing and per-device keys."
              icon={<Users className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* CLI Quickstart aligned with repo commands */}
        <section id="quickstart" className="mb-16">
          <Heading size="lg" className="mb-4 text-2xl font-bold">
            CLI Quickstart
          </Heading>
          <Text className="mb-6 text-slate-600">
            The snippets below mirror the actual CLI in this repository.
          </Text>

          <div className="space-y-8">
            {/* Top-level program and init */}
            <CommandCard
              title="Initialize and link project"
              subtitle="Defined in src/index.ts"
              snippet={`# Initialize in your repo directory
envkit init

# If no existing project is linked:
# - Create new project or select existing
# - Adds .envkit/* to .gitignore
# After linking, pull or push variables:
envkit vars pull
envkit vars push .env.development development`}
              notes={[
                "Subcommand: init",
                "Adds linked project metadata to .envkit/",
                "See src/index.ts for flows (create/select project, link, gitignore).",
              ]}
            />

            {/* Auth */}
            <CommandCard
              title="Authenticate"
              subtitle="Defined in src/commands/auth.ts"
              snippet={`# Start local auth flow (opens browser)
envkit auth login

# End session
envkit auth logout`}
              notes={[
                "Subcommand: auth",
                "Commands: login, logout",
                "Opens browser to complete device session; stores token locally.",
              ]}
            />

            {/* Projects */}
            <CommandCard
              title="Manage projects"
              subtitle="Defined in src/commands/projects.ts"
              snippet={`# List projects
envkit project list

# Create a project
envkit project create <name>

# Link to current workspace (interactive selection)
envkit project link

# Unlink
envkit project unlink

# Rename
envkit project rename <newName>

# Delete (with optional --force to also delete variables)
envkit project delete --force

# Show currently linked project
envkit project current`}
              notes={[
                "Subcommand: project",
                "Actions: list, create, link, unlink, rename, delete, current",
              ]}
            />

            {/* Variables List/Get */}
            <CommandCard
              title="List and get variables"
              subtitle="Defined in src/commands/variables.ts"
              snippet={`# List variables for a stage (development|staging|production)
envkit vars list -e development

# Show values (hidden by default)
envkit vars list -e production --show

# JSON output for scripting
envkit vars list -e staging --json

# Get a single variable (redacted by default)
envkit vars get API_KEY -e production

# Get value without redaction
envkit vars get API_KEY -e production --redact=false`}
              notes={[
                "Subcommand: vars",
                "Flags: -e/--env, --show, --json, --redact",
                "Stages: development | staging | production",
              ]}
            />

            {/* Variables Set */}
            <CommandCard
              title="Set (create or update) a variable"
              subtitle="Defined in src/commands/variables.ts"
              snippet={`# Set or update a variable value
envkit vars set API_URL https://api.example.com -e development --branch main`}
              notes={[
                "Upsert behavior: create or update if exists (interactive confirm on update).",
                "Flags: -e/--env, --branch (default: main).",
                "Local cache for linked project is updated after set.",
              ]}
            />

            {/* Push/Pull */}
            <CommandCard
              title="Push and pull from .env files"
              subtitle="Defined in src/commands/variables.ts"
              snippet={`# Push variables from a file to a stage
envkit vars push .env.production production --branch main

# Pull variables for a stage to local cache and .env.<stage>
# Prefer linked project
envkit vars pull --use-linked --env production

# Or interactively select project and stage
envkit vars pull`}
              notes={[
                "Push: envfile + stage required; --branch optional (default main).",
                "Pull: --use-linked to skip selection; -e/--env to pick stage.",
                "Pull can create or append/overwrite .env.<stage> with a backup if overwritten.",
              ]}
            />
          </div>
        </section>

        {/* Pricing (placeholder) */}
        <section id="pricing" className="mb-16">
          <Heading size="lg" className="mb-4 text-2xl font-bold">
            Pricing
          </Heading>
          <Text className="text-slate-600">
            Coming soon. Envkit is open-source; core features are free.
          </Text>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} envkit — Secure environment variable
              manager
            </div>
            <div className="flex items-center gap-4">
              <a
                className="text-sm text-slate-500 hover:text-slate-700"
                href="/privacy"
              >
                Privacy
              </a>
              <a
                className="text-sm text-slate-500 hover:text-slate-700"
                href="/terms"
              >
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-6 transition-shadow hover:shadow-md">
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-indigo-50 text-indigo-600">
            {icon}
          </div>
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-slate-500">{desc}</div>
          </div>
        </div>
        <div className="mt-3">
          <GhostButton className="px-0 text-indigo-600">
            Learn more →
          </GhostButton>
        </div>
      </CardContent>
    </Card>
  );
}

function CommandCard({
  title,
  subtitle,
  snippet,
  notes,
}: {
  title: string;
  subtitle?: string;
  snippet: string;
  notes?: string[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle ? (
            <div className="text-xs text-slate-500">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="rounded-md bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
        <pre className="break-words whitespace-pre-wrap">{snippet}</pre>
      </div>
      {notes && notes.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 text-xs text-slate-500">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
