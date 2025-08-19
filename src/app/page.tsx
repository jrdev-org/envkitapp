"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CheckerboardBG from "@/components/checkered-bg";

const CLI_STEPS = [
  {
    title: "Authenticate",
    description:
      "Sign in to EnvKit and fetch your personal API token for secure variable access.",
    code: `envkit auth login
# Opening auth server at http://localhost:5200/cli/auth
# ✓ Authentication successful! Token saved.`,
    outcome:
      "You now have a valid token stored locally, which will be used to securely authenticate all future CLI operations.",
  },
  {
    title: "Initialize Project",
    description: "Start by initializing envkit in your project.",
    code: `? What do you want to do?
  ❯ Create a new project
    Link to an existing project

$ envkit init`,
    outcome:
      "This sets up the project configuration in your repo so EnvKit knows where to store and manage variables.",
  },
  {
    title: "Link Project",
    description:
      "Choose an existing project to link your local workspace for push/pull operations.",
    code: `envkit projects link
# ? Select a project to link:
#   ❯ my-web-app (prod, staging, dev)
# ✓ Linked to 'my-web-app' project`,
    outcome:
      "Your local project is now tied to a specific remote environment, enabling synchronized pushes and pulls.",
  },
  {
    title: "Push Variables",
    description:
      "Push your local environment variables to the linked remote project.",
    code: `? Select stage
  ❯ development
    staging
    production

? Select env file to push
  ❯ .env.local
    .env

$ envkit push`,
    outcome:
      "Your team can now access the exact same variables in the remote environment, keeping everything consistent.",
  },
  {
    title: "Pull Variables",
    description:
      "Fetch remote variables from the linked project into your local environment.",
    code: `? Select stage
  ❯ development
    staging
    production

? Select env file to write
  ❯ .env.local
    .env

$ envkit pull`,
    outcome:
      "Your local .env file is updated with the latest variables, ensuring you are always in sync with remote changes.",
  },
  {
    title: "Deploy & Use",
    description:
      "Once configured, your environment variables are synced and ready.",
    code: `$ envkit deploy`,
    outcome:
      "Your team can now access the exact same variables in the remote environment, keeping everything consistent.",
  },
];

// const CLI_STEPS = [
//   {
//     title: "Initialize Project",
//     description: "Start by initializing envkit in your project.",
//     code: `? What do you want to do?
//   ❯ Create a new project
//     Link to an existing project

// $ envkit init`,
//   },
//   {
//     title: "Push Environment Variables",
//     description: "Upload environment variables to your chosen stage and file.",
//     code: `? Select stage
//   ❯ development
//     staging
//     production

// ? Select env file to push
//   ❯ .env.local
//     .env

// $ envkit push`,
//   },
//   {
//     title: "Pull Environment Variables",
//     description:
//       "Download environment variables from the correct stage into a local file.",
//     code: `? Select stage
//   ❯ development
//     staging
//     production

// ? Select env file to write
//   ❯ .env.local
//     .env

// $ envkit pull`,
//   },
//   {
//     title: "Deploy & Use",
//     description:
//       "Once configured, your environment variables are synced and ready.",
//     code: `$ envkit deploy`,
//   },
// ];

const FEATURES = [
  {
    title: "Branch-Aware Environments",
    description:
      "Automatically switch environment variables based on your Git branch. No more manual .env file swapping.",
    icon: "🌳",
  },
  {
    title: "Team Collaboration",
    description:
      "Share environment variables securely with your team. Everyone stays in sync without exposing secrets.",
    icon: "👥",
  },
  {
    title: "Powerful CLI",
    description:
      "Simple commands to push, pull, and manage variables. Integrates seamlessly into your existing workflow.",
    icon: "⚡",
  },
  {
    title: "Secure by Default",
    description:
      "End-to-end encryption ensures your secrets are safe. SOC 2 compliant infrastructure.",
    icon: "🔒",
  },
  {
    title: "Framework Agnostic",
    description:
      "Works with any framework or language. From React to Django, we've got you covered.",
    icon: "🛠️",
  },
  {
    title: "Real-time Sync",
    description:
      "Changes propagate instantly across your team. No more 'works on my machine' issues.",
    icon: "🔄",
  },
];

