import Image from "next/image";

type Props = {
  /** "compact" = за navbar (нисък).  "full" = за hero (голям). */
  variant?: "compact" | "full";
  className?: string;
};

export function Logo({ variant = "compact", className = "" }: Props) {
  if (variant === "full") {
    return (
      <Image
        src="/velion-logo.png"
        alt="Velion Lab"
        width={1200}
        height={750}
        priority
        className={`w-full max-w-xl h-auto ${className}`}
      />
    );
  }
  return (
    <Image
      src="/velion-logo.png"
      alt="Velion Lab"
      width={400}
      height={250}
      priority
      className={`h-10 w-auto ${className}`}
    />
  );
}
