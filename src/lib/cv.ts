import { site } from "@/data/site";

/** Downloads the CV if the file exists. Returns false when it is not available. */
export async function downloadCv(): Promise<boolean> {
  try {
    const res = await fetch(site.cv, { method: "HEAD" });
    if (!res.ok) return false;
  } catch {
    return false;
  }
  const a = document.createElement("a");
  a.href = site.cv;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
  return true;
}
