import { startingPrices as p } from "@/config/pricing";
import { usd } from "@/lib/format";
import type { Faq } from "./faq";

// Problem/answer pages under /fixes/[slug]. Slugs match content/woo-problems.ts.
// Structure: direct answer → causes → step-by-step fix (HowTo) → when to hire help → FAQ.

export type FixStep = { name: string; text: string };

export type FixGuide = {
  slug: string;
  metaTitle: string; // ≤ 60 chars
  metaDescription: string; // ≤ 155 chars
  h1: string;
  answer: string; // 40–60 words
  causesTitle: string;
  causes: { title: string; text: string }[];
  steps: FixStep[];
  whenToHire: string[];
  faqs: Faq[];
  related: string[]; // other fix slugs or service paths
  og: string;
};

export const fixGuides: FixGuide[] = [
  {
    slug: "woocommerce-checkout-redirects-to-homepage",
    metaTitle: "WooCommerce Checkout Redirects to Homepage? Fix It",
    metaDescription:
      "Customers click Place order and land on the homepage? It's usually caching or lost sessions. Here's how to find the cause and fix WooCommerce checkout.",
    h1: "Why does WooCommerce checkout redirect to the homepage?",
    answer:
      "When WooCommerce sends customers to the homepage after “Place order”, the cause is almost always caching or a lost session. A cache serves an old copy of the cart or checkout, or the session cookie is dropped by an http/https or www mismatch. Exclude cart, checkout and my-account from every cache, then check your WooCommerce page settings.",
    causesTitle: "What causes checkout to redirect?",
    causes: [
      {
        title: "Cart and checkout pages are cached",
        text: "A caching plugin, your host’s server cache or a CDN like Cloudflare serves a stored copy of the page. The stored page has no valid session, so WooCommerce can’t create the order and falls back to the homepage.",
      },
      {
        title: "The session cookie gets lost",
        text: "If the site loads on both http and https, or on both www and non-www, the browser treats them as different sites and drops the cart cookie between steps.",
      },
      {
        title: "Wrong page settings or a redirect rule",
        text: "The Checkout page in WooCommerce settings points at the wrong page, or a redirect plugin, .htaccess rule or custom code catches the checkout URL.",
      },
    ],
    steps: [
      { name: "Reproduce it", text: "Open the store in a private window, add a product and go through checkout. Note the exact URL where it jumps to the homepage." },
      { name: "Check the WooCommerce pages", text: "In WooCommerce → Settings → Advanced, make sure Cart, Checkout and My account point to the right pages and those pages contain the WooCommerce blocks or shortcodes." },
      { name: "Exclude WooCommerce pages from caching", text: "In your caching plugin, server cache and CDN, exclude /cart, /checkout, /my-account and WooCommerce AJAX requests (wc-ajax). Then purge every cache." },
      { name: "Make the site address consistent", text: "In Settings → General, both URLs should use https and the same www/non-www version. Redirect the other versions to it in one place only." },
      { name: "Switch off redirects one at a time", text: "Temporarily disable redirect plugins and custom redirect code, and check .htaccess, until checkout works. Then put back only what you need." },
      { name: "Test like a customer", text: "Place a real order while logged out, on a phone, and check the order and confirmation email arrive." },
    ],
    whenToHire: [
      "You can’t reach the hosting or CDN settings, or don’t know which cache is involved",
      "Only some customers are affected and you can’t reproduce it",
      "You’re losing orders right now and need it fixed today",
    ],
    faqs: [
      { q: "Can a caching plugin break WooCommerce checkout?", a: "Yes. Most caching plugins exclude WooCommerce pages automatically, but custom page names, a second cache layer or a CDN rule often undo that." },
      { q: "Why does it only happen to some customers?", a: "Usually because of a CDN serving cached pages to some locations, or because logged-in users (like you) skip the cache while customers don’t." },
      { q: "Will clearing my cache fix it?", a: "Only until the page is cached again. The fix is excluding the WooCommerce pages from caching for good." },
    ],
    related: ["woocommerce-orders-pending-payment", "woocommerce-slow-product-pages", "/woocommerce-developer"],
    og: "Why does WooCommerce checkout redirect to the homepage?",
  },
  {
    slug: "woocommerce-orders-pending-payment",
    metaTitle: "WooCommerce Orders Stuck on Pending Payment? Fix",
    metaDescription:
      "Customers were charged but WooCommerce orders stay on Pending payment? The payment confirmation isn't reaching your site. How to find and fix it.",
    h1: "Why are WooCommerce orders stuck on “Pending payment”?",
    answer:
      "WooCommerce keeps an order on “Pending payment” until the payment gateway confirms it. If customers were charged but orders stay pending, that confirmation (a webhook from Stripe or PayPal) isn’t reaching your site. Usually a firewall or security plugin blocks it, or the webhook URL or secret is wrong after a site move.",
    causesTitle: "What causes orders to stay pending?",
    causes: [
      { title: "Webhooks are blocked", text: "A security plugin, server firewall or Cloudflare rule blocks the gateway’s requests to your site, so WooCommerce never hears that the payment succeeded." },
      { title: "Wrong webhook URL or secret", text: "After moving domains, switching to https or reinstalling the plugin, the webhook in Stripe or PayPal points to an old address or uses an old signing secret." },
      { title: "The customer never finished paying", text: "Some pending orders are genuine: the customer left at the payment step. WooCommerce cancels unpaid orders automatically after the “Hold stock” time." },
    ],
    steps: [
      { name: "Check the gateway first", text: "In your Stripe or PayPal dashboard, open the payment for a stuck order. If it succeeded there, the problem is the confirmation, not the payment." },
      { name: "Look at webhook deliveries", text: "In the gateway’s webhook or developer section, check recent deliveries to your site. Failed deliveries show the error your site returned." },
      { name: "Match URL and secret", text: "Compare the webhook URL in the gateway with the one shown in your WooCommerce payment plugin settings, and paste the current signing secret into the plugin." },
      { name: "Allow the webhook through", text: "Whitelist the webhook endpoint in your security plugin, server firewall and CDN, so automated requests from the gateway aren’t blocked." },
      { name: "Read the logs", text: "Enable logging in the payment plugin and check WooCommerce → Status → Logs for errors on the next payment." },
      { name: "Test end to end", text: "Make a small live payment, confirm the order moves to Processing, then refund it." },
    ],
    whenToHire: [
      "Customers were charged but have no confirmed order",
      "Webhook deliveries fail and the error doesn’t make sense",
      "You use more than one gateway or a custom checkout",
    ],
    faqs: [
      { q: "Should I mark pending orders as Processing by hand?", a: "Only after confirming the payment succeeded in your gateway dashboard. Do it as a stop-gap while the webhook problem is fixed." },
      { q: "Why are some pending orders cancelled automatically?", a: "WooCommerce cancels unpaid orders after the “Hold stock (minutes)” setting in WooCommerce → Settings → Products → Inventory." },
      { q: "Can a caching plugin cause this?", a: "Rarely, but some page or server caches interfere with the order-received page. Webhooks blocked by security tools are far more common." },
    ],
    related: ["woocommerce-checkout-redirects-to-homepage", "woocommerce-emails-not-sending", "/woocommerce-developer"],
    og: "Why are WooCommerce orders stuck on Pending payment?",
  },
  {
    slug: "woocommerce-slow-product-pages",
    metaTitle: "Slow WooCommerce Product Pages? How to Speed Them Up",
    metaDescription:
      "Slow WooCommerce product and category pages are usually images, heavy themes, plugin scripts and caching. Measure first, then fix the biggest cause.",
    h1: "Why are WooCommerce product pages so slow?",
    answer:
      "Slow WooCommerce product and category pages are usually caused by oversized images, a heavy theme or page builder, plugins loading scripts on every page, and slow hosting or no object caching. Measure first with PageSpeed Insights on mobile, then fix the biggest item. Images and unused scripts are usually the quickest wins.",
    causesTitle: "What makes WooCommerce pages slow?",
    causes: [
      { title: "Oversized product images", text: "Photos uploaded at several MB each, with no resizing or modern formats, are the most common cause of a slow product page on mobile." },
      { title: "Too much code on every page", text: "Page builders, sliders, chat widgets and form plugins often load their scripts site-wide, even on pages that don’t use them." },
      { title: "Server and database", text: "Slow hosting, an old PHP version, no object cache and a database full of revisions and expired data slow down every uncached page." },
    ],
    steps: [
      { name: "Measure", text: "Run PageSpeed Insights on mobile for a product page, a category page and the homepage. Write down LCP, INP/TBT and CLS." },
      { name: "Fix images", text: "Resize product photos to the size they’re shown at, serve WebP or AVIF, and lazy-load images below the first screen." },
      { name: "Unload unused scripts", text: "Stop plugins loading their CSS and JavaScript on pages that don’t need them, and remove plugins you don’t use." },
      { name: "Cache properly", text: "Use page caching for product and category pages, keep cart, checkout and account pages uncached, and add an object cache like Redis if your host supports it." },
      { name: "Clean the database", text: "Remove expired transients, old revisions and leftover tables from deleted plugins, and check autoloaded options." },
      { name: "Measure again", text: "Re-run the same tests and compare. Fix the next biggest item only if it’s still worth it." },
    ],
    whenToHire: [
      "The page builder or theme is the bottleneck and you’re not sure what’s safe to remove",
      "Speed plugins made things worse or broke checkout",
      "You need real before/after numbers for your team or agency",
    ],
    faqs: [
      { q: "Will a speed plugin fix it?", a: "It can help with caching and minifying, but it can’t fix oversized images or a heavy theme, and aggressive settings often break checkout." },
      { q: "What’s a good target?", a: "Largest Contentful Paint under 2.5 seconds on mobile, and a PageSpeed performance score of 90+ where the theme allows it." },
      { q: "Do I need a CDN?", a: "It helps if your customers are far from your server. It isn’t a fix for heavy pages, though; fix the page weight first." },
    ],
    related: ["woocommerce-checkout-redirects-to-homepage", "wordpress-update-broke-site", "/website-speed-optimization"],
    og: "Why are WooCommerce product pages so slow?",
  },
  {
    slug: "wordpress-update-broke-site",
    metaTitle: "WordPress Update Broke Your Site? How to Fix It",
    metaDescription:
      "Critical error or white screen after a WordPress, plugin or theme update? How to get back in, find the cause, roll back safely and update safely next time.",
    h1: "What do you do when a WordPress update breaks your site?",
    answer:
      "If a plugin, theme or WordPress update broke your site, stop updating and don’t start deleting things. Use the recovery-mode link WordPress emails to the admin, or rename the faulty plugin’s folder over FTP to switch it off. Then read the error log, roll back to the previous version, and test future updates on staging first.",
    causesTitle: "Why do updates break WordPress sites?",
    causes: [
      { title: "Incompatible plugin or theme", text: "A plugin or theme hasn’t been updated for the new WordPress, WooCommerce or PHP version, and now throws a fatal error." },
      { title: "Two plugins clash", text: "An update changes how one plugin works, and another plugin that depended on the old behaviour breaks." },
      { title: "Outdated template files", text: "Themes that override WooCommerce templates break when WooCommerce changes those templates in an update." },
    ],
    steps: [
      { name: "Get back in", text: "Check the admin email for WordPress’s “recovery mode” link. It logs you in with the faulty plugin paused." },
      { name: "Find the cause", text: "Turn on WP_DEBUG_LOG in wp-config.php and read wp-content/debug.log. The error names the plugin or theme file." },
      { name: "Switch the culprit off", text: "If you can’t log in, rename the plugin’s folder in wp-content/plugins over FTP or your host’s file manager. WordPress deactivates it." },
      { name: "Roll back or restore", text: "Install the previous version of the plugin, or restore last night’s backup if several things changed at once." },
      { name: "Fix it properly", text: "Update or replace the incompatible plugin, update outdated theme templates, and check your PHP version is supported." },
      { name: "Update safely next time", text: "Take a backup before updates and test them on a staging copy first. Turn off auto-updates for plugins that have caused trouble." },
    ],
    whenToHire: [
      "You can’t get into the admin or the hosting file manager",
      "The error log points to code you don’t recognise",
      "It’s a store and customers can’t check out",
    ],
    faqs: [
      { q: "What does “There has been a critical error on this website” mean?", a: "A PHP fatal error stopped the page from loading. WordPress hides the details from visitors; the error log or recovery email tells you which file caused it." },
      { q: "Will I lose my content?", a: "Almost never. Posts, pages and orders are in the database, which plugin updates don’t usually touch. Take a backup before trying fixes anyway." },
      { q: "Should I turn off auto-updates?", a: "Keep security updates on. For big plugins like WooCommerce or page builders, update manually after testing on staging." },
    ],
    related: ["woocommerce-emails-not-sending", "woocommerce-slow-product-pages", "/wordpress-website-fixes"],
    og: "What to do when a WordPress update breaks your site",
  },
  {
    slug: "woocommerce-emails-not-sending",
    metaTitle: "WooCommerce Emails Not Sending? How to Fix Them",
    metaDescription:
      "Order confirmation emails not arriving or landing in spam? WooCommerce emails need SMTP and proper DNS records. Here's how to fix and test them.",
    h1: "Why aren’t WooCommerce order emails being sent?",
    answer:
      "WooCommerce emails usually fail because WordPress sends them through the server’s built-in PHP mail, which many inboxes distrust or reject. Missing SPF, DKIM and DMARC records make it worse. Send through an SMTP or transactional email service instead, add those DNS records, and check each email is enabled in WooCommerce settings.",
    causesTitle: "What stops WooCommerce emails arriving?",
    causes: [
      { title: "The server’s default mailer", text: "PHP mail sends from your web server, which isn’t trusted by Gmail, Outlook and others, so emails go to spam or disappear." },
      { title: "Missing DNS records", text: "Without SPF, DKIM and DMARC records, receiving servers can’t verify that your store is allowed to send from your domain." },
      { title: "Settings and recipients", text: "An email type is switched off in WooCommerce, the admin recipient address is wrong, or a plugin overrides the templates." },
    ],
    steps: [
      { name: "Check WooCommerce email settings", text: "In WooCommerce → Settings → Emails, make sure each email is enabled and the admin recipient addresses are right." },
      { name: "Log outgoing emails", text: "Install an email log plugin and place a test order to see whether WordPress tries to send the email at all." },
      { name: "Send through SMTP", text: "Connect WordPress to an SMTP or transactional email service with an SMTP plugin, using a From address on your own domain." },
      { name: "Add SPF, DKIM and DMARC", text: "Add the DNS records your email service gives you, so inboxes can verify the emails really come from your store." },
      { name: "Test every email", text: "Trigger new order, processing, completed and refunded emails, and check they arrive in the inbox, not spam." },
    ],
    whenToHire: [
      "You don’t have access to your domain’s DNS",
      "Emails still go to spam after setting up SMTP",
      "You need branded email templates or extra notifications",
    ],
    faqs: [
      { q: "Can I just use my Gmail account to send store emails?", a: "It works for a very small store, but a transactional email service on your own domain is more reliable and won’t hit Gmail’s sending limits." },
      { q: "Why do some emails arrive and others don’t?", a: "Different recipients filter differently. Without SPF and DKIM, some providers accept your mail and others silently drop it." },
      { q: "Does this also fix contact form emails?", a: "Yes. Once WordPress sends through SMTP, contact form and password reset emails use the same reliable route." },
    ],
    related: ["woocommerce-orders-pending-payment", "wordpress-update-broke-site", "/wordpress-website-fixes"],
    og: "Why aren't WooCommerce order emails being sent?",
  },
];

export const fixPrice = `Fixes from ${usd(p.fix)}`;

export function getFixGuide(slug: string) {
  return fixGuides.find((f) => f.slug === slug) ?? null;
}
