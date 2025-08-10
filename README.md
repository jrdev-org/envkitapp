# envkit

**envkit** is a centralized environment variable management service with Git branch support.
It allows developers to securely store, manage, and sync environment variables across multiple devices, projects, and branches — accessible via a web dashboard, CLI, or NPM package.

---

## Features

* **Web Dashboard** – Manage your environment variables with a clean and intuitive UI.
* **Git Branch Support** – Store branch-specific variables automatically.
* **CLI Tool** – Pull, push, and authenticate your environment variables from the terminal.
* **NPM Package** – Access your variables directly in your code.
* **End-to-End Encryption** – Your keys are encrypted before storage.

---

## Tech Stack

* **Frontend**: Next.js, TailwindCSS
* **Backend**: Convex (database + API layer)
* **CLI**: Node.js, Commander
* **Package**: TypeScript
* **Monorepo**: PNPM + Turborepo

---

## Getting Started

### Prerequisites

* Node.js 18+
* PNPM 9+
* Convex CLI (`npm install -g convex`)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/envkit.git
cd envkit
```

---

### 2. Install dependencies

```bash
pnpm install
```

---

### 3. Start development servers

```bash
# Start Convex
cd convex
convex dev

# Start web dashboard
cd web/
pnpm dev
```

---

### 4. Build all packages

```bash
pnpm build
```

---

## Scripts

From the root directory:

```bash
pnpm dev       # Start all dev servers
pnpm build     # Build all packages/apps
pnpm lint      # Lint all code
```

---

## Pricing Model Idea

Since envkit primarily stores small text values (environment variables), pricing could be based on **reads/accesses per month**, with a very low baseline cost for small teams and personal use.

Example:

* Free Tier – 500 reads/month, 3 projects
* Pro Tier – \$2/month, 50k reads/month
* Team Tier – \$5/month, 250k reads/month

---

## Security

* Environment variables are encrypted before being stored.
* Branch-specific isolation to prevent accidental leakage.
* Optional IP-based access control.
* Audit logs for variable changes.

