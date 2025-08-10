export default function HomePage() {
  return (
    <main className="h-screen w-full snap-y overflow-y-scroll scroll-smooth">
      {/* Navbar */}
      <header className="fixed top-6 right-0 left-0 z-50 flex items-center justify-between px-8">
        <div className="flex items-center space-x-6 text-white">
          <span className="text-2xl font-bold">EnvKit</span>
          <nav className="hidden items-center space-x-4 text-sm text-white md:flex">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#docs" className="hover:underline">
              Docs
            </a>
            <a href="#pricing" className="hover:underline">
              Pricing
            </a>
            <a href="#why" className="hover:underline">
              Why
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="hidden rounded-full bg-white px-4 py-2 font-semibold text-blue-600 hover:bg-gray-100 md:inline-block"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-full bg-white px-4 py-2 font-semibold text-blue-600 hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="flex h-screen snap-start flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-6xl font-bold">
            Environment Variables Made Simple
          </h1>
          <p className="mb-6 text-center text-xl">
            Centralized environment variable management with git branch support.
            Perfect for modern workflows and database-branching services like
            Neon.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#quick-setup"
              className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
            >
              Quick Setup
            </a>
            <a
              href="#features"
              className="rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>

          <p className="mt-6 text-sm text-white/90">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Why Use Envkit */}
      <section
        id="why"
        className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600"
      >
        <h2 className="mb-4 text-4xl font-bold">Why Use EnvKit?</h2>
        <p className="max-w-2xl text-center text-lg text-gray-50">
          Stop emailing `.env` files or losing track of API keys. Sync and
          manage variables securely across devices & branches. Branch-aware
          variables let you run feature branches against database branches
          without extra configuration.
        </p>
      </section>

      {/* Quick Setup */}
      <section
        id="quick-setup"
        className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600"
      >
        <h2 className="mb-4 text-4xl font-bold">Quick Setup</h2>

        <div className="w-full max-w-3xl px-6">
          <p className="mb-4 text-lg text-gray-50">
            Install the npm package and access variables directly in your
            runtime. EnvKit auto-detects project and branch names for
            branch-scoped variables.
          </p>

          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
            {`import { env } from "envkit"

env.RUNTIME_ENV = process.env.NODE_ENV

// Auto-detects project + branch
console.log(env.DATABASE_URL)

// Branch-specific variables
console.log(env['my-app:feature.DATABASE_URL'])`}
          </pre>

          <p className="mt-4 text-sm text-gray-50">
            Works with Node, serverless platforms, and in CI. Use the CLI to
            push/pull variables and the runtime package to read them.
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600"
      >
        <h2 className="mb-4 text-4xl font-bold">Everything you need</h2>
        <p className="mb-6 max-w-3xl text-center text-lg text-gray-50">
          Built for modern development workflows. Branch support, auto
          detection, team sharing, and end-to-end encryption.
        </p>

        <div className="grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-500 p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">Branch Support</h3>
            <p className="text-gray-100">
              Perfect for database-branching services like Neon. Manage
              branch-specific variables automatically.
            </p>
          </div>

          <div className="rounded-xl border border-gray-500 p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">Auto Detection</h3>
            <p className="text-gray-100">
              EnvKit detects your project and current git branch so you can skip
              manual config.
            </p>
          </div>

          <div className="rounded-xl border border-gray-500 p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">Secure & Centralized</h3>
            <p className="text-gray-100">
              End-to-end encryption ensures only your team can decrypt
              variables.
            </p>
          </div>
        </div>
      </section>

      {/* How / Features (detailed) */}
      <section
        id="how"
        className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600"
      >
        <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
        <ul className="max-w-3xl list-disc space-y-2 px-6 text-lg text-gray-50">
          <li>Push and pull variables with a simple CLI.</li>
          <li>Branch-specific variables auto-detected and scoped.</li>
          <li>
            Access in code via the <code>envkit</code> npm package.
          </li>
          <li>Secure end-to-end encryption for all keys.</li>
          <li>Integrates with CI/CD and popular hosting platforms.</li>
        </ul>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600"
      >
        <h2 className="mb-4 text-4xl font-bold">Pricing</h2>
        <p className="mb-4 max-w-2xl text-center text-lg text-gray-50">
          Super affordable: pay per variable read — perfect for small teams &
          indie projects. Free tier available for hobbyists.
        </p>
        <div className="rounded-xl bg-blue-600 px-8 py-4 text-gray-50 shadow-lg">
          Starting at $0.0001 per read
        </div>
      </section>

      {/* Security */}
      <section className="flex h-screen snap-start flex-col items-center justify-center bg-gray-600">
        <h2 className="mb-4 text-4xl font-bold">Security First</h2>
        <p className="max-w-2xl text-center text-lg text-gray-50">
          All environment variables are encrypted before leaving your device.
          Only you and your team can decrypt them — not even we can see them.
        </p>
      </section>

      {/* Trust / CTA */}
      <section className="flex h-screen snap-start flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <h2 className="mb-6 text-4xl font-bold">
          Ready to simplify your environment variables?
        </h2>
        <p className="mb-6 max-w-2xl text-center">
          Join thousands of developers who trust EnvKit for their configuration
          management.
        </p>
        <a
          href="#"
          className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
        >
          Get Started for Free
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
          <div>
            <h4 className="mb-2 text-xl font-bold text-white">EnvKit</h4>
            <p className="text-sm text-gray-400">
              Environment variables made simple for modern development
              workflows.
            </p>
          </div>

          <div>
            <h5 className="mb-2 font-semibold text-white">Product</h5>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
            </ul>
          </div>

          <div>
            <h5 className="mb-2 font-semibold text-white">Company</h5>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="mb-2 font-semibold text-white">Support</h5>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Status</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 EnvKit. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
