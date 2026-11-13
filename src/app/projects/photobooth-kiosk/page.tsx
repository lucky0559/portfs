import type { Metadata } from "next";
import Link from "next/link";
import { Bungee, Outfit } from "next/font/google";
import { LightboxProvider, ZoomImage, type LightboxImage } from "./Lightbox";

const bungee = Bungee({ weight: "400", subsets: ["latin"], variable: "--font-bungee", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Photobooth Kiosk Software",
  description:
    "A self-service photobooth for events and pop-up booths in the Philippines: GCash and Maya payments, instant prints, QR soft copies, and a web admin panel."
};

const screens = [
  { src: "/photobooth/1-welcome.png", alt: "Kiosk welcome screen with a Tap to start button", caption: "Tap to start" },
  { src: "/photobooth/2-payment.png", alt: "Payment screen showing a QR Ph code for GCash or Maya", caption: "Pay by QR" },
  { src: "/photobooth/4-pick-a-look.png", alt: "Pick a look screen with Original, Black and White and Warm filters", caption: "Pick a look" },
  { src: "/photobooth/5-qr-download.png", alt: "Screen with a QR code for downloading the photo", caption: "Print & download" }
];

const adminShots = [
  {
    src: "/photobooth/admin-dashboard.png",
    width: 1920,
    height: 1358,
    alt: "Admin dashboard showing today's paid sessions, sales, a refund needing attention and recent sessions",
    title: "Dashboard",
    text: "Today's paid sessions and sales, anything that needs your attention such as a payment to refund, and the latest sessions."
  },
  {
    src: "/photobooth/admin-settings.png",
    width: 1920,
    height: 1200,
    alt: "Admin settings form for price, free mode, shots, countdown, copies and link expiry",
    title: "Settings",
    text: "Set the price, turn free mode on for events, and choose shots, countdown, printed copies and how long download links last."
  },
  {
    src: "/photobooth/admin-templates.png",
    width: 1920,
    height: 1340,
    alt: "Admin templates page with a template upload form and the list of templates",
    title: "Templates",
    text: "Upload your own frame design, choose which one the kiosk uses, and archive old ones."
  }
];

const lightboxImages: LightboxImage[] = [
  ...screens.map(s => ({ src: s.src, alt: s.alt, label: s.caption })),
  ...adminShots.map(s => ({ src: s.src, alt: s.alt, label: s.title }))
];

const flow = [
  "Tap to start",
  "Pay with GCash or Maya",
  "Countdown and photos",
  "Pick a filter",
  "Print comes out",
  "Scan QR to download"
];

const featureGroups: { title: string; items: string[] }[] = [
  {
    title: "Photo session",
    items: [
      "Live camera preview so guests can pose before each shot",
      "Countdown before each photo (3, 5 or 10 seconds), shown in a corner so it never covers faces",
      "1 to 4 photos per session, set by the owner",
      "3 filters: Original, Black & White, Warm",
      "Preview before printing that matches the print exactly",
      "Returns to the start screen by itself if a guest walks away"
    ]
  },
  {
    title: "Payment",
    items: [
      "GCash and Maya through QR Ph, via PayMongo",
      "QR shown on screen with a timer and a cancel button",
      "Session starts only once payment is confirmed",
      "Free mode for sponsored or private events",
      "Late payments are flagged so staff can refund them"
    ]
  },
  {
    title: "Printed copy",
    items: [
      "2×6 photo strip (two strips per 4×6 sheet) or 4R print",
      "Custom frame designs uploaded as PNG templates",
      "Prints automatically, no print dialog",
      "Copies per session set by the owner",
      "Printer picker and test print in Setup"
    ]
  },
  {
    title: "Soft copy",
    items: [
      "QR code on screen opens a download page on the guest's phone",
      "Photos stored in the cloud",
      "Download links expire after a number of days the owner sets"
    ]
  },
  {
    title: "Admin panel (web)",
    items: [
      "Secure login",
      "Price per session (₱20 to ₱1,000) and free mode",
      "Shots, countdown, copies and link expiry",
      "Upload templates, set the active one, archive old ones",
      "Today's sales and a needs-attention list for refunds",
      "Changes reach the kiosk within seconds"
    ]
  },
  {
    title: "Kiosk reliability",
    items: [
      "Free mode works without internet",
      "Uploads wait and retry when the connection drops",
      "Settings and template saved on the PC",
      "Locked kiosk screen: guests can't leave the app",
      "Hidden staff menu protected by a PIN",
      "Windows installer"
    ]
  }
];

const devices = [
  ["Windows 10 / 11 PC, 64-bit", "Photobooth kiosk", "Touchscreen, USB webcam or DSLR via capture card, and a 4×6 printer."],
  ["Android tablet", "Photobooth kiosk", "Runs the kiosk app with a built-in or USB camera."],
  ["Android phone", "Guest: pay and download", "Pay in the GCash or Maya app, then scan the QR code to download in any browser. No app to install."],
  ["iPhone / iPad", "Guest: pay and download", "Same as Android, using Safari or any browser."],
  ["Phone, tablet or computer", "Owner: admin panel", "Any current Chrome, Edge, Firefox or Safari."]
];

const requirements = [
  ["OS", "Windows 10 64-bit", "Windows 11 64-bit"],
  ["CPU", "Intel i5 8th gen / Ryzen 5", "Intel i5 12th gen / Ryzen 5 5600"],
  ["RAM", "8 GB", "16 GB"],
  ["Storage", "256 GB SSD", "512 GB SSD"],
  ["Display", "1080p touchscreen", "1080p touchscreen, 21\"+"],
  ["Camera", "1080p USB webcam", "DSLR / mirrorless via HDMI capture card"],
  ["Printer", "Any printer with a 4×6 Windows driver", "Dye-sub printer with 2-inch cut"],
  ["Internet", "5 Mbps", "10 Mbps+"]
];

const costs = [
  ["Cloud database & photo storage", "Monthly", "Holds sessions, settings and guests' photos and serves the download links. A paid plan is needed for a booth that earns money."],
  ["Web hosting", "Monthly", "Hosts the admin panel and the guest download page. A commercial-use plan is required."],
  ["PayMongo account and fees", "Per payment", "A business account is needed to take GCash and Maya. PayMongo charges a fee on each payment."],
  ["Extra storage as photos grow", "Usage-based", "More events and longer link expiry mean more stored photos and download traffic."],
  ["Internet connection", "Monthly", "Needed at each venue for payments, uploads and downloads. Mobile data or a pocket router works."],
  ["Print paper and ink", "Per print", "Photo paper and ribbons or ink for the printer."],
  ["Code-signing certificate", "Optional, yearly", "Removes the Windows \"unknown publisher\" warning on install."],
  ["Own domain name", "Optional, yearly", "A custom address for the admin panel and download links."],
  ["Email delivery service", "Full version, monthly", "Only if emailing photos to guests is added."]
];

const hardParts = [
  {
    title: "Payment comes first",
    text: "A session starts only after GCash or Maya confirms through QR Ph. If a payment lands late, it is flagged so staff can refund it."
  },
  {
    title: "It keeps working offline",
    text: "Free mode needs no internet. When the connection drops, uploads wait and retry instead of failing."
  },
  {
    title: "Guests can't wander off",
    text: "The kiosk is locked to one screen, resets itself when someone walks away, and hides a PIN-protected staff menu."
  },
  {
    title: "What you see is what prints",
    text: "The preview matches the printed strip exactly, and prints go straight out with no dialog."
  }
];

const comingNext = [
  { title: "More creative options", text: "10 filters, props and stickers, green screen" },
  { title: "More ways to deliver", text: "Email delivery, paid extra prints, reprint from admin" },
  { title: "Event tools", text: "Events, gallery per event, reports with CSV export" }
];

export default function PhotoboothKioskPage() {
  return (
    <main className={`project-page ${bungee.variable} ${outfit.variable}`}>
      <LightboxProvider images={lightboxImages}>
      <div className="project-page__bar">
        <div className="project-page__inner">
          <div className="project-page__bar-top">
            <Link href="/" className="project-page__brand">
              Lucky Angelo
            </Link>
            <div className="project-page__bar-links">
              <Link href="/#projects">← All projects</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>
          <nav className="project-page__jump" aria-label="On this page">
            <a href="#built">What I built</a>
            <a href="#admin">Admin panel</a>
            <a href="#included">Included</a>
            <a href="#devices">Devices</a>
            <a href="#needs">Requirements</a>
            <a href="#costs">Costs</a>
          </nav>
        </div>
      </div>

      <div className="project-page__inner">

        <header className="project-page__header">
          <span className="project-page__eyebrow">Lean MVP · Software only</span>
          <h1>
            Photobooth <span>kiosk</span> software
          </h1>
          <p className="project-page__lede">
            A self-service photobooth for events and pop-up booths in the Philippines. Guests pay with GCash or
            Maya, take their photos, get a print on the spot, and scan a QR code to download the soft copy.
            Prices, templates and sales are managed from a web admin panel.
          </p>
          <Link href="/#contact" className="project-page__cta">
            Ask about a booth
          </Link>
          <ul className="project-page__facts">
            <li>GCash &amp; Maya via QR Ph</li>
            <li>Printed + soft copy</li>
            <li>1–4 shots per session</li>
            <li>Windows PC &amp; Android tablet</li>
          </ul>
        </header>

      </div>

      <div className="project-page__strip" aria-label="Kiosk screens">
        <div className="project-page__inner">
          <div className="project-page__frames">
            {screens.map(screen => (
              <figure key={screen.src}>
                <ZoomImage src={screen.src} alt={screen.alt} width={1080} height={1920} />
                <figcaption>{screen.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="project-page__inner">
        <section id="built" className="project-page__section">
          <h2>What I built</h2>
          <p className="project-page__sub">
            I designed and built this end to end: the kiosk app, the payment flow, the print pipeline, the
            guest download page and the admin panel. These are the parts that were hardest to get right.
          </p>
          <dl className="project-page__hard">
            {hardParts.map(part => (
              <div key={part.title}>
                <dt>{part.title}</dt>
                <dd>{part.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="project-page__section">
          <h2>The guest&apos;s session</h2>
          <p className="project-page__sub">From tap to print, no staff needed.</p>
          <ol className="project-page__flow">
            {flow.map(step => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section id="admin" className="project-page__section">
          <h2>The admin panel</h2>
          <p className="project-page__sub">
            Manage the booth from any browser. Dashboard figures below are sample data.
          </p>
          <div className="project-page__shots">
            {adminShots.map(shot => (
              <figure key={shot.src}>
                <ZoomImage src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
                <figcaption>
                  <b>{shot.title}</b>
                  {shot.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="included" className="project-page__section">
          <h2>What&apos;s included</h2>
          <div className="project-page__groups">
            {featureGroups.map(group => (
              <div className="project-page__group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="devices" className="project-page__section">
          <h2>Supported devices</h2>
          <p className="project-page__sub">
            The kiosk runs on a Windows PC or an Android tablet at the booth. Guests and staff use their own
            phones and browsers. Mac and Linux kiosks are not supported in this release.
          </p>
          <div className="project-page__table-wrap">
            <table className="project-page__table">
              <thead>
                <tr>
                  <th scope="col">Device</th>
                  <th scope="col">Used for</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {devices.map(([device, usedFor, notes]) => (
                  <tr key={`${device}-${usedFor}`}>
                    <td>{device}</td>
                    <td data-label="Used for">{usedFor}</td>
                    <td data-label="Notes">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="needs" className="project-page__section">
          <h2>What you need</h2>
          <p className="project-page__sub">For the Windows kiosk PC.</p>
          <div className="project-page__two">
            <div className="project-page__table-wrap">
              <table className="project-page__table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Minimum</th>
                    <th scope="col">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map(([item, min, rec]) => (
                    <tr key={item}>
                      <td>{item}</td>
                      <td data-label="Minimum">{min}</td>
                      <td data-label="Recommended">{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="project-page__group project-page__group--card">
              <h3>Not included</h3>
              <ul>
                <li>Hardware (PC, camera, printer, booth)</li>
                <li>Cash, coin or bill acceptors</li>
                <li>Cloud, hosting and PayMongo fees</li>
                <li>On-site setup</li>
              </ul>
              <p className="project-page__note">
                A PayMongo account of your own is required to receive GCash and Maya payments.
              </p>
            </div>
          </div>
        </section>

        <section id="costs" className="project-page__section">
          <h2>Running costs paid to other providers</h2>
          <p className="project-page__sub">
            Software pricing depends on your booth setup, so ask for a quote. These services are paid directly to their providers, based on your own volume.
          </p>
          <div className="project-page__table-wrap">
            <table className="project-page__table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">When</th>
                  <th scope="col">What it covers</th>
                </tr>
              </thead>
              <tbody>
                {costs.map(([item, when, covers]) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>
                      <span className={`project-page__tag${when.startsWith("Optional") ? " project-page__tag--opt" : ""}`}>{when}</span>
                    </td>
                    <td>{covers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="project-page__note">
            Provider prices change, so check each provider&apos;s current rates.
          </p>
        </section>

        <section className="project-page__section">
          <h2>Coming in the full version</h2>
          <ul className="project-page__next">
            {comingNext.map(item => (
              <li key={item.title}>
                <b>{item.title}</b>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="project-page__section project-page__closing">
          <h2>Want a booth like this?</h2>
          <p className="project-page__sub">
            Tell me about your events and where the booth will run. I&apos;ll reply with a quote and what it would take to set up.
          </p>
          <Link href="/#contact" className="project-page__cta">
            Get a quote
          </Link>
        </section>

        <p className="project-page__footer">
          Screens shown are from the kiosk app in portrait (1080×1920). It also runs in landscape.
        </p>
      </div>
      </LightboxProvider>
    </main>
  );
}
