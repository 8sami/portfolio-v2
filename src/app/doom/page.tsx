import { Heading, Text, Column } from '@once-ui-system/core';
import { baseURL, doom } from '@/resources';
export async function generateMetadata() {
  const title = doom.title;
  const description = doom.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}{doom.path}`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
export default function DoomPage() {
  return (
    <Column maxWidth='s' gap='xl' paddingY='12' horizontal='center'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': doom.title,
            'description': doom.description,
            'url': `https://${baseURL}${doom.path}`,
            'image': `https://${baseURL}/og?title=${doom.label}`,
          }),
        }}
      />
      <Column
        gap='s'
        vertical='center'
        direction='column'
        fillWidth
        horizontal='center'
      >
      <Heading variant='display-strong-m'>{doom.label}</Heading>
        <Text
          variant='body-default-l'
          style={{ textAlign: 'center' }}
        >
          {doom.description}
        </Text>
      </Column>
      <Column gap='s' maxWidth='s' horizontal='center'>
        <Text
          style={{ textAlign: 'center', marginTop: 'auto' }}
          variant='label-default-xs'
          onBackground='neutral-weak'
        >
          {doom.controls}
        </Text>
        <iframe
          src={doom.iframe.link}
          style={{
            border: 'none',
            maxWidth: '700px',
            width: '100%',
            aspectRatio: '16/10',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          }}
          title={doom.title}
          allowFullScreen
        />
      </Column>
    </Column>
  );
}
