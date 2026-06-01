import {siteUrl, siteName, siteDescription} from '@/lib/constants';
import {faqData} from '@/lib/faq-data';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `${siteName} Agent Commerce`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: siteDescription,
        url: siteUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          name: siteName,
        },
      },
      {
        '@type': 'WebApplication',
        name: `${siteName} Agent Commerce`,
        url: siteUrl,
        description:
          'AI Agent commerce configuration generator. Convert any website into an AI agent-ready store with automated product feeds, checkout endpoints, and payment provider detection.',
        browserRequirements: 'Requires modern browser with JavaScript enabled',
        applicationSuite: siteName,
      },
      {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        description: 'AI Agent commerce platform that enables autonomous shopping experiences.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
        ],
      },
      {
        '@type': 'WebSite',
        name: `${siteName} Agent Commerce`,
        url: siteUrl,
      },
      {
        '@type': 'HowTo',
        name: 'How to Make Your Website AI Agent-Ready with GetCiteFlow',
        description:
          'Generate agent commerce configurations for any website, enabling AI agents to discover, browse, and purchase products autonomously.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter your website URL',
            text: 'Input your store URL into the GetCiteFlow manifest generator on the homepage.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'AI analyzes your store',
            text: 'The AI engine crawls your product catalog, detects checkout endpoints and payment providers, then generates three standardized JSON manifest files.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Upload manifests to your server',
            text: 'Place the generated JSON files in your server\'s public directory. No backend modifications required.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'AI agents can now shop from your store',
            text: 'Your store is discoverable by AI agents that can browse, select, and purchase products using the x402 payment protocol on the Base blockchain.',
          },
        ],
      },
    ],
  };

  let jsonString: string;
  try {
    jsonString = JSON.stringify(schema);
  } catch {
    jsonString = '{}';
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: jsonString}}
    />
  );
}
