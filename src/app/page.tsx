import HomePage from "@/pages/HomePage";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucky Angelo Rabosa",
  alternateName: "Lucky Angelo",
  jobTitle: "Full-Stack Developer",
  url: "https://luckyme.vercel.app",
  email: "angelorabosa5@gmail.com",
  image: "https://luckyme.vercel.app/og-image.png",
  sameAs: [
    "https://github.com/lucky0559",
    "https://www.linkedin.com/in/lucky-angelo-aa7253217/"
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH"
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Tailwind CSS"
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="portfolio-main">
        <HomePage />
      </main>
    </>
  );
}
