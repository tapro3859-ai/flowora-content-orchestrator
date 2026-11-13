# Flowora Content Orchestrator

FLOWORA — Premium Website Redesign & Interactive Product Experience

Act as a senior product designer, creative director, and full-stack engineer from a world-class SaaS company. Transform the existing FLOWORA website into a polished, premium, fully responsive, interactive automation business website.

Important: Implement the complete experience in one focused pass. Inspect the existing project first, reuse its current stack and working components, preserve useful functionality, and make the changes directly. Avoid unnecessary rewrites, redundant dependencies, excessive abstractions, and repeated design iterations. Prioritize the highest-quality result with the least implementation overhead.

1. PRODUCT IDENTITY

Brand: FLOWORA
Business: Moroccan software and business automation studio.
Primary product: An automated content publishing system.
Additional services:

- Intelligent AI customer support agents.
- WhatsApp business automation.
- Google Maps business prospecting and data organization.
- Custom business workflow automation.
- Website and software development when required.

The content publishing system must receive the strongest visual emphasis. Other services should appear as secondary solutions.

Language: English for the main website, with a professional, concise international SaaS tone. Keep all text easy to localize later.

Never display the name of any underlying workflow-engine product. Describe the technology using terms such as “FLOWORA System,” “Automation System,” “AI Agent,” and “Automated Workflow.” Do not expose internal workflow architecture, credentials, API endpoints, private implementation details, or proprietary operational steps.

2. VISUAL ART DIRECTION

Create an original premium identity inspired by the quality and restraint of Apple, Stripe, Linear, and modern enterprise SaaS products. Do not copy their websites.

Design characteristics:

- Deep charcoal and near-black backgrounds.
- Warm white text, muted secondary text, and a refined electric blue or violet accent.
- Subtle gradients, atmospheric lighting, soft glows, thin borders, and elegant shadows.
- Large editorial typography, precise spacing, consistent alignment, and excellent visual hierarchy.
- Beautiful, realistic product interfaces with clear typography and believable data.
- Sophisticated animations that feel smooth and purposeful, never distracting.
- Consistent corner radii, buttons, icons, spacing, and component styles.
- Use lucide-react icons if already installed.
- Use CSS gradients, SVG, and existing libraries where possible instead of adding heavy dependencies.
- No generic template appearance, random emoji, oversized gradients everywhere, excessive glassmorphism, cartoon characters, or fake testimonials.
- Do not use huge empty sections simply to create visual space.

The final result must feel like a serious international technology company, not a generic AI agency landing page.

Ensure perfect presentation on mobile first, including small Android screens, then tablet and desktop. Prevent horizontal overflow and tiny unreadable text.

3. NAVIGATION

Create a polished, sticky navigation bar with the FLOWORA wordmark and a minimal custom symbol.

Navigation:

- Home
- Solutions
- How It Works
- Demo
- About
- Contact

Primary CTA: “See Live Demo”
Secondary CTA: “Talk to FLOWORA”

On mobile, use a functional accessible menu. Every navigation item must lead to the correct section or page. Smooth scrolling is welcome, but links must remain usable without animation.

4. HERO — LEAD WITH THE MAIN SYSTEM

Create an impressive first screen that communicates the product within five seconds.

Eyebrow:
“INTELLIGENT CONTENT AUTOMATION”

Headline:
“Create Once. Publish Everywhere.”

Supporting text:
“FLOWORA turns repetitive content publishing into an automated system. Prepare your video, schedule your content, and let the system handle the configured publishing process across your connected social platforms.”

Primary CTA: “Explore the Live Demo”
Secondary CTA: “Discuss Your Business”

Below the buttons, show a restrained trust statement:
“Built around your business. Configured for your workflow. Monitored and maintained.”

On the right or below the headline, depending on screen size, create a beautiful animated product preview:

- A video file entering the system.
- An elegant processing timeline.
- Generated title, description, and hashtags.
- Four destination cards for Instagram, Facebook, TikTok, and YouTube.
- A visual publishing status.
- A compact scheduling indicator.

