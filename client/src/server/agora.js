import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "871b434bcf5a497ead9d2160e52b815e";

// This token is only good for four hours. Blake is looking into finding a more permanent solution.

const token =
  "007eJxTYOBhV/q8zu7Y+/UbbjRsM6w7eejk5ymfmx67ttkxrA4M3cmswGBhbphkYmySlJxmmmhiaZ6amGKZYmRoZpBqapRkYWiaekNcOzkiUye5ahk3CyMDBIL4LAy5iZl5DAwA0JchKw==";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
