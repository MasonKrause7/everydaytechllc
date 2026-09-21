import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  inverted?: boolean;
};

export function Logo({
  className = "",
  showWordmark = true,
  inverted = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Everyday Tech home"
    >
      <Image
        src={inverted ? "/logo-mark-light.svg" : "/logo-mark.svg"}
        alt=""
        width={36}
        height={36}
        priority
      />
      {showWordmark ? (
        <span
          className={`font-[family-name:var(--font-syne)] text-lg font-semibold tracking-tight ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          Everyday Tech
          <span
            className={`ml-1.5 text-xs font-medium tracking-wide ${
              inverted ? "text-white/60" : "text-muted"
            }`}
          >
            LLC
          </span>
        </span>
      ) : null}
    </Link>
  );
}