Use realistic interface mockups, not screenshots of other websites. The preview must be visually impressive without revealing private technical implementation details.

Add a subtle animated flow line connecting the content card to the four destinations.

5. PRIMARY FEATURE — INTERACTIVE CONTENT PUBLISHING DEMO

This is the most important section of the website. Make it look and behave like a real premium software product.

Section heading:
“See Your Content Move From Upload to Publishing.”

Supporting text:
“Explore a simulated publishing workflow and experience how FLOWORA organizes the process.”

Build a polished interactive workspace containing:

A. Source video card

Display a fictional sample file:
“summer-campaign.mp4”

Include:

- Video thumbnail or original CSS-generated preview.
- File size and duration using clearly illustrative sample values.
- A source indicator labelled “Google Drive.”
- A selected publishing date and time.
- An “Edit Schedule” control that opens a small functional modal or inline editor.

Do not upload any real files to a server unless the project already has a properly configured upload feature.

B. AI content preparation card

Display a sample generated result:

- Video title.
- Short, natural description.
- Relevant hashtags.
- Language selection.
- “Regenerate Content” button.

Use realistic, well-written example content. Regenerating should produce an alternative sample title, description, and relevant hashtags locally. Make the interface responsive to the selected language where practical.

Clearly distinguish simulated results from a real connected AI service.

C. Publishing destinations

Create four distinct platform cards:

- Instagram
- Facebook
- TikTok
- YouTube

Each card should include a recognizable icon, platform name, and current simulation status.

Allow users to toggle platforms on and off. The workflow should only animate toward selected destinations.

D. Execute button and animation

Use one prominent button:
“Execute Workflow”

When clicked:

1. Validate that at least one destination is selected.
2. Change the button into a running state.
3. Animate a visible progress indicator.
4. Highlight the video source.
5. Activate the processing node.
6. Animate the title, description, and hashtags being prepared.
7. Move a visual signal along connecting lines to each selected platform.
8. Update each selected destination through appropriate simulation states such as “Preparing,” “Publishing,” and “Published in Demo.”
9. Update a compact activity log with timestamps or ordered events.
10. Show a professional completion state and a “Run Again” button.

Use realistic staggered timing so that the animation is easy to follow. Include a progress bar and clear status labels. Keep the experience smooth on mobile and respect reduced-motion preferences.

The animation must look like a premium product demonstration, not a simple loading spinner.

Critical accuracy requirement: This is a front-end simulation. Never claim that a video was actually uploaded or published to a social network. Label the experience “Interactive Demo — simulated publishing.” Do not display fake real account connections, actual publishing receipts, or fabricated API success messages.

Use local state and deterministic sample data for this demo. Do not call external publishing APIs from the demo or require users to enter credentials.

6. HOW THE SYSTEM WORKS

Create a concise, visually engaging four-step section:

01 — Prepare
“Choose your content and organize your video files.”

02 — Schedule
“Set the publishing time and choose the connected destinations.”

03 — Generate
“Prepare platform-appropriate titles, descriptions, and hashtags through the configured content-generation process.”

04 — Publish
“Let the configured system handle the publishing workflow and monitor its status.”

Use a horizontal timeline on desktop and a vertical timeline on mobile.

Keep descriptions short. Do not disclose internal node sequences, API implementation, credentials, or sensitive technical details.

7. CONTINUOUS MONITORING AND MAINTENANCE

Create a premium section explaining the ongoing service.

Headline:
“Automation That Doesn’t Get Left Alone.”

Description:
“FLOWORA provides ongoing system monitoring and maintenance throughout the agreed service period, helping identify issues, maintain integrations, and keep your automation operating as intended.”

Show three concise features:

- System monitoring.
- Integration and workflow maintenance.
- Troubleshooting and improvements.

Mention that maintenance terms, response times, and coverage depend on the agreed service package.

Do not promise 100% uptime or uninterrupted publishing on third-party platforms.

Use an elegant monitoring interface with clearly labelled illustrative status indicators. Never imply that a real monitoring backend exists unless one is configured.

8. ADDITIONAL SERVICES

