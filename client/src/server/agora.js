import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "871b434bcf5a497ead9d2160e52b815e";
const token = "007eJxTYJhSdqCB/93qq03XV97d85at1re8ujHi2CJn4UffvEynZWsqMFiYGyaZGJskJaeZJppYmqcmplimGBmaGaSaGiVZGJqm9s9TSeb/oJoc3nyZkZEBAkF8FobcxMw8BgYA9YciSg==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
