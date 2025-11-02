import type { FormValuesWithCodecAndBitrate } from "@/types";
import isCodecType from "@/utils/isCodecType";
import * as Ch from "@chakra-ui/react";
import type { UseFormReturn } from "react-hook-form";
import { audioConfig, type AudioCodec } from "@/config/audio";

export interface CodecAndBitrateFieldsProps<
  T extends FormValuesWithCodecAndBitrate,
> {
  /**
   * A form object return from a useForm hook call.
   */
  form: UseFormReturn<T, any, T>;
}

/**
 * Contains a pair of required fields, bitrate and codec, to use with a form.
 */
export default function CodecAndBitrateFields<
  T extends FormValuesWithCodecAndBitrate,
>({ form }: CodecAndBitrateFieldsProps<T>) {
  const codec: AudioCodec = form.watch("codec" as any);

  return (
    <>
      <Ch.Field.Root invalid={!!form.formState.errors.codec} required>
        <Ch.Field.Label>
          Desired Audio Codec
          <Ch.Field.RequiredIndicator />
        </Ch.Field.Label>

        <Ch.NativeSelect.Root>
          <Ch.NativeSelect.Field {...form.register("codec" as any)}>
            {[...audioConfig.codecs.lossy, ...audioConfig.codecs.lossless].map(
              (codec, index) => (
                <option key={index} value={codec}>
                  {codec}
                </option>
              )
            )}
          </Ch.NativeSelect.Field>
          <Ch.NativeSelect.Indicator />
        </Ch.NativeSelect.Root>

        <Ch.Field.ErrorText>
          {form.formState.errors.codec?.message as any}
        </Ch.Field.ErrorText>

        <Ch.Field.HelperText>
          The desired audio file output type.
        </Ch.Field.HelperText>
      </Ch.Field.Root>

      <Ch.Show when={isCodecType(codec, "lossy")}>
        <Ch.Field.Root invalid={!!form.formState.errors.bitrate} required>
          <Ch.Field.Label>
            Bitrate <Ch.Field.RequiredIndicator />
          </Ch.Field.Label>

          <Ch.NativeSelect.Root>
            <Ch.NativeSelect.Field {...form.register("bitrate" as any)}>
              {audioConfig.bitrates.map((bitrate, index) => (
                <option value={bitrate} key={index}>
                  {bitrate} kB/s
                </option>
              ))}
            </Ch.NativeSelect.Field>
            <Ch.NativeSelect.Indicator />
          </Ch.NativeSelect.Root>

          <Ch.Field.ErrorText>
            {form.formState.errors.bitrate?.message as any}
          </Ch.Field.ErrorText>

          <Ch.Field.HelperText>
            The higher the bitrate, the better the audio quality.
          </Ch.Field.HelperText>
        </Ch.Field.Root>
      </Ch.Show>
    </>
  );
}
