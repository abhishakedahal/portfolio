const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const sourceRoot = path.join(__dirname, "..", "src", "assets", "images");
const outputRoot = path.join(sourceRoot, "optimized");
const projectRoot = path.join(sourceRoot, "projects");
const projectWidths = [400, 680, 900, 1200];
const profileWidths = [350, 700];

async function optimizeImage(inputPath, widths, isProfile = false) {
  const parsed = path.parse(inputPath);
  const relativeDirectory = path.relative(sourceRoot, parsed.dir);
  const outputDirectory = path.join(outputRoot, relativeDirectory);
  await fs.mkdir(outputDirectory, { recursive: true });

  const source = sharp(inputPath).rotate();
  const metadata = await source.metadata();
  const outputBase = path.join(outputDirectory, parsed.name);

  await Promise.all(
    widths.flatMap((width) => [
      source.clone().resize({ width, withoutEnlargement: true })
        .avif({ quality: isProfile ? 80 : 55 }).toFile(`${outputBase}-${width}.avif`),
      source.clone().resize({ width, withoutEnlargement: true })
        .webp({ quality: isProfile ? 90 : 75 }).toFile(`${outputBase}-${width}.webp`),
      source.clone().resize({ width, withoutEnlargement: true })
        .jpeg({ quality: isProfile ? 92 : 82, mozjpeg: true }).toFile(`${outputBase}-${width}.jpg`)
    ])
  );

  return `${parsed.name}: ${metadata.width}x${metadata.height}`;
}

async function main() {
  await fs.rm(outputRoot, { recursive: true, force: true });
  const projectFiles = (await fs.readdir(projectRoot))
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .map((file) => path.join(projectRoot, file));
  const files = [...projectFiles, path.join(sourceRoot, "profile.jpg")];
  const results = await Promise.all(files.map((file) =>
    optimizeImage(
      file,
      path.basename(file).toLowerCase() === "profile.jpg" ? profileWidths : projectWidths,
      path.basename(file).toLowerCase() === "profile.jpg"
    )
  ));
  await sharp(path.join(sourceRoot, "profile.jpg"))
    .resize(96, 96, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputRoot, "favicon-96.png"));
  console.log(`Optimized ${results.length} images`);
  results.forEach((result) => console.log(`- ${result}`));
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exitCode = 1;
});