const WHY_REASONS = [
  {
    title: "Stop the .env Chaos",
    description:
      "No more Slack messages asking for environment variables. No more outdated .env.example files. No more onboarding nightmares.",
  },
  {
    title: "Security First",
    description:
      "Your secrets never touch version control. Encrypted at rest and in transit. Audit logs for compliance.",
  },
  {
    title: "Developer Experience",
    description:
      "Built by developers, for developers. Simple CLI that feels natural. Zero config for most use cases.",
  },
  {
    title: "Scale with Confidence",
    description:
      "From side projects to enterprise. Multi-environment support with granular permissions and team management.",
  },
];

export default function HomePage() {
  const { data, isPending, error } = useSession();

  return (
    <main className="w-full snap-y overflow-y-scroll scroll-smooth bg-white text-gray-900">
      {/* Navbar */}
      <header className="fixed top-6 right-0 left-0 z-50 flex items-center justify-between px-8">
        <div className="flex items-center space-x-6 text-gray-900">
          <Link href="/" className="text-2xl font-bold">
            .env<span className="text-gray-500">kit</span>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {!data ? (
            <Link
              href="/signin"
              className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Sign In
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Dashboard
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-white/30">
        <CheckerboardBG size={18} base="#ffffff" alt="#eef2ff" opacity={1} />
        <div className="max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-6xl font-bold">
            Environment Variables Made Simple
          </h1>
          <p className="mb-6 text-xl text-gray-700">
            Centralized environment variable management with branch-aware
            support and a powerful CLI.
          </p>
          <Link
            href="/dashboard"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="snap-start bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Features</h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage environment variables at scale
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="snap-start bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Why EnvKit?</h2>
            <p className="text-xl text-gray-600">
              The problems we solve for development teams
            </p>
          </div>
          <div className="space-y-12">
            {WHY_REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-start gap-6 md:flex-row"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="md:w-1/3">
                  <h3 className="mb-2 text-2xl font-semibold text-blue-600">
                    {reason.title}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg text-gray-700">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI Flow Sections */}
      <section id="cli-flow-steps" className="bg-gray-50">
        {CLI_STEPS.map((step, idx) => (
          <section
            key={idx}
            className="flex w-full snap-start flex-col items-center justify-center px-6 py-20 md:flex-row"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-12 md:flex-row">
              <div className="w-full flex-1">
                <div className="mb-6">
                  <h3 className="mb-2 text-3xl font-bold">{step.title}</h3>
                  <p className="text-lg text-gray-700">{step.description}</p>
                  <p className="mt-4 text-sm text-gray-500">{step.outcome}</p>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-400 bg-blue-200 shadow-sm">
                  <SyntaxHighlighter
                    language="plaintext"
                    style={vs}
                    showLineNumbers={false}
                    customStyle={{
                      margin: 0,
                      padding: "1rem 1.25rem",
                      fontSize: "14px",
                      background: "transparent", // let container bg show
                    }}
                  >
                    {step.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="snap-start bg-gradient-to-br from-blue-50 to-purple-100 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold">Absurdly Simple Pricing</h2>
          <p className="mb-12 text-xl text-gray-700">
            Start free, scale as you grow
          </p>

          <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold">Pay Per Use</h3>
              <p className="text-gray-600">No monthly fees, no commitments</p>
            </div>

            <div className="mb-8">
              <div className="mb-2 text-5xl font-bold">
                <span className="text-green-600">100</span>
                <span className="text-2xl text-gray-500"> read/writes</span>
              </div>
              <p className="text-lg text-gray-700">Free every day</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="mb-2 text-2xl font-semibold">
                <span className="text-blue-600">$0.001</span>
                <span className="text-sm text-gray-500">
                  {" "}
                  per extra read/write
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Only pay for what you use beyond the free tier
              </p>
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> 1,000 daily operations = $0.90/day
              </p>
            </div>

            <Link
              href="/dashboard"
              className="mt-8 block w-full rounded-full bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="snap-start bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Simplify Your Environment Variables?
          </h2>
          <p className="mb-8 text-xl">
            Join thousands of developers who've streamlined their workflow with
            EnvKit
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100"
            >
              Get Started Free
            </Link>
            <Link
              href="#cli-flow-steps"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-blue-600"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
