"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

interface AdminLoginClientProps {
  adminBasePath: string;
  schoolName: string;
  logoPath: string;
}

export function AdminLoginClient({
  adminBasePath,
  schoolName,
  logoPath,
}: AdminLoginClientProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Invalid username or password.");
      } else {
        router.push(data.redirectTo || adminBasePath);
        router.refresh();
      }
    } catch {
      setError("Network error while signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF8F5] px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-[#E91E63]/15 bg-white shadow-editorial">
        <div className="grid h-1.5 w-full grid-cols-6">
          <div className="bg-[#FF7A45]" />
          <div className="bg-[#FF6B81]" />
          <div className="bg-[#E91E63]" />
          <div className="bg-[#AED581]" />
          <div className="bg-[#26A69A]" />
          <div className="bg-[#5C6BC0]" />
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#FF6B81]/25 bg-white p-1 shadow-xs">
              <Image
                src={logoPath}
                alt={`${schoolName} Logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-[#2D3436]">
              CMS Admin Portal
            </h1>
            <p className="mt-1 text-xs font-medium text-[#78909C]">
              {schoolName}
            </p>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-[#FF6B81]/30 bg-[#FFF1EB] px-4 py-3 text-xs font-medium text-[#E91E63]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
              >
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#78909C]" />
                <input
                  id="admin-username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] py-3 pl-10 pr-4 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#78909C]" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] py-3 pl-10 pr-11 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-[#78909C] hover:text-[#2D3436]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E91E63] px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:bg-[#E91E63]/90 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{loading ? "Signing In..." : "Sign In to Admin Panel"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
