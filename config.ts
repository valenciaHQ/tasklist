/* Here a custom server may be configured - commented in order to build docker img properly
const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
*/

export const server = "http://localhost:3000";
