"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, Settings } from "lucide-react";
import { SignOutButton } from "./sign-out-button";

interface UserButtonProps {
  user: {
    name: string;
    email?: string;
    image?: string;
  };
}

const UserButton = ({ user }: UserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          title={user.name}
          src={user.image ?? "/placeholder.svg"}
          alt={`${user.name}'s avatar`}
          height={32}
          width={32}
          className="rounded-full"
        />
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200">
          {/* User Info */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </p>
            {user.email && (
              <p className="truncate text-sm text-gray-500">{user.email}</p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Account
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <hr className="my-1 border-gray-600" />

            <div onClick={() => setIsOpen(false)}>
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Updated Navigation Component
const Navigation = ({
  session,
}: {
  session: {
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
      createdAt: Date;
      updatedAt: Date;
      token: string;
      ipAddress?: string | null | undefined | undefined;
      userAgent?: string | null | undefined | undefined;
    };
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
    };
  };
}) => {
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-200 p-3">
      <div className="logo">
        <Link href="/" className="text-2xl font-semibold">
          .env<span className="text-blue-600">kit</span>
        </Link>
      </div>

      <UserButton
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? "/placeholder.svg",
        }}
      />
    </nav>
  );
};

export default UserButton;
export { Navigation };
