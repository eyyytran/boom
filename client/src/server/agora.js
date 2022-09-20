import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "871b434bcf5a497ead9d2160e52b815e";

// This token is only good for four hours. Blake is looking into finding a more permanent solution.
<<<<<<< HEAD
const token = "007eJxTYJhX6fd08d0T/X8El08PnLEnUmfFjiIxlplVxyQ2bdN5LfpdgcHC3DDJxNgkKTnNNNHE0jw1McUyxcjQzCDV1CjJwtA09fh+zWR3Qe3kVLHdDIxQCOKzMOQmZuYxMAAAyKwgww==";

=======

const token =
  "007eJxTYJhX6fd08d0T/X8El08PnLEnUmfFjiIxlplVxyQ2bdN5LfpdgcHC3DDJxNgkKTnNNNHE0jw1McUyxcjQzCDV1CjJwtA09fh+zWR3Qe3kVLHdDIxQCOKzMOQmZuYxMAAAyKwgww==";
>>>>>>> 22d1703c1dbe71cffa24e93de2e4b1b22934e0f5
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
