/**
 * Screenshot capture using system Chrome (headless)
 * No npm install needed — uses Node's built-in child_process + the installed Chrome
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, "src", "assets", "images", "projects");

const sites = [
  { name: "kirana",       url: "https://themegrilldemos.com/kirana/",      file: "project-kirana.jpg" },
  { name: "ornate",       url: "https://themegrilldemos.com/ornate-decor/",file: "project-ornate.jpg" },
  { name: "blissful",     url: "https://themegrilldemos.com/blissful/",    file: "project-blissful.jpg" },
  { name: "webshop",      url: "https://themegrilldemos.com/webshop/",     file: "project-webshop.jpg" },
  { name: "skincare",     url: "https://themegrilldemos.com/skincare/",    file: "project-skincare.jpg" },
  { name: "nima",         url: "https://nima-ea77c6.webflow.io/",          file: "project-nima.jpg" },
  { name: "solguides",    url: "https://www.thesolguides.com/",            file: "project-solguides.jpg" },
  { name: "crispstories", url: "https://www.crispstories.com/",            file: "project-crispstories.jpg" },
  { name: "kwant",        url: "https://www.kwant.ai/",                    file: "project-kwant.jpg" },
];

// Chrome headless outputs a PNG named 'screenshot.png' in the working dir by default
// We'll capture to a temp PNG then the user can rename/convert

for (const site of sites) {
  const tempPng = path.join(OUTPUT_DIR, site.name + "-temp.png");
  const finalJpg = path.join(OUTPUT_DIR, site.file);

  console.log(`Capturing ${site.name}...`);
  try {
    const cmd = [
      `"${CHROME}"`,
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-extensions",
      "--hide-scrollbars",
      `--window-size=1920,1080`,
      `--screenshot="${tempPng}"`,
      `"${site.url}"`
    ].join(" ");

    execSync(cmd, { timeout: 30000, stdio: "inherit" });

    // Rename PNG to JPG (browsers save PNG regardless of extension)
    if (fs.existsSync(tempPng)) {
      fs.renameSync(tempPng, finalJpg.replace(".jpg", ".png"));
      console.log(`  ✓ Saved as ${site.name}.png`);
    } else {
      console.log(`  ✗ Screenshot not found for ${site.name}`);
    }
  } catch (err) {
    console.error(`  ✗ Failed ${site.name}: ${err.message}`);
  }
}

console.log("\nDone. Files saved to:", OUTPUT_DIR);
