# Search Console Launch Checklist

## Before launch

- Set `NUXT_SITE_URL` to the production domain.
- Replace `public/google-site-verification.html` or add the production verification meta tag.
- Confirm `/robots.txt` is accessible and does not block public directories.
- Confirm `/sitemap.xml` is reachable after deployment.

## Metadata review

- Check every public page has a unique title and description.
- Confirm canonical tags use the production domain.
- Verify blog posts and FAQ pages output visible structured data that matches page content.
- Check Open Graph images resolve from production URLs.

## Crawlability review

- Ensure public routes render key content server-side.
- Confirm `patient`, `admin`, and `auth` routes are blocked from indexing.
- Review internal links between treatments, hospitals, doctors, destinations, and blog pages.

## Google Search Console steps

1. Add the deployed domain property in Search Console.
2. Verify ownership with the HTML file or meta tag.
3. Submit `https://your-domain.example/sitemap.xml`.
4. Inspect key pages such as the homepage, treatments index, a treatment detail page, and a blog article.
5. Monitor coverage, mobile usability, and enhancement reports after the first crawl.
