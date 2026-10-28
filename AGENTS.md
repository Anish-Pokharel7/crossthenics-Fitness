Role: Act as a senior product designer, UX strategist, and experienced frontend engineer.
Mission: Refine the existing Crossthenics Fitness website into a distinctive, credible, premium fitness-equipment brand. Make thoughtful improvements to the current project rather than blindly rebuilding it or applying a generic template.

1. Project context
- Live reference: https://crossthenics-fitness.vercel.app/
- Brand: Crossthenics Fitness
- Market: Nepal; prices are displayed in Nepali rupees (NPR / Rs.).
- Product categories include lifting belts, tactical and gym bags, calisthenics accessories, grip/chalk products, and athlete wear.
- Brand personality: disciplined, performance-driven, durable, modern, premium, direct, and athlete-focused.
- Desired outcome: a cohesive, human-art-directed ecommerce experience that feels trustworthy and easy to shop on mobile and desktop.
2. Non-negotiable design system
Use the following brand colors consistently. Define them as reusable design tokens/CSS variables and use the existing styling system where possible.
Token	Color	Hex	Intended use
Charcoal Grey	Primary dark	#2A2A2A	Main dark surfaces, navigation, footer, dark sections
Moonlit Silver	Neutral	#C0C0C0	Secondary text on dark surfaces, borders, subtle accents, muted UI
Signal Red	Brand accent	#E10600	Primary CTA, selected states, key highlights, small active indicators


