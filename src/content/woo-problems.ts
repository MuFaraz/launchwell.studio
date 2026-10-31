export type WooProblem = {
  id: string;
  slug: string; // /fixes/[slug]
  title: string;
  symptom: string;
  causes: string[];
  fix: string[];
  time: string;
};

export const wooProblems: WooProblem[] = [
  {
    id: "checkout-redirect",
    slug: "woocommerce-checkout-redirects-to-homepage",
    title: "Checkout sends people back to the homepage",
    symptom:
      "A customer clicks “Place order” and lands on the homepage. No order, no error, no email. Or the cart empties itself halfway through.",
    causes: [
      "Cart and checkout pages are being cached by a plugin, the host or a CDN",
      "Session cookies blocked or dropped (http/https or www/non-www mismatch)",
      "Wrong page set as Checkout in WooCommerce settings, or a redirect rule catching it",
    ],
    fix: [
      "Exclude cart, checkout and my-account from every cache layer",
      "Check the page assignments and trace the redirect in the logs",
      "Place real test orders on staging, then on live, before we call it done",
    ],
    time: "Usually within 1–2 days",
  },
  {
    id: "payments",
    slug: "woocommerce-orders-pending-payment",
    title: "Payments fail or orders stay “Pending payment”",
    symptom:
      "The customer was charged, but the order still says Pending. Or Stripe/PayPal shows an error at checkout and people give up.",
    causes: [
      "Webhooks from Stripe or PayPal not reaching your site (firewall or security plugin blocks them)",
      "Old API keys or the wrong webhook secret after a site move",
      "A theme or plugin breaking the payment form’s JavaScript",
    ],
    fix: [
      "Check the webhook endpoint and secret, and allow it through the firewall",
      "Read the gateway logs and order notes to find the exact failing step",
      "Run a live payment and refund it, so you see it working end to end",
    ],
    time: "Usually 1 day",
  },
  {
    id: "slow",
    slug: "woocommerce-slow-product-pages",
    title: "Product and category pages are slow",
    symptom:
      "Pages take 4–6 seconds on a phone. Google PageSpeed is red. You’ve installed two speed plugins and it got worse.",
    causes: [
      "Huge images, and a page builder loading everything on every page",
      "Plugins loading their scripts site-wide when they’re only needed on one page",
      "No object caching, slow hosting, or a bloated database",
    ],
    fix: [
      "Measure first, so you get real before-and-after numbers",
      "Compress images, load scripts only where they’re needed, remove what isn’t used",
      "Set up caching properly, with cart and checkout excluded",
    ],
    time: "Usually 2–3 days",
  },
  {
    id: "conflict",
    slug: "wordpress-update-broke-site",
    title: "An update broke the site",
    symptom:
      "You updated a plugin or WooCommerce and now see “There has been a critical error”, a white screen, or a layout that fell apart.",
    causes: [
      "A plugin that doesn’t support the new WooCommerce or PHP version",
      "Two plugins changing the same thing in different ways",
      "Theme template files that are out of date with WooCommerce",
    ],
    fix: [
      "Get the site back up first, then read the error log to find the cause",
      "Patch or replace the plugin, and update outdated template files",
      "Set up staging and backups, so the next update is tested before it hits live",
    ],
    time: "Back up within hours",
  },
  {
    id: "emails",
    slug: "woocommerce-emails-not-sending",
    title: "Order emails don’t arrive",
    symptom:
      "Customers say they never got a confirmation. You don’t get “New order” emails either, or they land in spam.",
    causes: [
      "The site sends mail through the server’s default mailer, which inboxes don’t trust",
      "Missing SPF/DKIM records for your domain",
      "Email templates disabled or the wrong recipient set",
    ],
    fix: [
      "Send through a proper SMTP or transactional email service",
      "Add the SPF, DKIM and DMARC records to your domain",
      "Test every order email: new, processing, completed, refunded",
    ],
    time: "Usually within 1–2 days",
  },
];
