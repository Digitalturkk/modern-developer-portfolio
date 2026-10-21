import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Farid Huseynov — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "src/app/icon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#101218",
          color: "#dcd6c8",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logoSrc} width={96} height={96} style={{ marginBottom: 40 }} />
        <div style={{ fontSize: 28, color: "#8fa8d4", marginBottom: 24 }}>faridhuseynov.dev</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>Farid Huseynov</div>
        <div style={{ fontSize: 34, color: "#9c978c", marginTop: 16 }}>
          Software Engineer. Java, Spring Boot, backend systems.
        </div>
      </div>
    ),
    size,
  );
}
