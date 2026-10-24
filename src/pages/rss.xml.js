import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Is It Special? | Unfiltered Product Teardowns & Consumer Criticism',
    description: 'Unvarnished, data-driven critiques of viral products, everyday marvels, and industrial design. We answer whether something is truly special or pure marketing.',
    site: context.site || 'https://www.isitspecial.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: (post.data.lang === 'hi' || post.id.startsWith('hi/'))
        ? `/hi/blog/${post.id.replace(/^hi\//, '')}/`
        : `/blog/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: `<language>en-us</language><atom:link href="https://www.isitspecial.com/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />`,
  });
}
