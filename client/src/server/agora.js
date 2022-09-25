import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

// Token Required
// const appId = "871b434bcf5a497ead9d2160e52b815e";

// Token NOT Required
const appId = "79c8a935177e4746930b3f2f7ba34def";

// This token is only good for four hours. Blake is looking into finding a more permanent solution.

const token =
  "007eJxTYPh0Se6avFvwKps5V27NC9SRP33J8dO6dl8Hi/PeB4XfmIcqMFiYGyaZGJskJaeZJppYmqcmplimGBmaGaSaGiVZGJqmfjXSTi5t0Un+87OYiZEBAkF8FobcxMw8BgYAolMh6g==";

export const config = { appId: appId, token: token, mode: "rtc", codec: "vp8" };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
