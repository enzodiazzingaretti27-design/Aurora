import type { PropertyData } from "@/types/property";
import { auroraProperty } from "./aurora";
import { segundaCasaProperty } from "./segunda-casa";

export const properties = {
  aurora: auroraProperty,
  "segunda-casa": segundaCasaProperty,
} satisfies Record<string, PropertyData>;

export type PropertySlug = keyof typeof properties;

export const propertySlugs = Object.keys(properties) as PropertySlug[];

export function getProperty(slug: string): PropertyData | undefined {
  return properties[slug as PropertySlug];
}
