const dev = process.env.NODE_ENV !== "production";

// Here a custom server may be configured
export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
