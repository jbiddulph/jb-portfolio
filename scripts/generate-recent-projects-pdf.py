#!/usr/bin/env python3
"""Generate a PDF describing John Biddulph's recent applications."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUTPUT = Path("/workspace/public/john-biddulph-recent-projects-2026.pdf")

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4b5563")
ACCENT = colors.HexColor("#1d4ed8")
RULE = colors.HexColor("#d1d5db")
CREAM = colors.HexColor("#f8fafc")
CARD = colors.HexColor("#ffffff")
CHIP = colors.HexColor("#eff6ff")


PROJECTS = [
    {
        "name": "Lucidity",
        "date": "August 2026",
        "url": "https://lucidity-lac.vercel.app",
        "stack": "Nuxt, Supabase, Prisma, API keys, headless CMS",
        "summary": "A headless content management system for sites built in Nuxt, Next.js, React, Vue, or Svelte.",
        "does": "Lucidity stores structured content (authors, pages, posts, and custom schemas), keeps drafts separate from published documents, and exposes that content through a query API protected by API keys. A consuming site can list schema types, fetch pages for navigation, and pull collections such as blog posts onto a page. The product is the CMS itself — sign-up, sign-in, docs, and an API — not a marketing brochure.",
        "users": [
            "Create content types and documents instead of hard-coding copy in a frontend.",
            "Issue API keys so a Nuxt or Next site can read published content.",
            "Keep drafts unpublished until they are ready to go live.",
        ],
    },
    {
        "name": "ProbeWord",
        "date": "August 2026",
        "url": "https://probeword.vercel.app/",
        "stack": "Nuxt, OpenAI, n8n",
        "summary": "An AI SEO brief generator: you enter a keyword and optional competitor URLs, and it returns work you can put on a page.",
        "does": "ProbeWord is not a rank tracker. You type a search term, optionally add up to five competitor sites, pick a market (UK, US, AU, IE), and an n8n workflow calls OpenAI. The output is keyword ideas (seed, long-tail, question, comparison), SERP-ready titles, meta descriptions, H1s, slugs, competitor gaps, and on-page recommendations. The point of the app is a brief a developer or copywriter can implement, not a dashboard of historical rankings.",
        "users": [
            "Run keyword research for a page you actually intend to publish.",
            "Name rival URLs and get a plan to outrank them.",
            "Copy titles, metas, and on-page structure into a site.",
        ],
    },
    {
        "name": "BonsAI",
        "date": "July 2026",
        "url": "https://jbonsai.netlify.app/",
        "stack": "Next.js, TypeScript, Neon Postgres, Drizzle, OpenAI, Stripe, Netlify",
        "summary": "An AI plant-based food assistant that builds a week of meals, a grocery list, and leftover ideas in about 30 seconds.",
        "does": "A visitor answers preferences, budget, and time constraints. OpenAI returns a 7-day plant-based plan. The app then produces a shopping list with estimated cost, organised by category. Extra tools include a label/menu scanner to flag animal ingredients, pantry/leftover suggestions to cut waste, and Stripe billing (free tier of 5 plans a month, premium from £7.99). Auth and data sit on Neon. This is a meal-planning product, not a recipe blog.",
        "users": [
            "Generate a personalised 7-day vegan/vegetarian plan.",
            "Shop from an auto-built grocery list with cost estimates.",
            "Scan a packet or menu and check it is plant-based.",
            "Turn leftovers into another meal instead of throwing food away.",
        ],
    },
    {
        "name": "TagFlow",
        "date": "July 2026",
        "url": "https://www.tagflow.co.uk",
        "stack": "Django, Python, API, payments",
        "summary": "A B2B ordering layer so pet apps, hotels, events, and brands can sell NFC tags on their own sites without running a factory.",
        "does": "Partners sign up free, then either embed an iframe checkout or call an API from their own form. Orders are routed to a manufacturer for fulfilment. TagFlow takes payment and order status in the middle. The live homepage is explicit: you do not need to manufacture tags yourself. Typical buyers are pet products, hotels, events, and branded apps that want NFC hardware as an add-on.",
        "users": [
            "A partner embeds tag ordering on their existing website.",
            "A manufacturer receives fulfilment jobs instead of building storefronts.",
            "TagFlow tracks payment and status between those two sides.",
        ],
    },
    {
        "name": "UKPubs",
        "date": "September 2025 (actively maintained 2026)",
        "url": "https://ukpubs.co.uk/",
        "stack": "Nuxt, Supabase, Prisma, location services (frontend repo: johnpyfe)",
        "summary": "A UK-wide pubs and venues directory with search, news, events, and location-based lists.",
        "does": "People search by town, county, or pub name. The live site ranks towns and counties by listing count (London thousands of pubs), lists seaside towns, and shows pubs within a mile of every Premier League stadium. It also publishes pub-industry news and upcoming gigs/comedy at venues. The stack has moved over the years from PHP and Laravel through Python/Nuxt to Nuxt with Supabase and Prisma. johnpyfe is the current frontend.",
        "users": [
            "Find a pub near a town, coast, or football ground.",
            "Read openings, closures, and industry news.",
            "See which venues have the most upcoming events.",
        ],
    },
    {
        "name": "Zap Task",
        "date": "September 2025",
        "url": "https://www.zaptask.co.uk",
        "stack": "Laravel, Vue 3, TypeScript, Tailwind, Supabase realtime (repo: taskit)",
        "summary": "A simplified Jira-style task manager: Kanban boards, projects, assignees, and workflow without enterprise complexity.",
        "does": "Zap Task is a multi-project todo system. Each user gets isolated project boards (keys, colours, descriptions). Inside a board, cards move across To Do / In Progress / Done with drag and drop. Cards have priority, type (bug, feature, story, epic), tags, assignee, due dates, story points, search, and filters. There is a stats strip (total, in progress, done, overdue), dark mode, and a subdomain-per-tenant pattern. The product exists as a lighter alternative to Jira for small teams.",
        "users": [
            "Create a project board and keep work on a Kanban board.",
            "Assign, tag, estimate, and drag cards between columns.",
            "Filter by person, type, or priority instead of hunting a backlog.",
        ],
    },
    {
        "name": "ZapTask — subdomain dashboard",
        "date": "July 2026",
        "url": "https://johnb.zaptask.co.uk",
        "stack": "Same Zap Task platform, tenant subdomain",
        "summary": "A live tenant of Zap Task, showing how each customer gets their own dashboard on a subdomain.",
        "does": "This is not a separate product. johnb.zaptask.co.uk is an example workspace on the Zap Task multi-tenant setup. It demonstrates that a team can work in their own URL while the core app stays at zaptask.co.uk. Cookie consent and the same Zap Task shell load on that host.",
        "users": [
            "Sign into a personal or team workspace at a dedicated subdomain.",
            "Use the same Kanban/task tools without sharing another tenant’s board.",
        ],
    },
    {
        "name": "Old Skool Vibe Dev",
        "date": "July 2026",
        "url": "https://www.oldskoolvibe.dev/",
        "stack": "React, Vite, Supabase, Resend",
        "summary": "A services site advertising freelance work: React, Vue, Nuxt, Laravel, Python, and AI-assisted development.",
        "does": "Each advert page is written for a buyer who needs a specific skill (frontend, backend, PostgreSQL/Supabase, UI/UX, SEO, vibe coding). Enquiry forms store rows in oldskoolvibe_service_enquiries and email john.mbiddulph@gmail.com via Resend. It is a lead-generation site for contract work, not a SaaS app with user accounts for end customers.",
        "users": [
            "Read a service page for the stack they need.",
            "Send a project enquiry that is stored and emailed.",
        ],
    },
    {
        "name": "Dog Healthy",
        "date": "October 2025",
        "url": "https://doghealthy.co.uk",
        "stack": "Nuxt, Supabase, Prisma, NFC/QR, SMS alerts, affiliate food data",
        "summary": "A UK dog-owner hub: health records, vaccinations, food matching, walks, and NFC/QR tags if a dog is lost.",
        "does": "Owners create dog profiles (breed, photos, microchip). They log medical history, vaccinations with reminders, medications, vet appointments, vet contacts, and weight charts. A food quiz recommends products by breed, age, diet, and budget, with affiliate comparison. Newer NFC/QR tags encode the DogHealthy profile: a finder or sitter can start a GPS walk, check in/out, or report a lost dog so the owner gets an SMS with contact and location. The service is UK-only and free to start.",
        "users": [
            "Keep one place for jabs, meds, weight, and vet details.",
            "Get a food match instead of guessing in the supermarket.",
            "Put an NFC sticker on a collar so a finder can alert the owner.",
        ],
    },
    {
        "name": "Trailsz (iOS)",
        "date": "May 2026",
        "url": "https://apps.apple.com/gb/app/trailsz/id6763732208",
        "stack": "iOS, maps, navigation",
        "summary": "An iPhone app for discovering, creating, and sharing walking, cycling, and driving trails.",
        "does": "Trailsz is a navigation product, not a simple map bookmark list. Users find existing trails, plot their own, drop map notes, add mystery stops, and read community reports. It covers walking, cycling, and driving. The App Store listing is the distribution channel; the job of the app is to get someone from A to B along a shared or homemade route with extra points of interest on the way.",
        "users": [
            "Follow a trail with notes and stops on the map.",
            "Publish a route so other people can walk or ride it.",
            "Report issues on a trail for the rest of the community.",
        ],
    },
    {
        "name": "ScanAJoke",
        "date": "June–July 2026",
        "url": "https://scanajoke-9g4j.vercel.app/",
        "stack": "Vite/TypeScript, in-browser OCR, OpenAI",
        "summary": "Point a camera at real-world text; the browser reads it and OpenAI turns it into a pun.",
        "does": "The user scans a receipt, sign, page, note, or screenshot (or uploads an image). OCR runs locally in the browser. The extracted text is shown for review, then sent to OpenAI for a short joke or pun. There is no account system on the landing flow — it is a three-step toy: scan, review text, get a punchline. Example text is available if you do not want to use the camera.",
        "users": [
            "Photograph a menu, sign, or receipt.",
            "Edit the extracted words if OCR misreads them.",
            "Get a one-off pun generated from that text.",
        ],
    },
    {
        "name": "Ball-Z (SiteForge)",
        "date": "July 2026",
        "url": "https://ball-z-phi.vercel.app/",
        "stack": "Next.js, Supabase Auth, AI code generation",
        "summary": "A chat-driven website builder: you describe a site, then keep asking for changes until the live preview and generated Next.js code look right.",
        "does": "The dashboard is named SiteForge. After optional sign-in (Supabase, so projects stay private), you talk to a builder chat. It drafts a landing page (the default demo is a fitness studio called Pulse House), shows a desktop/mobile preview, and emits real files: layout.tsx, page.tsx, CSS, and a client component. Follow-up messages can restyle the theme, rewrite copy, or move sections (pricing, testimonials, services). The application is a generator, not a hosted CMS for the finished business.",
        "users": [
            "Describe a business and get a landing-page draft.",
            "Iterate in chat (“make it purple”, “move pricing”).",
            "Inspect and export the generated Next.js source.",
        ],
    },
    {
        "name": "HelloJ",
        "date": "May 2026",
        "url": "https://helloj.vercel.app/",
        "stack": "Node/JavaScript, image generation, Vinted browse",
        "summary": "An AI virtual try-on tool: your photo plus a garment (upload, camera, or Vinted) produces a styled preview.",
        "does": "You supply a person photo and a reference outfit. Outfits can come from an upload, a live camera, or a Vinted category browse (shirts, hats, trousers, dresses). Controls include item type, output aspect ratio, how strictly to keep the original background, and garment-change strength. The server returns a generated image, a download, and a history of previous results. This is a fashion visualisation app, not a shop checkout.",
        "users": [
            "See how a garment might look on their own photo.",
            "Pull a Vinted listing as the reference clothing.",
            "Download the generated try-on image.",
        ],
    },
    {
        "name": "hangn.art",
        "date": "2026",
        "url": "https://www.hangn.art/",
        "stack": "Realtime collaborative canvas, gallery",
        "summary": "A live shared sketchbook: up to four people draw on one sheet at the same time, then save it to a gallery.",
        "does": "Open a new sketch, give your name, share the URL. Everyone on that sheet sees strokes as they happen. Tools include ten pens (ink, pencil, marker, brush, spray, and more) plus shapes and text that can be moved and restyled. When the group agrees, the drawing is saved to a public gallery shelf. This is a realtime drawing product, not a static art portfolio.",
        "users": [
            "Start a sheet and invite friends with a link.",
            "Draw together live (capped at four people).",
            "Browse finished sketches in the gallery.",
        ],
    },
    {
        "name": "Coastrz",
        "date": "May 2025",
        "url": "https://www.coastrz.com",
        "stack": "Ecommerce, custom design, web platform (TypeScript + Python repos)",
        "summary": "An online shop for drinks coasters, including custom and branded designs.",
        "does": "Coastrz sells physical coasters (wood, ceramic, and similar) and offers a custom/branded service. Related experiments include hanging album-cover coasters (a six-cover set) wired to Spotify. The customer-facing job is product browsing and ordering, not a content site.",
        "users": [
            "Browse ready-made coaster designs.",
            "Order a custom or branded set.",
        ],
    },
    {
        "name": "Tripz (iOS)",
        "date": "July 2025",
        "url": "https://apps.apple.com/gb/app/tripz/id6745882589",
        "stack": "iOS, maps, accounting-style logs",
        "summary": "An iPhone app for logging trips with live maps, earnings, and spending — aimed at drivers who need income and expense records.",
        "does": "Tripz records journeys, plots them on a map, and keeps earnings versus costs. Dark mode, reports, and control over each journey are part of the pitch. It is an operational log for work travel (private hire / similar), not a consumer holiday planner.",
        "users": [
            "Start a trip and see it on a live map.",
            "Log what was earned and what was spent.",
            "Export or review reports of that activity.",
        ],
    },
    {
        "name": "Tripz (web)",
        "date": "July 2025",
        "url": "https://ridez-66c2d14c6c66.herokuapp.com/",
        "stack": "Nuxt, Tailwind, Supabase, Mapbox",
        "summary": "The browser version of Tripz: same idea as the iPhone app, on the web with Mapbox.",
        "does": "Drivers who prefer a laptop can log trips, earnings, and expenditure against a map without installing the iOS app. It shares the product purpose with Tripz on the App Store.",
        "users": [
            "Log trips from a desktop browser.",
            "See routes and money against a Mapbox map.",
        ],
    },
    {
        "name": "Schools (iOS)",
        "date": "July 2025",
        "url": "https://apps.apple.com/gb/app/schools/id6746278412",
        "stack": "iOS, maps, school directory",
        "summary": "An iPhone directory to discover, search, and review schools near you.",
        "does": "Parents look up schools in their area, read information, and leave reviews to help choose a place for their children. It is a local information/map app, not a school MIS or homework platform.",
        "users": [
            "Search schools by area.",
            "Read and write reviews.",
            "Compare options on a map.",
        ],
    },
    {
        "name": "CarScan",
        "date": "January 2026",
        "url": "https://carscan-zeta.vercel.app/",
        "stack": "Next.js, Supabase, in-browser OCR, DVLA VES",
        "summary": "Point the camera at a number plate; the app reads it locally and looks the vehicle up with DVLA.",
        "does": "The rear camera (or a manual registration field) captures a UK plate. OCR runs in the browser, validates format, then calls DVLA Vehicle Enquiry Service. Results can be saved and shared with location. It is a lookup/save tool, not an ANPR enforcement system.",
        "users": [
            "Frame a plate and confirm the registration.",
            "See DVLA vehicle data for that plate.",
            "Save or share a scan and where it was taken.",
        ],
    },
    {
        "name": "onTrack",
        "date": "October 2025",
        "url": "https://mappingme.netlify.app/",
        "stack": "Next.js, Mapbox, TfL data, GeoJSON, geocoding",
        "summary": "A London movement map: plan public-transport journeys and overlay nearby pubs, restaurants, and events.",
        "does": "After sign-in, the map layers TfL stations, entrances, platforms, accessible paths, tube, rail, and UK venues. The product combines journey planning with “what is around me” — pubs, restaurants, events — rather than being a pure TfL clone. Location tracking requires authentication.",
        "users": [
            "See tube/rail infrastructure on a live map.",
            "Plan a journey across London.",
            "Find pubs, restaurants, or events near the current route.",
        ],
    },
    {
        "name": "Worthing Roads",
        "date": "September 2025",
        "url": "https://worthingroads.netlify.app",
        "stack": "Next.js / TypeScript quiz, maps, local knowledge bank",
        "summary": "A revision quiz for the Worthing District private-hire knowledge test: junctions, roads, and points of interest.",
        "does": "The app is built around the real licensing exam, not trivia. Multiple parts cover junction questions (hundreds of items across parts 1–7) plus a POI quiz (67 questions about where local landmarks sit). Town can come from search, geolocation, or a map test. Each quiz is timed and scored, with confetti on completion. The GitHub repo describes 640+ questions about local road junctions.",
        "users": [
            "Drill Worthing junction knowledge in exam-style parts.",
            "Take a POI quiz for landmarks and road locations.",
            "Use the map test to find roads in Worthing.",
        ],
    },
    {
        "name": "PRD Generator",
        "date": "July 2025",
        "url": "https://prds.netlify.app",
        "stack": "Next.js, AI document generation",
        "summary": "Type a product idea (or pick a template) and generate a Product Requirements Document with features, specs, and user flows.",
        "does": "This is a planning tool for teams that would otherwise write a PRD by hand. You request a custom template or regenerate template ideas, then the model produces structured documentation aimed at web and mobile products. The output is a requirements document, not working software.",
        "users": [
            "Describe an app idea in plain language.",
            "Receive a structured PRD to share with developers.",
        ],
    },
    {
        "name": "Street Party",
        "date": "May 2025",
        "url": "https://street-party.uk",
        "stack": "Next.js, maps",
        "summary": "A neighbourhood tool for organising a street party: draw the houses involved, set a passcode, and let residents join.",
        "does": "An organiser creates an event by drawing around the buildings on a map, naming it, setting start/end, uploading a picture, and choosing a passcode. Residents pick that party from a list, enter the passcode, select their building, and add household members. The point is making contact between neighbours easy for one event, not a general social network.",
        "users": [
            "Organisers map which houses are in the party.",
            "Residents join with a passcode and register their household.",
        ],
    },
    {
        "name": "Pin Spots",
        "date": "September 2024",
        "url": "https://pinspots.co.uk",
        "stack": "Next.js, maps",
        "summary": "A simple map where people drop pins on places that matter to them.",
        "does": "The live homepage is intentionally small: pin a spot of interest on the map. It is a personal/geo bookmarking experiment — mark somewhere, see it on the map — rather than a full listings directory like UKPubs.",
        "users": [
            "Drop a pin on a location.",
            "Browse spots other people have marked.",
        ],
    },
    {
        "name": "Stop Charge",
        "date": "July 2024",
        "url": "https://stopcharge.co.uk/map",
        "stack": "Nuxt 3, Mapbox, Supabase, Prisma, geolocation",
        "summary": "A UK EV charging map: find chargers near you and measure distance between two points.",
        "does": "The map shows electric charging locations across the UK. You can use current location to find the nearest point, then pick two points to see distance in km or miles. It is a locator/distance tool, not a booking or payment network for charge points.",
        "users": [
            "See chargers on a national map.",
            "Find the nearest point from the current location.",
            "Measure distance between two selected points.",
        ],
    },
    {
        "name": "Melvyn Biddulph",
        "date": "March 2023 (maintained)",
        "url": "https://melvbiddulph.art",
        "stack": "Art gallery / portfolio site",
        "summary": "An online gallery for paintings and biography of Melvyn Biddulph (Rochdale / St Martins), with enquiries handled by John.",
        "does": "The site tells Melvyn’s story (Rochdale College of Art, St Martins 1968–71, later textile design, 2018 solo show “Back from the Dead”) and lists works. Enquiries quote a piece ID to John on 07935 085 736. This is a family artist archive and sales enquiry front, not a social art network.",
        "users": [
            "Read the artist biography and interview material.",
            "Browse works and enquire about a specific ID.",
        ],
    },
    {
        "name": "jbiddulph.com (this site)",
        "date": "Ongoing, 2024–2026",
        "url": "https://www.jbiddulph.com",
        "stack": "Nuxt 3, Vue, Tailwind, Prisma, Supabase, Pinia",
        "summary": "Personal site, CV, services, docs, blog, and the CMS that publishes the portfolio this PDF is based on.",
        "does": "Public pages: home, portfolio grid, project detail, CV (with PDF download), services with enquiry form, docs, blog. Admin: portfolio CRUD and reorder, designs/themes (colours, fonts, layout), site info, pages copy, videos, links, uploads. Designs can be switched per visitor. The database table jbiddulph_portfolio is the source of the live project list. Chat and enquiry APIs sit alongside it.",
        "users": [
            "Browse live projects and open each product URL.",
            "Read the 2026 CV or download the CV PDF.",
            "Send a services enquiry.",
            "John manages content from /admin without a code deploy for every change.",
        ],
    },
]

APPENDIX = [
    {
        "name": "LocalSEO",
        "url": "https://localseo-ten.vercel.app",
        "text": "Google Maps ranking intelligence by postcode, not city averages: heatmaps, competitor movement, multi-location weekly alerts, and shareable reports for local operators.",
    },
    {
        "name": "Lucidity Demo",
        "url": "https://lucidity-demo.vercel.app",
        "text": "A Nuxt consumer of Lucidity. It reads schema types, builds navigation from Pages, and loops included collections (for example posts on a Blog page) through the Lucidity query API.",
    },
    {
        "name": "Air Charter Broker CRM",
        "url": "https://air-charter-broker-crm.vercel.app",
        "text": "A Next.js + Supabase CRM for air-charter brokers: companies, contacts, and inquiries behind sign-in, with RLS and ShadCN UI.",
    },
    {
        "name": "TalkToMe",
        "url": "https://github.com/jbiddulph/talktome",
        "text": "AI meeting notes: record audio, transcribe with Whisper, generate a summary, file meetings in folders, and download an ICS calendar event. Next.js + Capacitor for iOS.",
    },
    {
        "name": "Camme / Exhibitionist",
        "url": "https://camme.vercel.app",
        "text": "Social cam and chat foundation: FastAPI + Go web app, LiveKit video, Redis, Stripe/IAP, and Lovense tip-to-toy hooks. exhibitionist.me is the public-facing live broadcast/chat direction of the same idea.",
    },
    {
        "name": "Ask Midwife",
        "url": "https://askmidwife.vercel.app",
        "text": "A Next.js app for maternity questions (live at askmidwife.vercel.app). Companion to the other 2026 consumer experiments on Vercel.",
    },
]


def styles():
    base = getSampleStyleSheet()
    s = {
        "cover_kicker": ParagraphStyle(
            "cover_kicker",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=11,
            textColor=ACCENT,
            alignment=TA_CENTER,
            letterSpacing=2,
            spaceAfter=8,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=32,
            leading=38,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=14,
            leading=20,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Times-Bold",
            fontSize=18,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Times-Bold",
            fontSize=14,
            textColor=INK,
            spaceBefore=2,
            spaceAfter=4,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Times-Italic",
            fontSize=9.5,
            leading=13,
            textColor=MUTED,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10.5,
            leading=15,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=8,
        ),
        "label": ParagraphStyle(
            "label",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=9.5,
            textColor=ACCENT,
            spaceBefore=2,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10.5,
            leading=14.5,
            textColor=INK,
            leftIndent=10,
            spaceAfter=2,
        ),
        "toc": ParagraphStyle(
            "toc",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10,
            leading=13,
            textColor=INK,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=8,
            textColor=MUTED,
        ),
        "small": ParagraphStyle(
            "small",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=9.5,
            leading=13,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }
    return s


def header_footer(canvas, doc):
    canvas.saveState()
    page_w, page_h = A4
    if doc.page > 1:
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.4)
        canvas.line(18 * mm, page_h - 12 * mm, page_w - 18 * mm, page_h - 12 * mm)
        canvas.setFont("Times-Italic", 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, page_h - 10 * mm, "John Biddulph  ·  Recent projects")
        canvas.drawRightString(page_w - 18 * mm, page_h - 10 * mm, "September 2026")
        canvas.line(18 * mm, 12 * mm, page_w - 18 * mm, 12 * mm)
        canvas.drawString(18 * mm, 8 * mm, "www.jbiddulph.com")
        canvas.drawRightString(page_w - 18 * mm, 8 * mm, f"{doc.page}")
    canvas.restoreState()


def link(url):
    return f'<link href="{url}" color="#1d4ed8"><u>{url}</u></link>'


def project_block(p, s, index):
    bits = [
        Paragraph(f"{index}.  {p['name']}", s["h2"]),
        Paragraph(
            f"{p['date']}  ·  {p['stack']}<br/>{link(p['url'])}",
            s["meta"],
        ),
        Paragraph(p["summary"], s["body"]),
        Paragraph("What the application actually does", s["label"]),
        Paragraph(p["does"], s["body"]),
        Paragraph("What a user can do", s["label"]),
    ]
    for item in p["users"]:
        bits.append(Paragraph(f"–  {item}", s["bullet"]))
    bits.append(Spacer(1, 6))
    return KeepTogether(bits)


def build():
    s = styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="John Biddulph — Recent Projects 2026",
        author="John Biddulph",
        subject="What each recent application actually does",
    )
    story = []

    story.append(Spacer(1, 42 * mm))
    story.append(Paragraph("PORTFOLIO BRIEFING", s["cover_kicker"]))
    story.append(Paragraph("Recent projects", s["cover_title"]))
    story.append(Paragraph("John Biddulph  ·  Full Stack Engineer  ·  Worthing, UK", s["cover_sub"]))
    story.append(Paragraph("What each application actually does", s["cover_sub"]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(link("https://www.jbiddulph.com"), s["cover_sub"]))
    story.append(Paragraph("Generated 9 September 2026 from the live portfolio, product sites, and public repositories.", s["small"]))
    story.append(PageBreak())

    story.append(Paragraph("About this document", s["h1"]))
    story.append(
        Paragraph(
            "This PDF describes the applications on <b>jbiddulph.com/portfolio</b>, plus hangn.art "
            "(a live product not yet on that grid) and a short appendix of other 2025–2026 repos. "
            "Each entry answers a practical question: what does a person actually do in this app? "
            "Marketing one-liners from the portfolio cards are expanded from the live product, "
            "not rewritten as CV fluff.",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "Live URLs were checked in September 2026. App Store pages for Trailsz, Tripz, and Schools "
            "were listed on the portfolio; those store listings were not reachable from this environment, "
            "so those three descriptions follow the portfolio copy and related source. "
            "Coastrz and Stop Charge returned server errors when fetched; descriptions use the portfolio "
            "record and GitHub context.",
            s["body"],
        )
    )

    story.append(Paragraph("Contents", s["h1"]))
    toc_rows = []
    for i, p in enumerate(PROJECTS, 1):
        toc_rows.append(
            [
                Paragraph(f"{i}.", s["toc"]),
                Paragraph(p["name"], s["toc"]),
                Paragraph(p["date"], s["toc"]),
            ]
        )
    toc_rows.append(
        [
            Paragraph("", s["toc"]),
            Paragraph("Appendix — other recent GitHub / Vercel work", s["toc"]),
            Paragraph("", s["toc"]),
        ]
    )
    toc = Table(toc_rows, colWidths=[12 * mm, 110 * mm, 45 * mm])
    toc.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("TEXTCOLOR", (0, 0), (0, -1), ACCENT),
                ("LINEBELOW", (0, 0), (-1, -2), 0.2, RULE),
            ]
        )
    )
    story.append(toc)
    story.append(PageBreak())

    story.append(Paragraph("The applications", s["h1"]))
    story.append(
        Paragraph(
            f"{len(PROJECTS)} products. Newest work first where the live grid puts it; older map and family sites follow.",
            s["body"],
        )
    )
    for i, p in enumerate(PROJECTS, 1):
        story.append(project_block(p, s, i))

    story.append(Paragraph("Appendix — other recent work", s["h1"]))
    story.append(
        Paragraph(
            "These are public 2025–2026 projects that are not (or not yet) featured as cards on the live portfolio grid.",
            s["body"],
        )
    )
    for item in APPENDIX:
        story.append(
            KeepTogether(
                [
                    Paragraph(item["name"], s["h2"]),
                    Paragraph(link(item["url"]), s["meta"]),
                    Paragraph(item["text"], s["body"]),
                ]
            )
        )

    story.append(Spacer(1, 8 * mm))
    story.append(
        Paragraph(
            "Contact: Worthing, West Sussex  ·  07935 085 736  ·  www.jbiddulph.com  ·  www.oldskoolvibe.dev",
            s["small"],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
