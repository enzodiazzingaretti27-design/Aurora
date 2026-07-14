import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyLanding from "@/components/PropertyLanding";
import { getProperty, propertySlugs } from "@/data/properties";

export function generateStaticParams() {
  return propertySlugs.map((property) => ({ property }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ property: string }>;
}): Promise<Metadata> {
  const { property } = await params;
  const data = getProperty(property);
  if (!data) return {};

  return {
    title: `${data.brandName} — ${data.copy.es.footerPlace}`,
    description: data.copy.es.experienceText,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ property: string }>;
}) {
  const { property } = await params;
  const data = getProperty(property);

  if (!data) {
    notFound();
  }

  return <PropertyLanding data={data} />;
}
