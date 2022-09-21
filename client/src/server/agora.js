import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "871b434bcf5a497ead9d2160e52b815e";

// This token is only good for four hours. Blake is looking into finding a more permanent solution.

const token =
  "007eJxTYDDbJ/7tSJbPPRuPHosWiXdFbWE9gde8pnbwblq5+GSbRpkCg4W5YZKJsUlScpppoomleWpiimWKkaGZQaqpUZKFoWnq2VTtZN/tOslZ4S8YGRkgEMRnYchNzMxjYAAAXNsgzA==";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