Display four compact premium service cards. The main content publishing system should remain visually dominant.

AI Customer Agent

“An intelligent assistant that answers customer questions using approved business information, helps qualify leads, and hands complex requests to a human when necessary.”

Show a realistic chat preview with a few example messages.

WhatsApp Automation

“Organize customer inquiries, collect order details, provide configured answers, and notify your team when human attention is needed.”

Show a minimal conversation-to-order visualization. State that availability depends on the required integrations and account permissions.

Business Prospecting With Google Maps

Headline:
“Find Relevant Businesses. Organize Your Prospects.”

Create a functional front-end demo interface with:

- Business category.
- Location.
- Preferred language.
- Information fields to request.
- Maximum results selector.
- “Generate Sample Results” button.

Available example fields:
Business name, category, city, publicly available business phone, website, rating when available, and source.

Allow users to choose which fields they want in their results. Include a clear sample-results table and a button to download the sample data as CSV.

Populate the demo with explicitly fictional example records, visibly labelled “Sample Data.” Never invent real business records, ratings, phone numbers, or search results and present them as live Google Maps data.

The interface should be structured so a real authorized business-data provider can be integrated later. Do not claim live Google Maps access unless a working, authorized integration has actually been configured.

Respect provider terms, rate limits, privacy requirements, and applicable data-protection rules. Do not collect sensitive personal information or enable indiscriminate scraping.

Custom Business Automation

“If your team repeats the same task every day, FLOWORA can help design a system around your existing tools and business process.”

Show a minimal workflow visualization linking a form, AI processing, a spreadsheet, and a notification.

Each service card must have a working “Explore Service” or contact CTA.

9. BUILT-IN FLOWORA AI ASSISTANT

Create a floating, accessible assistant button fixed at the bottom-right of the screen. It should look like a premium support widget, not a generic chatbot bubble.

Button label or tooltip:
“Ask FLOWORA”

On click, open a polished chat panel with:

- FLOWORA branding.
- Welcome message.
- Online indicator labelled “Demo Assistant.”
- Close and minimize controls.
- Scrollable conversation area.
- Message input.
- Send button.
- Typing indicator.
- Suggested questions.
- Clear and reset conversation controls.

Suggested questions:

- What is the FLOWORA publishing system?
- How does automatic publishing work?
- Can it generate titles and hashtags?
- Which platforms can be connected?
- Do you provide maintenance?
- What is an AI customer agent?
- Can you organize business data from Google Maps?
- How can I get a demo?
- How can I contact FLOWORA?

Assistant knowledge

Prepare concise, accurate answers based on the following approved business information:

FLOWORA is a Moroccan software and automation studio that builds business automation systems, intelligent customer agents, content publishing workflows, lead organization systems, and custom integrations.

Its main service helps organize automated content publishing. Depending on the configured integrations, a client can supply videos, schedule content, generate titles, descriptions, and hashtags, and distribute content to connected social platforms, including Instagram, Facebook, TikTok, and YouTube.

Actual platform capabilities depend on supported integrations, account permissions, API access, and configuration.

FLOWORA also offers AI customer support, WhatsApp automation, business prospecting and data organization, and custom business automation.

Ongoing monitoring and maintenance are provided according to the agreed service package.

Contact:
Phone/WhatsApp: +212 681-569749
Email: softatlas38@gmail.com
WhatsApp URL: https://wa.me/212681569749
Instgrame:FLOWORA — Premium Website Redesign & Interactive Product Experience

Act as a senior product designer, creative director, and full-stack engineer from a world-class SaaS company. Transform the existing FLOWORA website into a polished, premium, fully responsive, interactive automation business website.

Important: Implement the complete experience in one focused pass. Inspect the existing project first, reuse its current stack and working components, preserve useful functionality, and make the changes directly. Avoid unnecessary rewrites, redundant dependencies, excessive abstractions, and repeated design iterations. Prioritize the highest-quality result with the least implementation overhead.

1. PRODUCT IDENTITY

Brand: FLOWORA
Business: Moroccan software and business automation studio.
Primary product: An automated content publishing system.
Additional services:

