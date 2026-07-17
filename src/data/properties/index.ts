import type { PropertyData } from "@/types/property";
import { potrerillosProperty } from "./potrerillos";
import { maipuProperty } from "./maipu";

// Las dos casas de Cecilia, ambas en Mendoza: la montaña (Potrerillos) y el
// vino (Maipú). El orden acá define el orden en que aparecen en la portada.
export const properties = {
  potrerillos: potrerillosProperty,
  maipu: maipuProperty,
} satisfies Record<string, PropertyData>;

export type PropertySlug = keyof typeof properties;

export const propertySlugs = Object.keys(properties) as PropertySlug[];

export function getProperty(slug: string): PropertyData | undefined {
  return properties[slug as PropertySlug];
}
