import Image from "next/image";

/** Great Wave logo. The artwork lives in src/app/icon.svg, which is also the favicon. */
export function WaveMark({ className }: { className?: string }) {
  return <Image src="/icon.svg" alt="" width={28} height={28} unoptimized className={className} />;
}
