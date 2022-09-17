import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "871b434bcf5a497ead9d2160e52b815e";
const token = "007eJxTYLhkdenE3b3ONx/8CUmzefA8chZDRlDMucu/BFb3Gk7/J3tdgcHC3DDJxNgkKTnNNNHE0jw1McUyxcjQzCDV1CjJwtA0VVxMLXl6unpyuE0nKyMDBIL4LAy5iZl5DAwAO5IiMw==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
