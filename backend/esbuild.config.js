import esbuild from "esbuild";
import fs from "fs";
import path from "path";

const cleanDist = () => {
  const distPath = path.resolve("dist");
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log("🧹 Cleaned dist folder");
  }
};

// Function to copy a folder recursively
const copyFolder = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Source folder "${src}" does not exist. Skipping copy.`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });

  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  console.log(`📂 Copied ${src} -> ${dest}`);
};

cleanDist();

esbuild
  .build({
    entryPoints: ["src/**/*.ts"],
    outdir: "dist",
    bundle: false,
    minify: false,
    platform: "node",
    target: "node18",
    sourcemap: false,
    tsconfig: "tsconfig.json",
  })
  .then(() => {
    copyFolder(path.resolve("src/swagger"), path.resolve("dist/swagger"));
    console.log("✅ Build complete! package.json copied to dist/");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
