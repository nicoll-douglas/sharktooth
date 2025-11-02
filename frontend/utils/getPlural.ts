/**
 * Gets the plural or singular form of a noun depending on its count.
 *
 * @param noun A singular noun.
 * @param count The count of that noun i.e how many items.
 * @returns The singular or plural form.
 */
export default function getPlural(noun: string, count: number): string {
  return count === 1 ? noun : `${noun}s`;
}