- Intelligent AI customer support agents.
- WhatsApp business automation.
- Google Maps business prospecting and data organization.
- Custom business workflow automation.
- Website and software development when required.

The content publishing system must receive the strongest visual emphasis. Other services should appear as secondary solutions.

Language: English for the main website, with a professional, concise international SaaS tone. Keep all text easy to localize later.

Never display the name of any underlying workflow-engine product. Describe the technology using terms such as “FLOWORA System,” “Automation System,” “AI Agent,” and “Automated Workflow.” Do not expose internal workflow architecture, credentials, API endpoints, private implementation details, or proprietary operational steps.

2. VISUAL ART DIRECTION

Create an original premium identity inspired by the quality and restraint of Apple, Stripe, Linear, and modern enterprise SaaS products. Do not copy their websites.

Design characteristics:

- Deep charcoal and near-black backgrounds.
- Warm white text, muted secondary text, and a refined electric blue or violet accent.
- Subtle gradients, atmospheric lighting, soft glows, thin borders, and elegant shadows.
- Large editorial typography, precise spacing, consistent alignment, and excellent visual hierarchy.
- Beautiful, realistic product interfaces with clear typography and believable data.
- Sophisticated animations that feel smooth and purposeful, never distracting.
- Consistent corner radii, buttons, icons, spacing, and component styles.
- Use lucide-react icons if already installed.
- Use CSS gradients, SVG, and existing libraries where possible instead of adding heavy dependencies.
- No generic template appearance, random emoji, oversized gradients everywhere, excessive glassmorphism, cartoon characters, or fake testimonials.
- Do not use huge empty sections simply to create visual space.

The final result must feel like a serious international technology company, not a generic AI agency landing page.

Ensure perfect presentation on mobile first, including small Android screens, then tablet and desktop. Prevent horizontal overflow and tiny unreadable text.

3. NAVIGATION

Create a polished, sticky navigation bar with the FLOWORA wordmark and a minimal custom symbol.

Navigation:

- Home
- Solutions
- How It Works
- Demo
- About
- Contact

Primary CTA: “See Live Demo”
Secondary CTA: “Talk to FLOWORA”

On mobile, use a functional accessible menu. Every navigation item must lead to the correct section or page. Smooth scrolling is welcome, but links must remain usable without animation.

4. HERO — LEAD WITH THE MAIN SYSTEM

Create an impressive first screen that communicates the product within five seconds.

Eyebrow:
“INTELLIGENT CONTENT AUTOMATION”

Headline:
“Create Once. Publish Everywhere.”

Supporting text:
“FLOWORA turns repetitive content publishing into an automated system. Prepare your video, schedule your content, and let the system handle the configured publishing process across your connected social platforms.”

Primary CTA: “Explore the Live Demo”
Secondary CTA: “Discuss Your Business”

Below the buttons, show a restrained trust statement:
“Built around your business. Configured for your workflow. Monitored and maintained.”

On the right or below the headline, depending on screen size, create a beautiful animated product preview:

- A video file entering the system.
- An elegant processing timeline.
- Generated title, description, and hashtags.
- Four destination cards for Instagram, Facebook, TikTok, and YouTube.
- A visual publishing status.
- A compact scheduling indicator.

Use realistic interface mockups, not screenshots of other websites. The preview must be visually impressive without revealing private technical implementation details.

Add a subtle animated flow line connecting the content card to the four destinations.

5. PRIMARY FEATURE — INTERACTIVE CONTENT PUBLISHING DEMO

This is the most important section of the website. Make it look and behave like a real premium software product.

Section heading:
“See Your Content Move From Upload to Publishing.”

Supporting text:
“Explore a simulated publishing workflow and experience how FLOWORA organizes the process.”

Build a polished interactive workspace containing:

A. Source video card

Display a fictional sample file:
“summer-campaign.mp4”

Include:

- Video thumbnail or original CSS-generated preview.
- File size and duration using clearly illustrative sample values.
- A source indicator labelled “Google Drive.”
- A selected publishing date and time.
- An “Edit Schedule” control that opens a small functional modal or inline editor.

