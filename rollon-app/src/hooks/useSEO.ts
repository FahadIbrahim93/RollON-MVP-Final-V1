import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const defaultSEO = {
  title: 'RollON - Premium Smoking Accessories in Bangladesh',
  description: 'Shop premium quality smoking accessories in Bangladesh. Grinders, vaporizers, papers, lighters and more. Fast delivery across Bangladesh.',
  image: '/images/og-image.jpg',
  siteName: 'RollON Bangladesh',
};

export function useSEO(props: SEOProps = {}) {
  const location = useLocation();
  const fullTitle = props.title ? `${props.title} | ${defaultSEO.siteName}` : defaultSEO.title;

  const metaTags = [
    { title: fullTitle },
    { name: 'description', content: props.description || defaultSEO.description },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: props.description || defaultSEO.description },
    { property: 'og:image', content: props.image || defaultSEO.image },
    { property: 'og:type', content: props.type || 'website' },
    { property: 'og:url', content: `https://rollon.com.bd${location.pathname}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: props.description || defaultSEO.description },
    { name: 'twitter:image', content: props.image || defaultSEO.image },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'RollON Bangladesh' },
    { name: 'keywords', content: 'smoking accessories, grinders, vaporizers, rolling papers, lighters, Bangladesh, online shop' },
  ];

  const linkTags = [
    { rel: 'canonical', href: `https://rollon.com.bd${location.pathname}` },
  ];

  return { metaTags, linkTags };
}
