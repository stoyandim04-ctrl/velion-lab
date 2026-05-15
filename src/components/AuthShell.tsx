// Споделена обвивка за login / register / forgot password страниците.
import Link from "next/link";
import { Logo } from "./Logo";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLink?: { href: string; label: string };
};

export function AuthShell({ children, title, subtitle, footerText, footerLink }: Props) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div className="spotlight" style={{ width: "600px", height: "600px", background: "rgba(30, 58, 138, 0.3)", top: "-200px", left: "50%", transform: "translateX(-50%)" }} />

      <Link href="/" className="mb-10 hover:opacity-80 transition">
        <Logo />
      </Link>

      <div className="w-full max-w-md card rounded-3xl p-8 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold silver-text mb-2">{title}</h1>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>

        {children}

        {footerText && footerLink && (
          <p className="text-center text-sm text-gray-400 mt-8">
            {footerText}{" "}
            <Link href={footerLink.href} className="text-blue-400 hover:text-blue-300 font-medium transition">
              {footerLink.label}
            </Link>
          </p>
        )}
      </div>

      <p className="mt-8 text-xs text-gray-600 font-mono uppercase tracking-[0.25em]">
        Защитена зона · Velion Lab
      </p>
    </main>
  );
}

// === Input field — единен стил за всички auth форми ===
type InputProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
};

export function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  required,
  autoComplete,
  minLength,
}: InputProps) {
  const id = `field-${name}`;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-mono mb-2 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition text-base cursor-text"
      />
    </div>
  );
}