Do not upload any real files to a server unless the project already has a properly configured upload feature.

B. AI content preparation card

Display a sample generated result:

- Video title.
- Short, natural description.
- Relevant hashtags.
- Language selection.
- “Regenerate Content” button.

Use realistic, well-written example content. Regenerating should produce an alternative sample title, description, and relevant hashtags locally. Make the interface responsive to the selected language where practical.

Clearly distinguish simulated results from a real connected AI service.

C. Publishing destinations

Create four distinct platform cards:

- Instagram
- Facebook
- TikTok
- YouTube

Each card should include a recognizable icon, platform name, and current simulation status.

Allow users to toggle platforms on and off. The workflow should only animate toward selected destinations.

D. Execute button and animation

Use one prominent button:
“Execute Workflow”

When clicked:

1. Validate that at least one destination is selected.
2. Change the button into a running state.
3. Animate a visible progress indicator.
4. Highlight the video source.
5. Activate the processing node.
6. Animate the title, description, and hashtags being prepared.
7. Move a visual signal along connecting lines to each selected platform.
8. Update each selected destination through appropriate simulation states such as “Preparing,” “Publishing,” and “Published in Demo.”
9. Update a compact activity log with timestamps or ordered events.
10. Show a professional completion state and a “Run Again” button.

Use realistic staggered timing so that the animation is easy to follow. Include a progress bar and clear status labels. Keep the experience smooth on mobile and respect reduced-motion preferences.

The animation must look like a premium product demonstration, not a simple loading spinner.

Critical accuracy requirement: This is a front-end simulation. Never claim that a video was actually uploaded or published to a social network. Label the experience “Interactive Demo — simulated publishing.” Do not display fake real account connections, actual publishing receipts, or fabricated API success messages.

Use local state and deterministic sample data for this demo. Do not call external publishing APIs from the demo or require users to enter credentials.

6. HOW THE SYSTEM WORKS

Create a concise, visually engaging four-step section:

01 — Prepare
“Choose your content and organize your video files.”

02 — Schedule
“Set the publishing time and choose the connected destinations.”

03 — Generate
“Prepare platform-appropriate titles, descriptions, and hashtags through the configured content-generation process.”

04 — Publish
“Let the configured system handle the publishing workflow and monitor its status.”

Use a horizontal timeline on desktop and a vertical timeline on mobile.

Keep descriptions short. Do not disclose internal node sequences, API implementation, credentials, or sensitive technical details.

7. CONTINUOUS MONITORING AND MAINTENANCE

Create a premium section explaining the ongoing service.

Headline:
“Automation That Doesn’t Get Left Alone.”

Description:
“FLOWORA provides ongoing system monitoring and maintenance throughout the agreed service period, helping identify issues, maintain integrations, and keep your automation operating as intended.”

Show three concise features:

- System monitoring.
- Integration and workflow maintenance.
- Troubleshooting and improvements.

Mention that maintenance terms, response times, and coverage depend on the agreed service package.

Do not promise 100% uptime or uninterrupted publishing on third-party platforms.

Use an elegant monitoring interface with clearly labelled illustrative status indicators. Never imply that a real monitoring backend exists unless one is configured.

8. ADDITIONAL SERVICES

Display four compact premium service cards. The main content publishing system should remain visually dominant.

AI Customer Agent

“An intelligent assistant that answers customer questions using approved business information, helps qualify leads, and hands complex requests to a human when necessary.”

Show a realistic chat preview with a few example messages.

WhatsApp Automation

“Organize customer inquiries, collect order details, provide configured answers, and notify your team when human attention is needed.”

Show a minimal conversation-to-order visualization. State that availability depends on the required integrations and account permissions.

Business Prospecting With Google Maps

Headline:
“Find Relevant Businesses. Organize Your Prospects.”

Create a functional front-end demo interface with:

- Business category.
- Location.
- Preferred language.
- Information fields to request.
- Maximum results selector.
- “Generate Sample Results” button.

Available example fields:
Business name, category, city, publicly available business phone, website, rating when available, and source.