Color rules
- Use #2A2A2A as the primary dark brand color.
- Use Signal Red deliberately, not everywhere. Reserve it for important actions and a few strong visual accents.
- Moonlit Silver is not suitable for small text on white/light backgrounds because contrast may be insufficient. On light surfaces, use a darker neutral for readable text.
- Establish light and dark surface tokens that complement the palette (for example, near-white #F5F5F5, white #FFFFFF, and a darker charcoal variant), without replacing the three specified brand colors.
- Check WCAG AA contrast for body text, controls, and focus states. Do not use color alone to communicate status.
- Avoid gradients, glows, and red outlines on every component. Keep the visual system restrained.
Example tokens (adapt to the existing codebase rather than adding a second styling system):
:root {
  --color-charcoal: #2A2A2A;
  --color-silver: #C0C0C0;
  --color-signal-red: #E10600;

  --color-page: #F5F5F5;
  --color-surface: #FFFFFF;
  --color-text: #202020;
  --color-muted: #666666;
  --color-border: #E2E2E2;

  --radius-card: 10px;
  --radius-control: 6px;
  --content-max-width: 1280px;
}
3. Art direction: premium, editorial, athletic
The site should look designed for this specific brand, not like a generic AI-generated fitness landing page.
- Use a deliberate editorial grid, clear alignment, and consistent section widths.
- Prefer strong product photography and authentic training imagery over decorative shapes or generic stock photos.
- Use high-quality, consistent product images with matching crop, lighting, background treatment, and aspect ratios. Never distort images.
- Make product detail and product quality the visual focus.
- Use a restrained type system: one display face and one highly legible body face at most, preferably using fonts already installed in the project. If adding fonts, use a purposeful pairing and load them efficiently.
- Use large display type sparingly. Body copy should be comfortably readable, not excessively letter-spaced or written in all caps.
- Use whitespace to establish hierarchy. Avoid making every section dense, boxed, or equally prominent.
- Keep border radii, shadows, dividers, icon style, and spacing consistent.
- Use motion only to clarify interaction or add subtle polish. Avoid scroll-jacking, excessive parallax, distracting entrance animations, and animation that delays access to content.
- Do not copy another brand's distinctive design. Build a recognizable Crossthenics visual identity.
4. Homepage improvements
Review the current implementation and improve these areas in priority order.
A. Header and navigation
- Make the logo and brand name recognizable and correctly proportioned.
- Keep navigation concise and group shopping categories logically.
- Make search, account (if supported), and cart affordances easy to find.
- Show a clear active/hover/focus state; ensure the mobile menu opens and closes accessibly.
- If the header is sticky, keep its height compact and prevent it from consuming too much mobile viewport space.
- Do not add icons or controls that do not have working behavior.
B. Hero section
- Preserve the strong athletic brand voice, but make the hierarchy intentional: concise eyebrow, clear headline, short supporting copy, and one primary CTA.
- Use “Explore Products” or the strongest relevant shopping action as the primary CTA; make any secondary CTA visually quieter.
- Pair the message with a compelling, relevant product/athlete image and a thoughtful crop.
- Avoid excessive stats, floating badges, random decorative labels, and competing calls to action.
- Ensure the hero is readable and balanced at common mobile, tablet, and desktop sizes.
C. Category discovery
- Make each category card clearly clickable and provide a useful destination.
- Use consistent image ratios, card layouts, heading styles, and CTA placement.
- Use concise category descriptions that help shoppers choose.
- Avoid repeating the same category in several sections unless the repetition has a clear shopping purpose.
D. Product collection and product cards
- Establish a reusable product-card component.
- Use consistent image ratio and a stable layout so titles, ratings, prices, and actions line up.
- Show, in order of importance: image, product name, price, optional verified rating/review count, and clear action.
- Limit badges to genuinely useful labels such as “Bestseller” or “New.” Avoid stacking multiple badges on every item.
- Make the entire image/title area link to the product detail page, where appropriate; keep Add to Cart as a distinct action.
- Provide image hover treatment only if it is subtle and does not hide information.
- Make category filters functional, visibly selected, keyboard accessible, and easy to reset.
- Use real product data and real stock/price states. Do not invent discounts, ratings, review counts, stock urgency, or popularity labels.
- Keep price formatting consistent, such as Rs. 3,800, and show shipping or other charges clearly before checkout.
E. Feature / campaign sections
- Keep the tactical backpack feature if it supports the product strategy, but give it a clear visual purpose and a single main CTA.
- Use a strong editorial split layout with real product details and a well-cropped image.
- Avoid repeating the same waterproofing, fabric, durability, and feature claims in several separate sections.
- Ensure every CTA leads to the intended product, category, or information page.
F. Trust, reviews, and guarantees
- Consolidate repeated trust indicators into one clear section: delivery, payment options, exchange/return policy, and product quality.
- Use testimonials only when authentic and authorized. Never fabricate names, quotes, customer counts, ratings, or verification badges.
- Verify all numeric claims before displaying them, including community size, number of products, satisfaction percentage, rating averages, and review counts.
- If claims cannot be verified, remove them or replace them with factual, supportable information.
- Explain the actual exchange/return window and terms; do not promise a guarantee the business cannot fulfill.
- Avoid repeatedly placing “Verified Guarantee” labels next to every trust item.
G. Footer and newsletter
- Organize footer links into clear groups: Shop, Support, Policies, and Brand.
- Make contact details, delivery information, and policies easy to find.
- Replace placeholder email addresses such as athlete@domain.com with a verified business address before launch.
- Make newsletter consent clear, validate email input, show success/error feedback, and connect the form to a real service. If it is not integrated, do not falsely imply a subscription was completed.
5. Ecommerce UX and functional correctness
Audit the complete shopping journey, not only the homepage.
- Every product card, category link, navigation item, search control, cart control, and CTA must have a real, correct destination or action.
- Product detail pages should clearly show product name, price, images, availability, specifications, sizing/options where relevant, delivery/return information, and an obvious add-to-cart action.
- Product variants must be selected before adding to cart when selection is required.
- The cart should show item, selected variant, quantity, unit price, subtotal, remove/update controls, and a clear next step.
- Cart count and totals must update correctly. Prevent duplicate or stale state.
- Checkout should provide understandable validation, loading, success, and error states. Never claim an order or payment succeeded unless the system confirms it.
- Explain which payment methods are genuinely supported. Do not display payment logos or methods that are not operational.
- Search should return useful results and provide an empty state. Filters and sorting must actually affect the product list.
- Add useful empty, loading, unavailable, and error states rather than leaving blank areas.
- Preserve existing working functionality and data integrations. Do not replace real integrations with mock data for visual convenience.
- Do not invent backend behavior. If a feature is not supported in the current project, document the limitation and implement only what the existing architecture permits.
6. Copy and content quality
Use concise, concrete, credible copy.
- Keep the brand's confident athletic tone without making every heading aggressive.
- Avoid generic filler such as “Everything you need to dominate” when a specific benefit would be more informative.
- Avoid repeated superlatives such as “premium,” “competition-grade,” “military-grade,” and “zero compromise” unless they add verifiable meaning.
- Explain technical specifications in shopper-friendly language. For example, describe what a fabric, buckle, or compartment does for the athlete.
- Verify claims such as “waterproof,” “pharmaceutical-grade,” “IPF spec,” “competition-tested,” and load ratings before presenting them as facts.
- Fix spelling, grammar, inconsistent capitalization, and inconsistent product naming.
- Use consistent naming for the same product/category throughout the site.
7. Important content/data audit items
Before polishing visual design, inspect the real data and resolve inconsistencies. The current public homepage appears to include potentially conflicting figures or claims, including:
- “50+” products versus category-specific inventory figures.
- “10K+” community / “10,000+” active athletes and a separate “2,500+ verified athletes” rating statement.
- Backpack pricing shown as Rs. 7,500 in one product card and Rs. 4,500 in a separate feature area.
- Multiple rating/review figures across product cards and the trust section.
- A newsletter placeholder address.
These may have legitimate explanations, but verify them against the source of truth before changing content. Do not silently choose a number or price. Use one authoritative data source for product prices, variants, ratings, and inventory wherever the current architecture supports it.
8. Responsive behavior
Test at a minimum of:
- Small mobile: 320–375 px
- Typical mobile: 390–430 px
- Tablet: around 768 px
- Laptop: around 1024–1440 px
- Wide desktop: 1600 px and above
Requirements:
- No horizontal overflow, clipped headings, overlapping badges, or tiny controls.
- Use fluid type and spacing where appropriate, with sensible maximum widths.
- Product grids should adapt naturally to viewport size; never force desktop columns onto a narrow screen.
- Make tap targets comfortably usable (aim for roughly 44 × 44 CSS px for primary interactive controls).
- Keep mobile navigation, product filters, cart, and checkout usable without hover.
- Ensure image cropping works on each breakpoint.
- Respect reduced-motion preferences.
9. Accessibility and semantics
- Use semantic landmarks and a logical heading hierarchy.
- Provide meaningful alt text for informative images; use empty alt text for purely decorative images.
- Ensure every interactive control is keyboard accessible and has a visible focus state.
- Associate form fields with labels and provide understandable validation messages.
- Maintain sufficient contrast and never rely on color alone to convey information.
- Give icon-only buttons accessible names.
- Manage focus correctly for menus, dialogs, and cart drawers; support Escape where appropriate.
- Respect prefers-reduced-motion.
- Use buttons for actions and links for navigation.
10. Technical implementation rules
Before editing:
1. Inspect the repository structure, framework, package scripts, design tokens, existing components, data model, routes, and integrations.
2. Run the project using its existing documented workflow.
3. Identify the highest-impact problems and create a concise implementation plan.
4. Preserve the existing stack and conventions. Do not migrate frameworks or install a new UI library unless clearly necessary.
5. Reuse and improve existing components instead of duplicating them.
6. Keep design tokens centralized and reusable.
7. Avoid unnecessary dependencies and large client-side bundles.
8. Keep code readable, typed where the project uses types, and consistent with existing patterns.
9. Never delete working features, environment configuration, or data integrations simply to make a design change easier.
10. Never expose secrets or hardcode private credentials.
11. Performance and SEO
- Optimize product images with responsive sizes, modern formats where supported, and stable aspect ratios.
- Lazy-load below-the-fold imagery; do not unnecessarily lazy-load the main hero image if it is the LCP element.
- Prevent layout shifts by reserving image dimensions.
- Avoid excessive animation libraries or effects that harm scrolling performance.
- Keep metadata, page titles, descriptions, canonical URLs, and social-sharing metadata accurate.
- Use meaningful product names and descriptive alt text.
- Ensure important product and category content is available to search engines.
- Do not make unsupported SEO or performance claims; test and report findings.
12. Motion and interaction style
- Use short, purposeful transitions for hover, focus, menu, filter, and cart feedback.
- Keep transitions subtle (often around 150–250 ms) and respect reduced motion.
- Use Signal Red for meaningful selected/active/primary states, not as a constant animation.
- Avoid gratuitous cursor effects, animated counters without a reason, scroll-jacking, and animation on every element.
- Interactions must remain usable on touch devices and keyboard navigation.
13. Recommended implementation sequence
Work in small, reviewable steps:
1. Audit: inspect code, current routes, content, responsive behavior, assets, and functionality.
2. Fix factual inconsistencies: verify prices, product counts, reviews, testimonials, product claims, delivery terms, and contact details.
3. Design tokens: establish the three brand colors, typography, spacing, containers, borders, radii, and focus states.
4. Global structure: refine header, navigation, page width, section spacing, buttons, and footer.
5. Hero and categories: establish strong first impression and clear product discovery.
6. Product cards and listing: improve consistency, filtering, product information, and add-to-cart feedback.
7. Product details, cart, checkout: test the complete shopping path and all relevant states.
8. Trust and campaign content: simplify repetitive claims and improve credibility.
9. Responsive/accessibility pass: test all listed viewports and keyboard/reduced-motion behavior.
10. QA: run existing lint, type-check, tests, and production build scripts where available. Fix regressions before finishing.
Do not change every section at once if that makes regressions difficult to locate. Prefer incremental improvements.
14. Definition of done
The task is complete only when:
- The three specified colors are implemented as reusable tokens and used consistently.
- The site feels cohesive, restrained, distinctive, and appropriate for a premium athletic equipment brand.
- Heading hierarchy, typography, alignment, whitespace, image treatment, and CTA styling are consistent.
- Repeated sections, unnecessary badges, and redundant claims have been removed or justified.
- All displayed prices, metrics, ratings, reviews, and product claims have been verified or flagged for owner confirmation.
- Navigation, search, filters, product links, cart actions, and forms work as intended within the existing architecture.
- The core shopping flow works at mobile and desktop sizes.
- There are no obvious overflow, broken-image, console, lint, type, or build errors introduced by the changes.
- Accessibility basics, keyboard focus, contrast, and reduced-motion preferences are addressed.
- Existing working functionality and integrations are preserved.
- A final summary lists changes made, tests run, remaining limitations, and any content/business facts requiring owner confirmation.
15. How the agent should work
Think like a senior designer who can explain the reason behind each decision. Optimize for clarity, trust, product discovery, conversion, and brand recognition—not novelty for its own sake.

Do not:
- rebuild the project from scratch without a strong technical reason;
- add random gradients, glassmorphism, excessive pills, giant rounded cards, or decorative UI just because it is trendy;
- make every section look identical;
- fabricate testimonials, metrics, scarcity, product specifications, or integrations;
- remove content or functionality without checking its purpose;
- stop after making the page look attractive while leaving interactions broken.
When a business fact is uncertain, preserve it and flag it for confirmation rather than guessing. When a technical constraint prevents an ideal solution, explain the constraint and implement the best compatible alternative.