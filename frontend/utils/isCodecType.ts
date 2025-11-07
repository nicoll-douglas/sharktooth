import { audioConfig, type AudioCodec } from "shared/config/audio";

/**
 * Checks whether an audio codec is lossless or lossy.
 *
 * @param codec The audio codec to test.
 * @param type The codec type to check against, either "lossy" or "lossless".
 * @returns True if the codec is of the tested type, false otherwise.
 */
export default function isCodecType(
  codec: AudioCodec,
  type: "lossy" | "lossless"
) {
  if (type === "lossy") {
    return audioConfig.codecs.lossy.includes(
      codec as (typeof audioConfig.codecs.lossy)[number]
    );
  }

  return audioConfig.codecs.lossless.includes(
    codec as (typeof audioConfig.codecs.lossless)[number]
  );
}