Allow users to choose which fields they want in their results. Include a clear sample-results table and a button to download the sample data as CSV.

Populate the demo with explicitly fictional example records, visibly labelled “Sample Data.” Never invent real business records, ratings, phone numbers, or search results and present them as live Google Maps data.

The interface should be structured so a real authorized business-data provider can be integrated later. Do not claim live Google Maps access unless a working, authorized integration has actually been configured.

Respect provider terms, rate limits, privacy requirements, and applicable data-protection rules. Do not collect sensitive personal information or enable indiscriminate scraping.

Custom Business Automation

“If your team repeats the same task every day, FLOWORA can help design a system around your existing tools and business process.”

Show a minimal workflow visualization linking a form, AI processing, a spreadsheet, and a notification.

Each service card must have a working “Explore Service” or contact CTA.

9. BUILT-IN FLOWORA AI ASSISTANT

Create a floating, accessible assistant button fixed at the bottom-right of the screen. It should look like a premium support widget, not a generic chatbot bubble.

Button label or tooltip:
“Ask FLOWORA”

On click, open a polished chat panel with:

- FLOWORA branding.
- Welcome message.
- Online indicator labelled “Demo Assistant.”
- Close and minimize controls.
- Scrollable conversation area.
- Message input.
- Send button.
- Typing indicator.
- Suggested questions.
- Clear and reset conversation controls.

Suggested questions:

- What is the FLOWORA publishing system?
- How does automatic publishing work?
- Can it generate titles and hashtags?
- Which platforms can be connected?
- Do you provide maintenance?
- What is an AI customer agent?
- Can you organize business data from Google Maps?
- How can I get a demo?
- How can I contact FLOWORA?

Assistant knowledge

Prepare concise, accurate answers based on the following approved business information:

FLOWORA is a Moroccan software and automation studio that builds business automation systems, intelligent customer agents, content publishing workflows, lead organization systems, and custom integrations.

Its main service helps organize automated content publishing. Depending on the configured integrations, a client can supply videos, schedule content, generate titles, descriptions, and hashtags, and distribute content to connected social platforms, including Instagram, Facebook, TikTok, and YouTube.

Actual platform capabilities depend on supported integrations, account permissions, API access, and configuration.

FLOWORA also offers AI customer support, WhatsApp automation, business prospecting and data organization, and custom business automation.

Ongoing monitoring and maintenance are provided according to the agreed service package.

Contact:
Phone/WhatsApp: +212 681-569749
Email: softatlas38@gmail.com
WhatsApp URL: https://wa.me/212681569749

The assistant must answer in the language used by the visitor where reasonably supported, including English, French, and Moroccan Darija. Keep answers brief and useful.

Implement a lightweight local FAQ/intention-matching assistant for the first version. Use curated knowledge and reasonable fallback responses. Do not require an external AI API or expose any API key.

If the visitor asks for pricing, never invent a price. Explain that pricing depends on the requirements and invite them to contact FLOWORA.

If the visitor asks whether something is supported, distinguish existing capabilities from features that require configuration.

If the visitor asks to book a demo, offer a direct WhatsApp link.

The assistant must never claim it has searched live data, accessed private accounts, executed a real workflow, or contacted a human when it has not.

Use real button interactions and working chat
The assistant must answer in the language used by the visitor where reasonably supported, including English, French, and Moroccan Darija. Keep answers brief and useful.

Implement a lightweight local FAQ/intention-matching assistant for the first version. Use curated knowledge and reasonable fallback responses. Do not require an external AI API or expose any API key.

If the visitor asks for pricing, never invent a price. Explain that pricing depends on the requirements and invite them to contact FLOWORA.

If the visitor asks whether something is supported, distinguish existing capabilities from features that require configuration.

If the visitor asks to book a demo, offer a direct WhatsApp link.

The assistant must never claim it has searched live data, accessed private accounts, executed a real workflow, or contacted a human when it has not.

Use real button interactions and working chat

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://flowora-content-orchestrator.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/95f006ba-1575-4903-b3d0-70dd0658e249).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
