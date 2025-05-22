import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFile } from 'fs/promises';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/filmlist', changefreq: 'weekly', priority: 0.9 },
  { url: '/cinemalist', changefreq: 'weekly', priority: 0.8 },
  { url: '/promotion', changefreq: 'weekly', priority: 0.7 },
  { url: '/movie/676a5a6b5a1a0af36bcda847', changefreq: 'weekly', priority: 0.9 },
  { url: '/movie/67310a23abf676d312156c6f', changefreq: 'weekly', priority: 0.9 },
  { url: '/movie/6730afcba7927091fa04dea5', changefreq: 'weekly', priority: 0.9 },
];

const sitemap = new SitemapStream({ hostname: 'https://ceecine.vercel.app' });

streamToPromise(sitemap)
  .then((data) => {
      return writeFile('./public/sitemap.xml', data.toString());
    })
  .then(() => {
    console.log('✅ Sitemap created!');
  })
  .catch(err => {
    console.error('❌ Error creating sitemap:', err);
  });

links.forEach(link => sitemap.write(link));
sitemap.end();