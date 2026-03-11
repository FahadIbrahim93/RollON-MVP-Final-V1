import { useSEO, type SEOProps } from '@/hooks/useSEO';

export function SEOHead(props: SEOProps) {
  const { metaTags, linkTags } = useSEO(props);
  
  return (
    <>
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      {linkTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
    </>
  );
}
