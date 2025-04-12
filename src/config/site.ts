import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Alright",
  author: "John Anvarov",
  description:
    "Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://anvarv.uz",
  },
  links: {
    github: "https://github.com/mukhammadxuja",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
