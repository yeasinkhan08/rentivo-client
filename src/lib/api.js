const API_URL = process.env.NEXT_PUBLIC_API_URL;

// public requests (no login needed)
export async function publicFetch(path) {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
}

// private requests: gets a JWT from our Next.js route, then calls the Express server
export async function apiFetch(path, options = {}) {
  const tokenRes = await fetch("/api/jwt");
  if (!tokenRes.ok) throw new Error("Please log in again.");
  const { token } = await tokenRes.json();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// upload an image to imgbb and return its URL
export async function uploadImage(file) {
  const body = new FormData();
  body.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body },
  );
  const json = await res.json();
  if (!json.success) throw new Error("Image upload failed");
  return json.data.url;
}
