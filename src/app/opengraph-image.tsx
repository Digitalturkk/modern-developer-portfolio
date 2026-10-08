import { ImageResponse } from "next/og";

export const alt = "Farid Huseynov — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#0a0a0b",
          color: "#ededee",
        }}
      >
        <div style={{ fontSize: 28, color: "#8b9cff", marginBottom: 24 }}>faridhuseynov.dev</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>Farid Huseynov</div>
        <div style={{ fontSize: 34, color: "#8e8e98", marginTop: 16 }}>
          Software Engineer. Java, Spring Boot, backend systems.
        </div>
      </div>
    ),
    size,
  );
}
