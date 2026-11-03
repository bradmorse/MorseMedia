// Line-break helpers for short labels such as eyebrows and town lists.

export const NBSP = '\u00a0';

/** Keeps a phrase on one line: "Thompson's Station", "Nashville, Tennessee", "From $950". */
export function keepTogether(text: string) {
  return text.replace(/ /g, NBSP);
}

/**
 * Joins items with middle dots so a line never starts with a dot and an item is never split
 * across lines: "Downtown · The Gulch · SoBro". The dot stays with the item before it.
 */
export function dotList(items: Array<string | false | null | undefined>) {
  return items.filter((item): item is string => Boolean(item)).map(keepTogether).join(`${NBSP}· `);
}
