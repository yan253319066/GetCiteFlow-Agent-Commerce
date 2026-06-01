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
