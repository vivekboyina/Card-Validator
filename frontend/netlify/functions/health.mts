// Mirrors GET /api/health from the Flask backend.
export default async () => Response.json({ status: "ok" });

export const config = {
  path: "/api/health",
  method: "GET",
};
