/**
 * Blog — 14 članaka na engleskom i 14 na hrvatskom. Tekst je napisao kolega u
 * previewu (donebyzip-preview.vercel.app, listopad 2026); prenesen je
 * skriptom iz tog HTML-a, bez prepravljanja. Petar je blog odobrio 2026-10-14
 * (artifact, odluka „blog“), uz uvjet da prije objave pregleda izvore koji
 * vode na druge agencije (lenko-dizajn.hr, metadigital.hr).
 *
 * `html` je naš statični sadržaj (h2, h3, p, ul, ol, li, a, strong, em), ne
 * unos korisnika. `alt` je slug istog članka na drugom jeziku (za hreflang).
 */

export type BlogPost = {
  lang: "en" | "hr";
  slug: string;
  alt: string | null;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  date: string;
  minutes: number;
  intro: string;
  html: string;
  sources: { label: string; href: string }[];
  related: { label: string; href: string } | null;
};

export const posts: BlogPost[] = [
  {
    "related": {
      "href": "/#how",
      "label": "How the free check works"
    },
    "lang": "en",
    "slug": "google-business-profile-mistakes",
    "title": "7 Google profile mistakes that stop customers finding you",
    "metaTitle": "7 Google profile mistakes that stop customers finding you | zip",
    "description": "The most common mistakes on a small business Google Business profile and how to fix them in an afternoon: category, hours, reviews, photos and more.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Your Google profile is often the first thing people see about your business, before your website and before they call. These are the mistakes that most often hold small businesses back, and how to fix them in an afternoon.",
    "html": "<p>Google says local results depend on three things: how well a profile matches what someone is looking for, how close you are to them, and how well-known your business is. You can’t change the distance, but you can work on the other two. First of all: your profile has to be verified, or you can’t edit it.</p>\n<h2>1. The wrong or a too-general category</h2>\n<p>Your primary category tells Google what you do. Pick the most specific one available, for example “Hair salon” rather than “Beauty salon” if you only do hair. Add your other services as additional categories.</p>\n<h2>2. The profile doesn’t link to your site, or links to the wrong page</h2>\n<p>Without a website link, people who want more information have nowhere to go. If the link lands on a home page without even a phone number, you’ve lost them. Link to a page with a clear way to get in touch.</p>\n<h2>3. Wrong opening hours</h2>\n<p>Nothing breaks trust faster than a locked door when Google says you’re open. Add special hours for public holidays and time off too.</p>\n<h2>4. Name, address and phone don’t match</h2>\n<p>If your profile shows one number, your website another and Facebook a third, both people and Google get confused. Write your business name, address and phone exactly the same way everywhere.</p>\n<h2>5. No photos, or old ones</h2>\n<p>Google recommends photos and videos because they show customers what you offer. Add real photos of your space, your team and your work, and refresh them now and then.</p>\n<h2>6. Reviews without replies</h2>\n<p>Google recommends replying to reviews. Reply to every one, good and bad, briefly and politely. Customers read your replies, not just the reviews.</p>\n<h2>7. An empty description and services</h2>\n<p>The description and services are where you say, in your own words, what you do and where. Write them the way a customer would search for you: “haircuts and colouring, Trešnjevka, Zagreb”, not “premium tailored service”.</p>\n<h2>Quick check</h2>\n<ul><li>The profile is verified.</li><li>The primary category is as specific as possible.</li><li>The link goes to a page with a phone number or a form.</li><li>Opening hours are correct, including holidays.</li><li>Name, address and phone are the same everywhere.</li><li>There are real photos from the last few months.</li><li>Every review has a reply.</li><li>The description and services use the words customers search with.</li></ul>",
    "sources": [
      {
        "label": "Google: how local ranking works",
        "href": "https://support.google.com/business/answer/7091"
      }
    ],
    "alt": "greske-na-google-business-profilu"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "why-google-cant-find-your-website",
    "title": "Why people can’t find you on Google even though you have a website",
    "metaTitle": "Why people can’t find you on Google even though you have a website | zip",
    "description": "You have a website, but you’re nowhere on Google? The five most common reasons, and how to check each one yourself in ten minutes.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "The site exists, you pay for the domain and hosting, and when you type your service into Google everyone shows up except you. The reason is almost always one of these five.",
    "html": "<h2>1. Google hasn’t indexed the site at all</h2>\n<p>Type site:yourdomain.com into Google (with your domain). If no pages show up, Google hasn’t added you to its results yet. A new site needs time, and it helps to add it to Google Search Console and submit a sitemap.</p>\n<h2>2. The site tells Google not to show it</h2>\n<p>While a site is being built, a setting that tells Google not to show it (called noindex) is often switched on. If nobody switches it off at launch, the site stays invisible no matter what else you do. Search Console shows this in the indexing report.</p>\n<h2>3. The site doesn’t say what people search for</h2>\n<p>People search for “plumber Dubrava” or “accountant for sole traders Zagreb”. If your site only says “Quality and reliability since 2005”, Google doesn’t know what to show you for. The page title, the main heading and the first paragraph should say what you do and where.</p>\n<h2>4. Your Google profile isn’t linked to the site</h2>\n<p>For local searches, your Google Business profile does a lot of the work. <a href=\"https://support.google.com/business/answer/7091\" target=\"_blank\" rel=\"noopener noreferrer\">Google</a> says local ranking depends on how well a profile matches the search, distance and how well-known a business is. A profile without a link to your site and a site without a profile each do half the job.</p>\n<h2>5. The competition is simply stronger</h2>\n<p>Sometimes everything is technically fine, but others have more reviews, more content and have been around longer. Then only patient work helps: an accurate profile, regular reviews and a page for each main service.</p>\n<h2>A ten-minute check</h2>\n<ol><li>Type site:yourdomain.com and see whether there are results.</li><li>Type your service and neighbourhood or town and see who shows up.</li><li>Open your home page and check whether the first paragraph says what you do and where.</li><li>Check that your Google profile links to your site.</li></ol>",
    "sources": [
      {
        "label": "Google: how local ranking works",
        "href": "https://support.google.com/business/answer/7091"
      },
      {
        "label": "Google Search Central: ask Google to recrawl",
        "href": "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
      }
    ],
    "alt": "zasto-vas-ne-nalaze-na-googleu"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "how-long-until-my-site-shows-up-on-google",
    "title": "How long it really takes for your website to show up on Google",
    "metaTitle": "How long it really takes for your website to show up on Google | zip",
    "description": "How long until a new website gets into Google, and when people can actually expect to find you. What Google says and what you can speed up.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "You’ve launched your site and you’re waiting. Two different things get mixed up here: when Google includes you at all, and when people actually find you.",
    "html": "<h2>Getting included: days to weeks</h2>\n<p>Google says crawling can take anywhere from a few days to a few weeks, and that requesting a crawl doesn’t guarantee the page will appear in results instantly, or at all. Nobody can promise you an exact date.</p>\n<h2>Ranking: usually longer</h2>\n<p>Being included doesn’t mean you’re on the first page. For searches where competitors have been around for years, a new site realistically needs months. When someone types your exact business name, you’ll show up much faster than for a general term like “web design Zagreb”.</p>\n<h2>What you can speed up</h2>\n<ul><li>Add the site to Google Search Console and submit a sitemap.</li><li>Check that the site doesn’t tell Google not to show it (noindex).</li><li>Link your Google Business profile to the site.</li><li>Give each main service its own page with a clear title.</li><li>Link to the site from places that already exist: your profile, social media, directories.</li></ul>\n<h2>What doesn’t help</h2>\n<p>Sending Google the same request again and again doesn’t speed anything up, and Google says there are limits on it. Services promising “page one in a week” usually can’t deliver.</p>\n<h2>While you wait</h2>\n<p>For local searches, a Google profile often shows up sooner than the site itself. If you need enquiries now, Google Ads work from day one while SEO works in the background.</p>",
    "sources": [
      {
        "label": "Google Search Central: ask Google to recrawl",
        "href": "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
      }
    ],
    "alt": "koliko-traje-da-se-stranica-pojavi-na-googleu"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "google-ads-spending-but-phone-not-ringing",
    "title": "Why Google Ads is spending your budget and the phone isn’t ringing",
    "metaTitle": "Why Google Ads is spending your budget and the phone isn’t ringing | zip",
    "description": "Google Ads is spending money but no enquiries come in? The six most common reasons for small businesses, and where to check them in Google Ads.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Money goes out every day, clicks add up, and nobody calls. For small businesses the problem is rarely the ad itself. It’s usually the settings and what happens after the click.",
    "html": "<h2>1. You pay for searches that have nothing to do with you</h2>\n<p>If you advertise “boiler repair”, your ad can also show for “how to fix a boiler myself” or “boiler manual pdf”. In Google Ads, open the search terms report and see what you actually paid for. Add the terms that don’t bring work as negative keywords.</p>\n<h2>2. Your ads show outside your area</h2>\n<p>The default location setting reaches people in your area, and also people who have only shown interest in it. For a local service that can mean clicks from people who will never come to you. If you only work locally, choose the location option that targets people who are actually in the area.</p>\n<h2>3. You don’t know what brings calls</h2>\n<p>If you don’t measure calls and enquiries (conversion tracking), Google optimises for clicks, not customers. Set up call and form tracking before you raise the budget.</p>\n<h2>4. The click lands on your home page</h2>\n<p>Someone searched for one service and landed on a home page with five others. Send each ad to the page for that service, with the phone number visible straight away, no scrolling.</p>\n<h2>5. Ads run when nobody picks up</h2>\n<p>If you answer the phone from 8 to 4, ads that lead to calls at 10 pm waste money. Match your ad schedule to when you can actually answer.</p>\n<h2>6. The budget is spread too thin</h2>\n<p>A small budget split across ten services and the whole country means nothing gets enough clicks to learn from. Start with one or two services that earn the most and the area where you actually work.</p>",
    "sources": [
      {
        "label": "Google Ads: negative keywords from the search terms report",
        "href": "https://support.google.com/google-ads/answer/7102466"
      },
      {
        "label": "Google Ads: location targeting options",
        "href": "https://support.google.com/google-ads/answer/1722038"
      }
    ],
    "alt": "google-ads-trosi-budzet-a-telefon-ne-zvoni"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "how-much-to-spend-on-google-ads-per-month",
    "title": "How much a small business should spend on Google Ads per month",
    "metaTitle": "How much a small business should spend on Google Ads per month | zip",
    "description": "How to work out a monthly Google Ads budget for a small business: a simple formula, an example and how to find out what a click really costs in your field.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "There’s no single figure that fits everyone. But there is a simple way to work out what you need, instead of picking 100 or 500 euros at random.",
    "html": "<h2>Start from enquiries, not from the budget</h2>\n<p>The question isn’t “how much can I spend”, it’s “how many new enquiries a month do I want”. The budget follows from that.</p>\n<h2>The formula</h2>\n<p>Budget = enquiries you want ÷ share of clicks that become an enquiry × cost per click</p>\n<p>Example (made-up numbers, just to show the maths): you want 10 enquiries a month. If one in twenty clicks becomes an enquiry (5%), you need 200 clicks. If a click in your field costs €0.80, that’s €160 a month.</p>\n<h2>Where the numbers come from</h2>\n<ul><li>Cost per click: Google Ads has a free Keyword Planner that shows an estimated cost per click for your terms and area.</li><li>Share of clicks that become an enquiry: you don’t know it at first. That’s what the first month is for, with call and form tracking switched on.</li></ul>\n<h2>How long to test</h2>\n<p>Long enough to collect at least a few dozen clicks per service. With too few clicks, every conclusion is chance. For most small businesses that means at least a month on one or two services.</p>\n<h2>When to raise the budget</h2>\n<p>When you know what one enquiry costs you and what one job is worth. If an enquiry costs you €15 and an average job brings €300, you have a clear reason to spend more. If you don’t know those numbers, raising the budget is guesswork.</p>",
    "sources": [
      {
        "label": "Google Ads: Keyword Planner",
        "href": "https://support.google.com/google-ads/answer/7337243"
      }
    ],
    "alt": "koliko-potrositi-na-google-ads-mjesecno"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "google-ads-or-seo-what-first",
    "title": "Google Ads or SEO: what to do first on a limited budget",
    "metaTitle": "Google Ads or SEO: what to do first on a limited budget | zip",
    "description": "Google Ads or SEO, which pays off first for a small business on a small budget? A comparison of speed, cost and staying power, and the order we recommend.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Ads work from day one and stop the moment you stop paying. SEO is slow, but it stays. When the budget is small, the order matters more than the choice.",
    "html": "<h2>The difference in one sentence</h2>\n<p>With ads you pay for every click and get results from day one. With SEO you work towards showing up for free, but the first results take weeks or months.</p>\n<h2>When ads come first</h2>\n<ul><li>You need enquiries this month, not in six months.</li><li>You want to check quickly whether anyone searches for your service in your area.</li><li>Your business is seasonal and you need to be visible exactly in season.</li></ul>\n<h2>When SEO comes first</h2>\n<ul><li>You’re not in a hurry and would rather invest in something that lasts.</li><li>Clicks are expensive in your field.</li><li>People search for you by name or neighbourhood, and you don’t show up there yet.</li></ul>\n<h2>The order we recommend</h2>\n<ol><li>Free things first: an accurate Google Business profile and a site that clearly says what you do and where. Without them, neither ads nor SEO work well.</li><li>A small ads test: one or two services, only your area, with call tracking. In a month you know what an enquiry costs you.</li><li>SEO in the background: a page for each main service, reviews and the occasional article. It keeps working when the ads stop.</li></ol>\n<h2>The most common mistake</h2>\n<p>Running ads to a site that doesn’t turn visitors into enquiries. Then you pay for clicks that get lost. Before ads, check that someone can see in three seconds what you do and how to contact you.</p>",
    "sources": [],
    "alt": "google-ads-ili-seo-sto-prvo"
  },
  {
    "related": {
      "href": "/small-business-websites",
      "label": "Small business websites"
    },
    "lang": "en",
    "slug": "do-i-need-a-website-if-i-have-facebook",
    "title": "I have Facebook. Do I even need a website?",
    "metaTitle": "I have Facebook. Do I even need a website? | zip",
    "description": "When a Facebook page is enough for a small business, and when you need a website. An honest answer and three steps to check for yourself.",
    "category": "Websites",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Short answer: sometimes you don’t. But if people look for you on Google, a Facebook page on its own usually isn’t enough. Here’s how to decide.",
    "html": "<h2>When Facebook is enough</h2>\n<ul><li>All your customers come through referrals and already know you.</li><li>You’re not looking for new customers, just looking after existing ones.</li><li>You work occasionally, as a hobby or alongside another job.</li></ul>\n<p>If that sounds like you, you probably don’t need a website. A well-kept Facebook page and Google profile beat a website nobody maintains.</p>\n<h2>When Facebook isn’t enough</h2>\n<h3>People look for you on Google, not Facebook</h3>\n<p>When someone needs a hairdresser, a plumber or an accountant, they type the service and the town into Google. The results show business profiles and websites. Google says local ranking also depends on how well-known a business is, including links to its website. Without a website, that part stays empty.</p>\n<h3>Facebook isn’t yours</h3>\n<p>Meta decides the rules, the layout and how many people see your posts, and changes them whenever it wants. Your website and domain are yours, whatever happens to any social network.</p>\n<h3>Customers want to check before they get in touch</h3>\n<p>Before the first call, people want to see what exactly you do, where you are and what your work looks like. On Facebook that’s scattered across posts. On a website it’s in one place.</p>\n<h3>Getting in touch is harder than it should be</h3>\n<p>On Facebook, a visitor has to hunt for the message button or a phone number between posts. A good website has one clear path: a call, a form or a booking.</p>\n<h2>It doesn’t have to be a big website</h2>\n<p>For most small businesses one page is enough: what you do, for whom, where, a few examples of your work and a clear way to contact you. What matters is that it’s linked to your Google profile and loads fast on a phone.</p>\n<h2>Check for yourself in three steps</h2>\n<ol><li>Check that you have a Google Business profile and that the details are correct.</li><li>Type your service and town into Google, for example “hairdresser Trešnjevka”, and see who shows up.</li><li>If you’re not there and people search for what you do, it’s time for a website.</li></ol>\n<p>Related: <a href=\"/small-business-websites\">Small business websites</a></p>",
    "sources": [],
    "alt": "treba-li-mi-web-stranica-ako-imam-facebook"
  },
  {
    "related": {
      "href": "/website-redesign",
      "label": "Website redesign"
    },
    "lang": "en",
    "slug": "redesign-or-new-website",
    "title": "Website redesign or a new site: how to decide",
    "metaTitle": "Website redesign or a new site: how to decide | zip",
    "description": "When fixing your existing website is enough, and when a new one is the better choice. Clear signs, three questions to ask first and what to watch for in a redesign.",
    "category": "Websites",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Your website doesn’t bring enquiries and you know something has to change. The only question is: fix what you have, or start over?",
    "html": "<h2>When fixing is enough</h2>\n<ul><li>The site loads fast on a phone.</li><li>It’s easy to edit, and the system gets regular updates.</li><li>The structure makes sense; only the path to an enquiry is unclear or the copy is weak.</li><li>You already show up on Google for some searches.</li></ul>\n<p>Then targeted changes give you the most: a clearer enquiry button, better copy and a faster home page.</p>\n<h2>When a new site is the better choice</h2>\n<ul><li>It’s hard to use on a phone, or falls apart.</li><li>Nobody knows how to edit it any more, or you have to call someone for every small change.</li><li>It looks so dated that you seem to have closed.</li><li>Your services have changed, but the site still talks about what you no longer do.</li></ul>\n<p>Then patching is often more expensive than a new site, because you pay for work on something you’ll have to replace anyway.</p>\n<h2>Three questions before you decide</h2>\n<ol><li>What should the site do: bring a call, an enquiry or a booking?</li><li>Can you change the copy, a price or your hours yourself?</li><li>Where do the people who find you today come from: Google, social media or referrals?</li></ol>\n<p>If you don’t have a clear answer to the first question, no website will work well, old or new. Start there.</p>\n<h2>What to watch for in a redesign</h2>\n<p>If your old site ranks on Google, the old addresses need to redirect to the new ones. Otherwise both people and Google land on an empty page, and rankings drop. The domain stays yours, and at the end the new site should be fully handed over to you, with the files and access.</p>\n<p>Related: <a href=\"/website-redesign\">Website redesign</a></p>",
    "sources": [],
    "alt": "redizajn-ili-nova-web-stranica"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "site-looks-good-but-brings-no-enquiries",
    "title": "Why your website looks good but brings no enquiries or bookings",
    "metaTitle": "Why your website looks good but brings no enquiries or bookings | zip",
    "description": "A good-looking website that brings no enquiries: six reasons visitors leave without getting in touch, and how to check them yourself on a phone.",
    "category": "Websites",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "The site looks great, everyone likes it, and nobody gets in touch. Looks are only part of it. A visitor decides in a few seconds whether to contact you, and usually gives up over small things.",
    "html": "<h2>1. It’s not obvious what you do</h2>\n<p>A big photo and a slogan like “Your partner for the future” look nice, but the visitor doesn’t know if they’re in the right place. The first screen should say what you do, for whom and where.</p>\n<h2>2. There’s no single clear next step</h2>\n<p>If “Learn more”, “See the gallery”, “Follow us” and “Contact” all look equally important, the visitor clicks nothing. Decide what you want them to do (call, send an enquiry, book) and make that button the most visible.</p>\n<h2>3. It’s hard to use on a phone</h2>\n<p>Most people open your site on a phone. A phone number you can’t tap, a form with ten fields or a button you can’t see without scrolling all mean lost enquiries.</p>\n<h2>4. It loads slowly</h2>\n<p>Big beautiful photos are often the main reason a site is slow. If it takes more than a few seconds on mobile data, some people leave before they see it.</p>\n<h2>5. There’s no reason to trust you</h2>\n<p>Reviews, examples of your work, real names and photos of people, an address. Without them, a visitor can’t tell whether the business is real and still open.</p>\n<h2>6. The form or booking doesn’t work</h2>\n<p>It sounds obvious, but it happens: the form sends to an old email, or the booking throws an error. Send yourself an enquiry from your phone and check it arrives.</p>\n<h2>A five-minute test</h2>\n<p>Hand your phone to someone who doesn’t know you and ask them to contact you through the site. Don’t help. Wherever they get stuck is where the site loses enquiries.</p>",
    "sources": [],
    "alt": "stranica-izgleda-dobro-ali-ne-donosi-upite"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "what-a-business-website-must-show-by-law-croatia",
    "title": "What every business website in Croatia must show by law",
    "metaTitle": "What every business website in Croatia must show by law | zip",
    "description": "Mandatory details on the website of a sole trader (obrt) or limited company (d.o.o.) in Croatia, plus privacy policy and cookies. An overview with a checklist.",
    "category": "Websites",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Most small businesses don’t have all the details the rules require on their site. It’s easy to fix, but first you need to know what exactly has to be there.",
    "html": "<p>This is an overview to help you find your way, not legal advice. Check your own case with your accountant or a lawyer.</p>\n<h2>If you’re a sole trader (obrt)</h2>\n<ul><li>Business name and type of trade</li><li>Owner’s full name</li><li>Registered address</li><li>The body that keeps the trade register and your registration number</li><li>OIB (tax number)</li><li>Bank and account number</li><li>Contact: email and phone</li></ul>\n<h2>If you’re a limited company (d.o.o.)</h2>\n<ul><li>Full company name and registered office</li><li>The court where the company is registered and its registration number (MBS)</li><li>OIB</li><li>Bank and IBAN</li><li>Share capital and whether it is fully paid</li><li>Names of the management board</li><li>Contact: email and phone</li></ul>\n<p>The list for a d.o.o. comes from Article 21 of the Companies Act (Zakon o trgovačkim društvima), and the contact details from the E-Commerce Act (Zakon o elektroničkoj trgovini).</p>\n<h2>For everyone: a privacy policy</h2>\n<p>If the site collects any personal data (a contact form, a booking, a newsletter), it needs a privacy policy: who processes the data, why, how long it’s kept, who else receives it and what rights people have.</p>\n<h2>For everyone: cookies</h2>\n<p>Cookies needed for the site to work don’t require consent. Cookies for analytics or advertising need the visitor’s consent before they’re set, not just a notice saying “this site uses cookies”.</p>\n<h2>If you sell through the site</h2>\n<p>An online shop has extra obligations: clear prices including VAT, terms of sale, the right of withdrawal and complaint details. That’s a separate topic.</p>\n<h2>Checklist</h2>\n<ol><li>Look at your site’s footer: are all the details above there?</li><li>Is there a privacy policy, and is it linked next to every form?</li><li>Do you use Google Analytics or Meta Pixel? If so, do you ask for consent?</li></ol>",
    "sources": [
      {
        "label": "Pisalica: mandatory website details for companies and sole traders (HR)",
        "href": "https://pisalica.com/obavezni-podaci-web-tvrtke-obrti/"
      },
      {
        "label": "Meta Digital: mandatory website details (HR)",
        "href": "https://metadigital.hr/obavezni-podaci-na-web-stranici/"
      }
    ],
    "alt": "sto-poslovna-web-stranica-mora-imati-po-zakonu"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "how-much-should-a-website-cost-2026",
    "title": "How much a website should really cost you in 2026",
    "metaTitle": "How much a website should really cost you in 2026 | zip",
    "description": "How much a website costs in Croatia in 2026: market price ranges, what drives them, the costs people forget and the questions to ask before you sign.",
    "category": "Websites",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Website prices in Croatia range from a few hundred to a few thousand euros. The difference isn’t just the design, it’s what you get and what you pay later.",
    "html": "<h2>Rough ranges on the market</h2>\n<p>According to one Croatian agency’s 2026 price overview, a simple presentation site for a small business is around €400–900, a business site with more content around €900–1,800, and an online shop from around €1,200 up. These are other people’s prices, meant only as a guide.</p>\n<h2>What drives the price</h2>\n<ul><li>How many pages, and how much content on each</li><li>A ready-made template or a design made for you</li><li>An enquiry form, a booking system or a shop</li><li>Who writes the copy and who provides the photos</li><li>How many languages</li><li>Whether basic SEO and linking to your Google profile are included</li></ul>\n<h2>Costs people forget</h2>\n<ul><li>Domain and hosting, every year</li><li>Maintenance and updates</li><li>Changes after launch: included, or charged by the hour?</li><li>Photos and copy, if you don’t have them</li></ul>\n<h2>When cheap is actually expensive</h2>\n<p>A €200 site that brings no enquiries costs more than a €900 one that brings work every month. Ask what the site needs to do for you, not just what it costs.</p>\n<h2>Five questions before you sign</h2>\n<ol><li>What exactly is included, and what costs extra?</li><li>Who owns the site after launch: files, domain and access?</li><li>Can I change the copy and prices myself?</li><li>What does it cost per year after the first year?</li><li>Is the site linked to my Google profile and set up for Google?</li></ol>\n<p>With us, you get the price in writing after the free check, before any work starts.</p>",
    "sources": [
      {
        "label": "Lenko dizajn: website prices in Croatia 2026 (HR)",
        "href": "https://lenko-dizajn.hr/blog/2026/04/24/koliko-kosta-izrada-web-stranice-hrvatska/"
      }
    ],
    "alt": "koliko-kosta-web-stranica-2026"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "why-posting-every-day-doesnt-help",
    "title": "Why posting every day doesn’t help if nobody comments",
    "metaTitle": "Why posting every day doesn’t help if nobody comments | zip",
    "description": "You post every day but reach and enquiries don’t grow? What Instagram says about which posts it shows, and what small businesses can do instead of posting more.",
    "category": "Social media",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "More posts don’t mean more people. If nobody reacts, each new post reaches fewer people, and you spend time you could put into something that works.",
    "html": "<h2>What Instagram looks at</h2>\n<p>Instagram explains that when it ranks Feed posts it looks, among other things, at how many people like, comment on, share and save a post and how quickly, and at how often people have interacted with you in the past few weeks. How often you post isn’t one of those signals.</p>\n<h2>Why posting daily can hurt</h2>\n<p>If every post gets few reactions, that tells Instagram people don’t find it interesting. And when you post under pressure, quality drops, and people quickly learn to scroll past you.</p>\n<h2>What to do instead</h2>\n<ul><li>Fewer, better posts. Two or three posts a week that someone wants to save or send to a friend beat seven nobody looks at.</li><li>Reply to every comment and message, and fast. Conversation is a signal, and it’s how an enquiry turns into work.</li><li>Ask something specific. “Which is harder for you, X or Y?” gets more replies than “Get in touch!”.</li><li>Content people save: lists, tips, before-and-after comparisons.</li><li>Track messages and enquiries, not just likes. Likes don’t pay the bills.</li></ul>\n<h2>How to tell if it’s working</h2>\n<p>Once a month, look at which posts brought a message, a call or a visit to your site. Make more of those and fewer of the ones that bring nothing.</p>",
    "sources": [
      {
        "label": "Instagram: ranking explained",
        "href": "https://about.instagram.com/blog/announcements/instagram-ranking-explained/"
      }
    ],
    "alt": "zasto-svakodnevno-objavljivanje-ne-pomaze"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "3-types-of-posts-that-bring-clients",
    "title": "3 types of posts that actually bring small businesses clients",
    "metaTitle": "3 types of posts that actually bring small businesses clients | zip",
    "description": "Three types of social media posts that bring small businesses enquiries, not just likes, with an example of each and how to end the post.",
    "category": "Social media",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Pretty photos and holiday greetings collect likes. Enquiries come from posts that show your work, answer questions and prove you can be trusted.",
    "html": "<h2>1. Behind the scenes: before and after, or how it’s made</h2>\n<p>People buy the result, but they trust the process. Show a flat before and after painting, a haircut in three steps, a repair from fault to fix. A short video or a carousel of three to five photos is enough.</p>\n<p>End with: “Got a similar problem? Send us a photo in a message.”</p>\n<h2>2. An answer to a question customers actually ask</h2>\n<p>Every question you’ve heard three times is a post: “How long does…?”, “How much is…?”, “What if…?”. People save and share these, and you can send the link next time someone asks.</p>\n<p>End with: “Got another question? Write it in the comments.”</p>\n<h2>3. Proof: what a customer says</h2>\n<p>A Google review, a message from a happy customer or a short quote, always with permission. Add what exactly you did. “You’re great!” is nice, but “You fixed the leak in an hour, on a Sunday” sells.</p>\n<p>End with: your phone number or a booking link.</p>\n<h2>A mix that works</h2>\n<p>Not every post has to sell. But every post should show you know what you’re doing. One of each of these three a month already puts you ahead of most competitors.</p>",
    "sources": [],
    "alt": "3-vrste-objava-koje-dovode-klijente"
  },
  {
    "related": null,
    "lang": "en",
    "slug": "instagram-or-facebook-where-are-your-customers",
    "title": "Instagram or Facebook: where your customers are actually active",
    "metaTitle": "Instagram or Facebook: where your customers are actually active | zip",
    "description": "How a small business can decide whether it needs Instagram, Facebook or both: four ways to check where your customers are, without guessing.",
    "category": "Social media",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "There’s no universal answer. It depends on who your customers are and how they look for you. The good news is you can check it in an afternoon instead of guessing.",
    "html": "<h2>1. Ask your customers</h2>\n<p>The simplest and most accurate. Ask your next ten customers how they found you and which network they use most. Ten answers tell you more than any statistic.</p>\n<h2>2. Look at where enquiries come from</h2>\n<p>If people message you on Facebook, and on Instagram you get likes but no messages, you already have your answer. An enquiry is worth more than a follower.</p>\n<h2>3. Look at your competitors</h2>\n<p>Find three to five businesses in your field and town. Where do they get comments and questions from customers, not just likes? That’s where your customers are too.</p>\n<h2>4. Think about how people look for you</h2>\n<p>If people look for your service when they need it (a plumber, a repair shop, a lawyer), Google comes first, not social media. If people buy with their eyes (hair, nails, food, interiors), Instagram makes more sense.</p>\n<h2>Our advice for small businesses</h2>\n<ul><li>One network you run regularly beats two you run now and then.</li><li>Before any network, sort out your Google Business profile. That’s where people look when they’re ready to buy.</li><li>You can post the same content on both, but reply where people actually write.</li></ul>",
    "sources": [],
    "alt": "instagram-ili-facebook-gdje-je-vas-klijent"
  },
  {
    "related": {
      "href": "/hr#how",
      "label": "Kako radi besplatna provjera"
    },
    "lang": "hr",
    "slug": "greske-na-google-business-profilu",
    "title": "7 grešaka na Google profilu zbog kojih vas kupci ne pronađu",
    "metaTitle": "7 grešaka na Google profilu zbog kojih vas kupci ne pronađu | zip",
    "description": "Najčešće greške na Google Business profilu male tvrtke i kako ih ispraviti za jedno popodne: kategorija, radno vrijeme, recenzije, fotografije i ostalo.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Google profil je često prvo što netko vidi o vašoj tvrtki, prije stranice i prije poziva. Ovo su greške koje najčešće koče male tvrtke i kako ih ispraviti za jedno popodne.",
    "html": "<p>Google kaže da lokalne rezultate određuju tri stvari: koliko profil odgovara onome što netko traži, koliko ste mu blizu i koliko je vaša tvrtka poznata. Na udaljenost ne možete utjecati, ali na ostalo dvoje možete. Prije svega: profil mora biti potvrđen, inače ga ne možete uređivati.</p>\n<h2>1. Pogrešna ili preopćenita kategorija</h2>\n<p>Glavna kategorija Googleu govori što radite. Odaberite najprecizniju koja postoji, npr. “Frizerski salon”, a ne “Salon ljepote” ako radite samo kosu. Ostale usluge dodajte kao sporedne kategorije.</p>\n<h2>2. Profil ne vodi na stranicu, ili vodi na krivu</h2>\n<p>Bez linka na web stranicu ljudi koji žele više informacija nemaju kamo. Ako link vodi na naslovnicu na kojoj nema ni broja telefona, izgubili ste ih. Neka vodi na stranicu s jasnim načinom kontakta.</p>\n<h2>3. Netočno radno vrijeme</h2>\n<p>Ništa ne ruši povjerenje brže od zatvorenih vrata u vrijeme kad Google kaže da radite. Upišite i posebno radno vrijeme za praznike i godišnji odmor.</p>\n<h2>4. Ime, adresa i telefon se ne podudaraju</h2>\n<p>Ako je na profilu jedan broj, na stranici drugi, a na Facebooku treći, zbunjeni su i ljudi i Google. Neka ime tvrtke, adresa i telefon budu napisani jednako na svim mjestima.</p>\n<h2>5. Nema fotografija, ili su stare</h2>\n<p>Google preporučuje fotografije i videe jer kupcima pokazuju što nudite. Dodajte stvarne fotografije prostora, tima i rada i povremeno ih osvježite.</p>\n<h2>6. Recenzije bez odgovora</h2>\n<p>Google preporučuje da odgovarate na recenzije. Odgovorite na svaku, i dobru i lošu, kratko i pristojno. Kupci čitaju i vaše odgovore, ne samo recenzije.</p>\n<h2>7. Prazan opis i neispunjene usluge</h2>\n<p>Opis i popis usluga mjesta su gdje vlastitim riječima kažete što radite i gdje. Napišite ih onako kako bi vas kupac tražio: “šišanje i bojanje kose, Trešnjevka, Zagreb”, a ne “vrhunska usluga po mjeri”.</p>\n<h2>Brza provjera</h2>\n<ul><li>Profil je potvrđen.</li><li>Glavna kategorija je najpreciznija moguća.</li><li>Link vodi na stranicu s brojem telefona ili obrascem.</li><li>Radno vrijeme je točno, i za praznike.</li><li>Ime, adresa i telefon su isti posvuda.</li><li>Ima stvarnih fotografija iz zadnjih nekoliko mjeseci.</li><li>Na svaku recenziju je odgovoreno.</li><li>Opis i usluge su ispunjeni riječima kojima vas kupci traže.</li></ul>",
    "sources": [
      {
        "label": "Google: kako se određuje lokalni poredak",
        "href": "https://support.google.com/business/answer/7091"
      }
    ],
    "alt": "google-business-profile-mistakes"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "zasto-vas-ne-nalaze-na-googleu",
    "title": "Zašto vas ne nalaze na Googleu iako imate web stranicu",
    "metaTitle": "Zašto vas ne nalaze na Googleu iako imate web stranicu | zip",
    "description": "Imate web stranicu, a na Googleu vas nema? Pet najčešćih razloga i kako sami provjeriti svaki od njih za deset minuta.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Stranica postoji, plaćate domenu i hosting, a kad upišete svoju uslugu u Google, pojavljuje se svatko osim vas. Razlog je gotovo uvijek jedan od ovih pet.",
    "html": "<h2>1. Google stranicu uopće nije indeksirao</h2>\n<p>Upišite u Google site:vasadomena.hr (sa svojom domenom). Ako se ne pojavi nijedna stranica, Google vas još nije uvrstio u rezultate. Nova stranica treba vremena, a pomaže ako je prijavite u Google Search Console i pošaljete sitemap.</p>\n<h2>2. Stranica Googleu kaže da je ne prikazuje</h2>\n<p>Dok se stranica radi, često se uključi postavka koja Googleu kaže da je ne prikazuje (tzv. noindex). Ako je netko zaboravi isključiti na objavi, stranica ostaje nevidljiva bez obzira na sve ostalo. Search Console to pokazuje u izvješću o indeksiranju.</p>\n<h2>3. Na stranici ne piše ono što ljudi traže</h2>\n<p>Ljudi traže “vodoinstalater Dubrava” ili “računovođa za obrt Zagreb”. Ako na stranici piše samo “Kvaliteta i pouzdanost od 2005.”, Google ne zna za što bi vas prikazao. Naslov stranice, glavni naslov i prvi odlomak trebaju reći što radite i gdje.</p>\n<h2>4. Google profil nije povezan sa stranicom</h2>\n<p>Za lokalne pretrage velik dio posla radi Google Business profil. <a href=\"https://support.google.com/business/answer/7091\" target=\"_blank\" rel=\"noopener noreferrer\">Google</a> navodi da na lokalni poredak utječe koliko profil odgovara pretrazi, udaljenost i koliko je tvrtka poznata. Profil bez linka na stranicu i stranica bez profila rade svaki napola.</p>\n<h2>5. Konkurencija je jednostavno jača</h2>\n<p>Ponekad je sve tehnički ispravno, ali drugi imaju više recenzija, više sadržaja i dulje su na tržištu. Tada pomaže samo strpljiv rad: točan profil, redovite recenzije i stranice za svaku glavnu uslugu.</p>\n<h2>Provjera za deset minuta</h2>\n<ol><li>Upišite site:vasadomena.hr i pogledajte ima li rezultata.</li><li>Upišite svoju uslugu i kvart ili grad i pogledajte tko se pojavljuje.</li><li>Otvorite svoju naslovnicu i provjerite piše li u prvom odlomku što radite i gdje.</li><li>Provjerite vodi li vaš Google profil na stranicu.</li></ol>",
    "sources": [
      {
        "label": "Google: kako se određuje lokalni poredak",
        "href": "https://support.google.com/business/answer/7091"
      },
      {
        "label": "Google Search Central: zahtjev za ponovni pregled",
        "href": "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
      }
    ],
    "alt": "why-google-cant-find-your-website"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "koliko-traje-da-se-stranica-pojavi-na-googleu",
    "title": "Koliko stvarno traje da se stranica pojavi na Googleu",
    "metaTitle": "Koliko stvarno traje da se stranica pojavi na Googleu | zip",
    "description": "Koliko treba da nova web stranica uđe u Google i kada možete očekivati da je ljudi nađu. Što kaže Google i što možete ubrzati.",
    "category": "SEO",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Objavili ste stranicu i čekate. Postoje dvije različite stvari koje se miješaju: kada će vas Google uopće uvrstiti i kada će vas ljudi stvarno pronaći.",
    "html": "<h2>Uvrštavanje: dani do tjedni</h2>\n<p>Google kaže da pregledavanje stranice može trajati od nekoliko dana do nekoliko tjedana, i da zahtjev za ponovni pregled ne jamči da će stranica ući u rezultate odmah, pa ni uopće. Nitko vam ne može obećati točan datum.</p>\n<h2>Pozicija: obično dulje</h2>\n<p>To što ste uvršteni ne znači da ste na prvoj stranici rezultata. Za pojmove gdje su konkurenti već godinama prisutni, nova stranica realno treba mjesece. Kad netko upiše točno ime vaše tvrtke, pojavit ćete se puno brže nego za opći pojam poput “izrada web stranica Zagreb”.</p>\n<h2>Što možete ubrzati</h2>\n<ul><li>Prijavite stranicu u Google Search Console i pošaljite sitemap.</li><li>Provjerite da stranica Googleu ne kaže da je ne prikazuje (noindex).</li><li>Povežite Google Business profil sa stranicom.</li><li>Neka svaka glavna usluga ima svoju stranicu s jasnim naslovom.</li><li>Linkajte stranicu s mjesta koja već postoje: profil, društvene mreže, imenici.</li></ul>\n<h2>Što ne pomaže</h2>\n<p>Ponovno slanje istog zahtjeva Googleu više puta ne ubrzava ništa, a Google kaže da za to postoje i ograničenja. Usluge koje obećavaju “prvu stranicu za tjedan dana” obično to ne mogu ispuniti.</p>\n<h2>Dok čekate</h2>\n<p>Google profil se za lokalne pretrage često pojavi brže od same stranice. Ako vam trebaju upiti odmah, oglasi na Googleu daju rezultat od prvog dana, dok SEO radi u pozadini.</p>",
    "sources": [
      {
        "label": "Google Search Central: zahtjev za ponovni pregled",
        "href": "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
      }
    ],
    "alt": "how-long-until-my-site-shows-up-on-google"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "google-ads-trosi-budzet-a-telefon-ne-zvoni",
    "title": "Zašto vam Google Ads troši budžet, a telefon ne zvoni",
    "metaTitle": "Zašto vam Google Ads troši budžet, a telefon ne zvoni | zip",
    "description": "Oglasi na Googleu troše novac, a upita nema? Šest najčešćih razloga za male tvrtke i gdje u Google Adsu to provjeriti.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Novac odlazi svaki dan, klikovi se zbrajaju, a poziva nema. Kod malih tvrtki problem je rijetko u samom oglasu. Najčešće je u postavkama i u onome što se događa nakon klika.",
    "html": "<h2>1. Plaćate za pretrage koje nemaju veze s vama</h2>\n<p>Ako oglašavate “popravak bojlera”, oglas se može prikazati i za “kako sam popraviti bojler” ili “bojler upute pdf”. U Google Adsu otvorite izvješće o pojmovima za pretraživanje (Search terms) i pogledajte za što ste stvarno plaćali. Pojmove koji ne donose posao dodajte kao negativne ključne riječi.</p>\n<h2>2. Oglasi se prikazuju i izvan vašeg područja</h2>\n<p>Zadana postavka lokacije cilja ljude koji su u vašem području, ali i one koji su samo pokazali interes za to područje. Za lokalnu uslugu to može značiti klikove ljudi koji vam nikad neće doći. Ako radite samo lokalno, u postavkama lokacije odaberite opciju koja cilja ljude koji su stvarno u području.</p>\n<h2>3. Ne znate što donosi pozive</h2>\n<p>Ako ne mjerite pozive i upite (praćenje konverzija), Google optimizira za klikove, a ne za kupce. Postavite praćenje poziva i obrasca prije nego što povećate budžet.</p>\n<h2>4. Klik vodi na naslovnicu</h2>\n<p>Netko je tražio jednu uslugu, a završio na naslovnici s pet drugih. Neka oglas vodi na stranicu baš te usluge, s brojem telefona vidljivim odmah, bez skrolanja.</p>\n<h2>5. Oglasi rade kad se nitko ne javlja</h2>\n<p>Ako se na telefon javljate od 8 do 16, oglasi koji vode na poziv u 22 sata troše novac. Raspored oglasa uskladite s vremenom kad stvarno možete odgovoriti.</p>\n<h2>6. Budžet je razvučen na previše toga</h2>\n<p>Mali budžet podijeljen na deset usluga i cijelu Hrvatsku znači da nigdje nema dovoljno klikova za zaključak. Krenite s jednom do dvije usluge koje donose najviše i s područjem gdje stvarno radite.</p>",
    "sources": [
      {
        "label": "Google Ads: negativne ključne riječi iz izvješća o pojmovima",
        "href": "https://support.google.com/google-ads/answer/7102466"
      },
      {
        "label": "Google Ads: opcije ciljanja lokacije",
        "href": "https://support.google.com/google-ads/answer/1722038"
      }
    ],
    "alt": "google-ads-spending-but-phone-not-ringing"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "koliko-potrositi-na-google-ads-mjesecno",
    "title": "Koliko bi mali obrt trebao potrošiti na Google Ads mjesečno",
    "metaTitle": "Koliko bi mali obrt trebao potrošiti na Google Ads mjesečno | zip",
    "description": "Kako izračunati mjesečni budžet za Google Ads za mali obrt: jednostavna formula, primjer i kako doznati koliko klik stvarno košta u vašoj djelatnosti.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Nema jednog iznosa koji vrijedi za sve. Ali postoji jednostavan način da izračunate koliko vama treba, umjesto da nasumce stavite 100 ili 500 eura.",
    "html": "<h2>Krenite od upita, ne od budžeta</h2>\n<p>Pitanje nije “koliko mogu potrošiti”, nego “koliko novih upita mjesečno želim”. Iz toga se budžet izračuna.</p>\n<h2>Formula</h2>\n<p>Budžet = broj upita koji želite ÷ postotak klikova koji postanu upit × cijena klika</p>\n<p>Primjer (izmišljeni brojevi, samo da se vidi računica): želite 10 upita mjesečno. Ako vam svaki dvadeseti klik postane upit (5 %), trebate 200 klikova. Ako klik u vašoj djelatnosti košta 0,80 €, to je 160 € mjesečno.</p>\n<h2>Odakle vam brojevi</h2>\n<ul><li>Cijena klika: u Google Adsu postoji besplatan alat Planer ključnih riječi (Keyword Planner) koji za vaše pojmove i područje pokazuje okvirnu cijenu klika.</li><li>Postotak klikova koji postanu upit: u početku ga ne znate. Zato prvi mjesec služi da ga izmjerite, uz uključeno praćenje poziva i obrazaca.</li></ul>\n<h2>Koliko dugo testirati</h2>\n<p>Dovoljno dugo da skupite barem nekoliko desetaka klikova po usluzi. S premalo klikova svaki zaključak je slučajnost. Za većinu malih obrta to znači barem mjesec dana na jednoj ili dvije usluge.</p>\n<h2>Kada povećati budžet</h2>\n<p>Kad znate koliko vas stoji jedan upit i koliko vrijedi jedan posao. Ako vas upit stoji 15 €, a prosječan posao donosi 300 €, imate jasan razlog za više. Ako ne znate te brojke, povećanje budžeta je nagađanje.</p>",
    "sources": [
      {
        "label": "Google Ads: Planer ključnih riječi",
        "href": "https://support.google.com/google-ads/answer/7337243"
      }
    ],
    "alt": "how-much-to-spend-on-google-ads-per-month"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "google-ads-ili-seo-sto-prvo",
    "title": "Google Ads ili SEO: što prvo ako imate ograničen budžet",
    "metaTitle": "Google Ads ili SEO: što prvo ako imate ograničen budžet | zip",
    "description": "Oglasi na Googleu ili SEO, što se malom obrtu s malim budžetom više isplati prvo? Usporedba brzine, troška i trajanja te redoslijed koji preporučujemo.",
    "category": "Google Ads",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Oglasi daju rezultat odmah i nestaju čim prestanete plaćati. SEO je spor, ali ostaje. Kad je budžet mali, redoslijed je važniji od izbora.",
    "html": "<h2>Razlika u jednoj rečenici</h2>\n<p>Oglasima plaćate svaki klik i rezultat imate od prvog dana. SEO-om radite na tome da se pojavite besplatno, ali prvi rezultati dolaze tek za tjedne ili mjesece.</p>\n<h2>Kada prvo oglasi</h2>\n<ul><li>Trebaju vam upiti ovaj mjesec, ne za pola godine.</li><li>Želite brzo provjeriti traži li uopće netko vašu uslugu u vašem području.</li><li>Imate sezonski posao i trebate biti vidljivi točno u sezoni.</li></ul>\n<h2>Kada prvo SEO</h2>\n<ul><li>Ne žurite i radije ulažete u nešto što ostaje.</li><li>U vašoj djelatnosti je klik skup.</li><li>Ljudi vas traže po imenu ili po kvartu, a vi se tamo još ne pojavljujete.</li></ul>\n<h2>Redoslijed koji preporučujemo</h2>\n<ol><li>Besplatne stvari prvo: točan Google Business profil i stranica koja jasno kaže što radite i gdje. Bez toga ni oglasi ni SEO ne rade dobro.</li><li>Mali test oglasa: jedna ili dvije usluge, samo vaše područje, uz praćenje poziva. Tako za mjesec dana znate koliko vas stoji upit.</li><li>SEO u pozadini: stranica za svaku glavnu uslugu, recenzije i povremeni članak. To radi i kad oglasi stanu.</li></ol>\n<h2>Najčešća greška</h2>\n<p>Pokrenuti oglase prema stranici koja ne pretvara posjetitelje u upite. Tada plaćate klikove koji se izgube. Prije oglasa provjerite može li netko u tri sekunde vidjeti što radite i kako vas kontaktirati.</p>",
    "sources": [],
    "alt": "google-ads-or-seo-what-first"
  },
  {
    "related": {
      "href": "/hr/izrada-web-stranica",
      "label": "Izrada web stranica za male tvrtke"
    },
    "lang": "hr",
    "slug": "treba-li-mi-web-stranica-ako-imam-facebook",
    "title": "Imam Facebook. Treba li mi uopće web stranica?",
    "metaTitle": "Imam Facebook. Treba li mi uopće web stranica? | zip",
    "description": "Kada je Facebook stranica dovoljna za malu tvrtku, a kada vam treba web stranica. Iskren odgovor i tri koraka da sami provjerite.",
    "category": "Web stranice",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Kratak odgovor: ponekad ne treba. Ali ako vas ljudi traže na Googleu, sama Facebook stranica obično nije dovoljna. Evo kako odlučiti.",
    "html": "<h2>Kada je Facebook dovoljan</h2>\n<ul><li>Svi klijenti dolaze preko preporuke i ionako vas već znaju.</li><li>Ne tražite nove klijente, nego održavate postojeće.</li><li>Radite povremeno, kao hobi ili uz drugi posao.</li></ul>\n<p>Ako se prepoznajete ovdje, stranica vam vjerojatno ne treba. Bolje je dobro voditi Facebook i Google profil nego imati stranicu koju nitko ne održava.</p>\n<h2>Kada Facebook nije dovoljan</h2>\n<h3>Ljudi vas traže na Googleu, ne na Facebooku</h3>\n<p>Kad netko treba frizera, vodoinstalatera ili računovođu, upiše uslugu i mjesto u Google. U rezultatima se prikazuju Google profili tvrtki i web stranice. Google navodi da na lokalni poredak utječe i koliko je tvrtka poznata, između ostalog po linkovima na njezinu stranicu. Bez stranice taj dio ostaje prazan.</p>\n<h3>Facebook nije vaš</h3>\n<p>Pravila, izgled i doseg objava određuje Meta i mijenja ih kad hoće. Stranica i domena su vaši i ostaju vaši bez obzira na to što se dogodi s bilo kojom mrežom.</p>\n<h3>Kupci žele provjeriti prije nego što se jave</h3>\n<p>Prije prvog poziva ljudi žele vidjeti što točno radite, gdje ste i kako izgledaju vaši radovi. Na Facebooku je to raštrkano po objavama, a na stranici je na jednom mjestu.</p>\n<h3>Teško je doći do upita</h3>\n<p>Na Facebooku posjetitelj mora tražiti gumb za poruku ili broj telefona između objava. Dobra stranica ima jedan jasan put: poziv, obrazac ili rezervaciju.</p>\n<h2>Ne mora biti velika stranica</h2>\n<p>Za većinu malih tvrtki dovoljna je jedna stranica: što radite, za koga, gdje, nekoliko primjera rada i jasan način da vas se kontaktira. Važno je da je povezana s Google profilom i da se brzo otvara na mobitelu.</p>\n<h2>Provjerite sami u tri koraka</h2>\n<ol><li>Provjerite imate li Google Business profil i jesu li podaci točni.</li><li>Upišite svoju uslugu i mjesto u Google, npr. “frizer Trešnjevka”, i pogledajte tko se pojavljuje.</li><li>Ako vas nema, a ljudi traže to što radite, vrijeme je za stranicu.</li></ol>\n<p>Povezano: <a href=\"/hr/izrada-web-stranica\">Izrada web stranica za male tvrtke</a></p>",
    "sources": [],
    "alt": "do-i-need-a-website-if-i-have-facebook"
  },
  {
    "related": {
      "href": "/hr/redizajn-web-stranice",
      "label": "Redizajn web stranice"
    },
    "lang": "hr",
    "slug": "redizajn-ili-nova-web-stranica",
    "title": "Redizajn ili nova web stranica: kako odlučiti",
    "metaTitle": "Redizajn ili nova web stranica: kako odlučiti | zip",
    "description": "Kada je dovoljno popraviti postojeću web stranicu, a kada je bolje napraviti novu. Jasni znakovi, tri pitanja prije odluke i na što paziti kod redizajna.",
    "category": "Web stranice",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Stranica vam ne donosi upite i znate da nešto treba mijenjati. Pitanje je samo: popraviti postojeću ili krenuti ispočetka?",
    "html": "<h2>Kada je dovoljno popraviti</h2>\n<ul><li>Stranica se brzo otvara na mobitelu.</li><li>Lako se uređuje, a sustav se redovito ažurira.</li><li>Struktura ima smisla, samo je put do upita nejasan ili su tekstovi slabi.</li><li>Na Googleu se već pojavljujete za neke pojmove.</li></ul>\n<p>Tada najviše dobivate ciljanim izmjenama: jasnijim gumbom za upit, boljim tekstovima i bržom naslovnicom.</p>\n<h2>Kada je bolje napraviti novu</h2>\n<ul><li>Na mobitelu se teško koristi ili se raspada.</li><li>Nitko više ne zna kako se uređuje, ili za svaku sitnicu morate nekoga zvati.</li><li>Izgleda toliko staro da djeluje kao da više ne radite.</li><li>Usluge su se promijenile, a stranica i dalje govori o onome što više ne radite.</li></ul>\n<p>Tada je krpanje često skuplje od nove stranice, jer plaćate rad na nečemu što ćete ionako morati zamijeniti.</p>\n<h2>Tri pitanja prije odluke</h2>\n<ol><li>Što stranica treba napraviti: dovesti poziv, upit ili rezervaciju?</li><li>Možete li sami promijeniti tekst, cijenu ili radno vrijeme?</li><li>Odakle danas dolaze ljudi koji vas pronađu: s Googlea, s mreža ili preko preporuke?</li></ol>\n<p>Ako na prvo pitanje nemate jasan odgovor, nijedna stranica neće raditi dobro, ni stara ni nova. Krenite od toga.</p>\n<h2>Na što paziti kod redizajna</h2>\n<p>Ako stara stranica ima pozicije na Googleu, stare adrese treba preusmjeriti na nove. Inače i ljudi i Google završe na praznoj stranici, a pozicije padnu. Domena ostaje vaša, a nova stranica bi na kraju trebala u potpunosti prijeći u vaše vlasništvo, s datotekama i pristupom.</p>\n<p>Povezano: <a href=\"/hr/redizajn-web-stranice\">Redizajn web stranice</a></p>",
    "sources": [],
    "alt": "redesign-or-new-website"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "stranica-izgleda-dobro-ali-ne-donosi-upite",
    "title": "Zašto vam stranica izgleda dobro, ali ne donosi upite ni rezervacije",
    "metaTitle": "Zašto vam stranica izgleda dobro, ali ne donosi upite ni rezervacije | zip",
    "description": "Lijepa web stranica koja ne donosi upite: šest razloga zašto posjetitelji odlaze bez javljanja i kako to sami provjeriti na mobitelu.",
    "category": "Web stranice",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Stranica je lijepa, svima se sviđa, a upita nema. Izgled je samo jedan dio. Posjetitelj u nekoliko sekundi odlučuje hoće li se javiti, i najčešće odustane zbog sitnica.",
    "html": "<h2>1. Ne vidi se odmah što radite</h2>\n<p>Velika fotografija i slogan poput “Vaš partner za budućnost” lijepo izgledaju, ali posjetitelj ne zna je li na pravom mjestu. Prvi ekran treba reći što radite, za koga i gdje.</p>\n<h2>2. Nema jednog jasnog sljedećeg koraka</h2>\n<p>Ako su na stranici “Saznaj više”, “Pogledaj galeriju”, “Prati nas” i “Kontakt” jednako važni, posjetitelj ne klikne ništa. Odlučite što želite da napravi (nazove, pošalje upit, rezervira) i neka taj gumb bude najuočljiviji.</p>\n<h2>3. Na mobitelu je teško</h2>\n<p>Većina ljudi stranicu otvara na mobitelu. Broj telefona koji se ne može kliknuti, obrazac s deset polja ili gumb koji se ne vidi bez skrolanja znače izgubljene upite.</p>\n<h2>4. Sporo se otvara</h2>\n<p>Lijepe velike fotografije često su i najveći razlog sporosti. Ako stranica na mobilnom internetu treba više od nekoliko sekundi, dio ljudi ode prije nego što je vidi.</p>\n<h2>5. Nema razloga da vam vjeruju</h2>\n<p>Recenzije, primjeri rada, prava imena i fotografije ljudi, adresa. Bez toga posjetitelj ne zna je li tvrtka stvarna i još uvijek radi.</p>\n<h2>6. Obrazac ili rezervacija ne rade</h2>\n<p>Zvuči banalno, ali događa se: obrazac šalje poruke na stari e-mail ili rezervacija javlja grešku. Pošaljite sami sebi upit s mobitela i provjerite stiže li.</p>\n<h2>Test od pet minuta</h2>\n<p>Dajte mobitel nekome tko vas ne zna i zamolite ga da vas kontaktira preko stranice. Ne pomažite. Gdje zastane, tamo stranica gubi upite.</p>",
    "sources": [],
    "alt": "site-looks-good-but-brings-no-enquiries"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "sto-poslovna-web-stranica-mora-imati-po-zakonu",
    "title": "Što svaka poslovna web stranica mora imati po zakonu",
    "metaTitle": "Što svaka poslovna web stranica mora imati po zakonu | zip",
    "description": "Obvezni podaci na web stranici obrta i d.o.o.-a u Hrvatskoj, politika privatnosti i kolačići. Pregled s popisom za provjeru.",
    "category": "Web stranice",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Većina malih tvrtki na stranici nema sve podatke koje propisi traže. To je lako ispraviti, ali prvo treba znati što točno mora pisati.",
    "html": "<p>Ovo je pregled za lakše snalaženje, ne pravni savjet. Za svoj slučaj provjerite s knjigovođom ili pravnikom.</p>\n<h2>Ako ste obrt</h2>\n<ul><li>Naziv obrta (tvrtka) i oznaka obrta</li><li>Ime i prezime vlasnika</li><li>Adresa sjedišta</li><li>Tijelo koje vodi obrtni registar i broj upisa</li><li>OIB</li><li>Banka i broj računa</li><li>Kontakt: e-mail i telefon</li></ul>\n<h2>Ako ste d.o.o.</h2>\n<ul><li>Tvrtka (puni naziv) i sjedište</li><li>Sud pri kojem je društvo upisano i matični broj subjekta (MBS)</li><li>OIB</li><li>Banka i IBAN</li><li>Iznos temeljnog kapitala i je li uplaćen u cijelosti</li><li>Imena članova uprave</li><li>Kontakt: e-mail i telefon</li></ul>\n<p>Popis za d.o.o. dolazi iz članka 21. Zakona o trgovačkim društvima, a kontakt podaci iz Zakona o elektroničkoj trgovini.</p>\n<h2>Za sve: politika privatnosti</h2>\n<p>Ako stranica prikuplja bilo kakve osobne podatke (obrazac za kontakt, rezervacija, newsletter), mora imati politiku privatnosti: tko obrađuje podatke, zašto, koliko dugo ih čuva, tko ih još dobiva i koja prava ljudi imaju.</p>\n<h2>Za sve: kolačići</h2>\n<p>Kolačići koji su nužni za rad stranice ne traže privolu. Kolačići za analitiku ili oglase traže privolu posjetitelja prije nego što se postave, a ne samo obavijest “ova stranica koristi kolačiće”.</p>\n<h2>Ako prodajete preko stranice</h2>\n<p>Web trgovina ima dodatne obveze: jasne cijene s PDV-om, uvjete prodaje, pravo na jednostrani raskid i podatke o reklamacijama. To je zasebna tema.</p>\n<h2>Popis za provjeru</h2>\n<ol><li>Pogledajte podnožje svoje stranice: jesu li svi podaci od gore tamo?</li><li>Postoji li politika privatnosti i je li povezana uz svaki obrazac?</li><li>Koristite li Google Analytics ili Meta Pixel? Ako da, pitate li za privolu?</li></ol>",
    "sources": [
      {
        "label": "Pisalica: obvezni podaci na webu tvrtki i obrta",
        "href": "https://pisalica.com/obavezni-podaci-web-tvrtke-obrti/"
      },
      {
        "label": "Meta Digital: obvezni podaci na web stranici",
        "href": "https://metadigital.hr/obavezni-podaci-na-web-stranici/"
      }
    ],
    "alt": "what-a-business-website-must-show-by-law-croatia"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "koliko-kosta-web-stranica-2026",
    "title": "Koliko bi vas stvarno trebala koštati web stranica u 2026.",
    "metaTitle": "Koliko bi vas stvarno trebala koštati web stranica u 2026. | zip",
    "description": "Koliko košta izrada web stranice u Hrvatskoj u 2026.: tržišni rasponi cijena, što ih određuje, troškovi koje ljudi zaborave i pitanja koja trebate postaviti prije potpisa.",
    "category": "Web stranice",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Cijene izrade web stranica u Hrvatskoj kreću se od nekoliko stotina do nekoliko tisuća eura. Razlika nije samo u izgledu, nego u tome što dobijete i što plaćate kasnije.",
    "html": "<h2>Okvirni rasponi na tržištu</h2>\n<p>Prema pregledu cijena za 2026. jedne hrvatske agencije, jednostavna predstavljačka stranica za obrt ili malu tvrtku je oko 400–900 €, poslovna stranica s više sadržaja oko 900–1.800 €, a web trgovina od oko 1.200 € naviše. To su tuđe cijene i služe samo kao orijentacija.</p>\n<h2>Što određuje cijenu</h2>\n<ul><li>Broj stranica i koliko sadržaja ima svaka</li><li>Gotov predložak ili dizajn rađen za vas</li><li>Obrazac za upite, sustav za rezervacije ili trgovina</li><li>Tko piše tekstove i tko daje fotografije</li><li>Broj jezika</li><li>Je li uključena osnovna SEO priprema i povezivanje s Google profilom</li></ul>\n<h2>Troškovi koje ljudi zaborave</h2>\n<ul><li>Domena i hosting, svake godine</li><li>Održavanje i ažuriranja</li><li>Izmjene nakon objave: jesu li uključene ili se naplaćuju po satu?</li><li>Fotografije i tekstovi, ako ih nemate</li></ul>\n<h2>Kada je jeftino zapravo skupo</h2>\n<p>Stranica za 200 € koja ne donosi nijedan upit skuplja je od one za 900 € koja donese posao mjesečno. Pitajte što stranica treba napraviti za vas, a ne samo koliko košta.</p>\n<h2>Pet pitanja prije potpisa</h2>\n<ol><li>Što je točno uključeno, a što se plaća posebno?</li><li>Čija je stranica nakon objave: datoteke, domena i pristupi?</li><li>Mogu li sam mijenjati tekst i cijene?</li><li>Koliko košta godišnje nakon prve godine?</li><li>Je li stranica povezana s Google profilom i pripremljena za Google?</li></ol>\n<p>Kod nas cijenu dobijete napismeno nakon besplatne provjere, prije bilo kakvog posla.</p>",
    "sources": [
      {
        "label": "Lenko dizajn: koliko košta izrada web stranice u Hrvatskoj 2026.",
        "href": "https://lenko-dizajn.hr/blog/2026/04/24/koliko-kosta-izrada-web-stranice-hrvatska/"
      }
    ],
    "alt": "how-much-should-a-website-cost-2026"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "zasto-svakodnevno-objavljivanje-ne-pomaze",
    "title": "Zašto objavljivanje svaki dan ne pomaže ako nitko ne komentira",
    "metaTitle": "Zašto objavljivanje svaki dan ne pomaže ako nitko ne komentira | zip",
    "description": "Objavljujete svaki dan, a doseg i upiti ne rastu? Što Instagram kaže o tome koje objave prikazuje i što male tvrtke mogu napraviti umjesto više objava.",
    "category": "Društvene mreže",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Više objava ne znači više ljudi. Ako nitko ne reagira, svaka nova objava ide sve manjem broju ljudi, a vi trošite vrijeme koje biste mogli uložiti u nešto što radi.",
    "html": "<h2>Što Instagram gleda</h2>\n<p>Instagram objašnjava da pri slaganju objava u feedu gleda, između ostalog, koliko ljudi i koliko brzo lajka, komentira, dijeli i sprema objavu, te koliko su ljudi u zadnjih nekoliko tjedana komunicirali s vama. Broj objava nije među tim signalima.</p>\n<h2>Zašto svakodnevne objave mogu odmoći</h2>\n<p>Ako svaka objava dobije malo reakcija, to je signal da sadržaj ljudima nije zanimljiv. Usto, kad objavljujete pod pritiskom, kvaliteta pada, a ljudi brzo nauče preskakati vaše objave.</p>\n<h2>Što napraviti umjesto toga</h2>\n<ul><li>Manje, ali bolje. Dvije do tri objave tjedno koje netko želi spremiti ili poslati prijatelju vrijede više od sedam koje nitko ne pogleda.</li><li>Odgovarajte na svaki komentar i poruku, i to brzo. Razgovor je signal, a i način da upit postane posao.</li><li>Pitajte nešto konkretno. “Što vam je teže, X ili Y?” dobije više odgovora od “Javite se!”.</li><li>Sadržaj koji se sprema: popisi, savjeti, usporedbe prije i poslije.</li><li>Pratite poruke i upite, ne samo lajkove. Lajk ne plaća račune.</li></ul>\n<h2>Kako znati radi li</h2>\n<p>Jednom mjesečno pogledajte koje su objave donijele poruku, poziv ili posjet stranici. Napravite više takvih, a manje onih koje ne donose ništa.</p>",
    "sources": [
      {
        "label": "Instagram: kako funkcionira rangiranje",
        "href": "https://about.instagram.com/blog/announcements/instagram-ranking-explained/"
      }
    ],
    "alt": "why-posting-every-day-doesnt-help"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "3-vrste-objava-koje-dovode-klijente",
    "title": "3 vrste objava koje stvarno dovode klijente malim obrtima",
    "metaTitle": "3 vrste objava koje stvarno dovode klijente malim obrtima | zip",
    "description": "Tri vrste objava na društvenim mrežama koje malim obrtima donose upite, a ne samo lajkove, s primjerima za svaku i kako završiti objavu.",
    "category": "Društvene mreže",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Lijepe fotografije i blagdanske čestitke skupljaju lajkove. Upite donose objave koje pokazuju rad, odgovaraju na pitanja i dokazuju da ste pouzdani.",
    "html": "<h2>1. Rad iza kulisa: prije i poslije, ili kako nastaje</h2>\n<p>Ljudi kupuju rezultat, a vjeruju procesu. Pokažite stan prije i poslije bojanja, frizuru u tri koraka, popravak od kvara do rješenja. Kratki video ili carousel s tri do pet fotografija je dovoljan.</p>\n<p>Završite s: “Imate sličan problem? Pošaljite fotografiju u poruci.”</p>\n<h2>2. Odgovor na pitanje koje vam kupci stvarno postavljaju</h2>\n<p>Svako pitanje koje ste čuli tri puta je tema za objavu: “Koliko traje…?”, “Koliko košta…?”, “Što ako…?”. Takve objave ljudi spremaju i šalju dalje, a vi ih poslije možete slati kao link kad netko opet pita.</p>\n<p>Završite s: “Imate drugo pitanje? Napišite ga u komentar.”</p>\n<h2>3. Dokaz: što kaže kupac</h2>\n<p>Recenzija s Googlea, poruka zadovoljnog kupca ili kratka izjava, uvijek uz dopuštenje. Uz to dodajte što ste točno napravili. “Super ste!” je lijepo, ali “Riješili ste curenje za sat vremena, u nedjelju” prodaje.</p>\n<p>Završite s: broj telefona ili link za rezervaciju.</p>\n<h2>Omjer koji radi</h2>\n<p>Ne treba svaka objava prodavati. Ali svaka treba pokazati da znate što radite. Ako u mjesecu imate po jednu od ove tri vrste, već ste ispred većine konkurencije.</p>",
    "sources": [],
    "alt": "3-types-of-posts-that-bring-clients"
  },
  {
    "related": null,
    "lang": "hr",
    "slug": "instagram-ili-facebook-gdje-je-vas-klijent",
    "title": "Instagram ili Facebook: gdje je vaš klijent stvarno aktivan",
    "metaTitle": "Instagram ili Facebook: gdje je vaš klijent stvarno aktivan | zip",
    "description": "Kako mala tvrtka može odlučiti treba li joj Instagram, Facebook ili oboje: četiri načina da provjerite gdje su vaši kupci, bez nagađanja.",
    "category": "Društvene mreže",
    "date": "2026-10-01",
    "minutes": 2,
    "intro": "Nema univerzalnog odgovora. Ovisi o tome tko su vaši kupci i kako vas traže. Dobra vijest je da to možete provjeriti za jedno popodne umjesto da nagađate.",
    "html": "<h2>1. Pitajte kupce</h2>\n<p>Najjednostavnije i najtočnije. Sljedećih deset kupaca pitajte kako su vas našli i koju mrežu najviše koriste. Deset odgovora reći će vam više od bilo koje statistike.</p>\n<h2>2. Pogledajte odakle stižu upiti</h2>\n<p>Ako vam pišu na Facebook poruke, a na Instagramu imate lajkove, ali ne i poruke, odgovor je već tu. Upit vrijedi više od pratitelja.</p>\n<h2>3. Pogledajte konkurenciju</h2>\n<p>Nađite tri do pet tvrtki iz svoje djelatnosti i grada. Gdje imaju komentare i pitanja kupaca, a ne samo lajkove? Tamo su i vaši kupci.</p>\n<h2>4. Razmislite kako vas traže</h2>\n<p>Ako ljudi traže uslugu kad im zatreba (vodoinstalater, servis, odvjetnik), prvo dolazi Google, a ne mreže. Ako kupuju očima (frizura, nokti, hrana, interijer), Instagram ima više smisla.</p>\n<h2>Naš savjet za male tvrtke</h2>\n<ul><li>Jedna mreža koju vodite redovito bolja je od dvije koje vodite povremeno.</li><li>Prije bilo koje mreže sredite Google Business profil. Tamo vas ljudi traže kad su spremni kupiti.</li><li>Isti sadržaj možete objaviti na obje mreže, ali odgovarajte tamo gdje ljudi stvarno pišu.</li></ul>",
    "sources": [],
    "alt": "instagram-or-facebook-where-are-your-customers"
  }
];

export const postsIn = (lang: "en" | "hr") => posts.filter((p) => p.lang === lang);
export const findPost = (lang: "en" | "hr", slug: string) => posts.find((p) => p.lang === lang && p.slug === slug);
export const blogPath = (p: Pick<BlogPost, "lang" | "slug">) => (p.lang === "hr" ? `/hr/blog/${p.slug}` : `/blog/${p.slug}`);
