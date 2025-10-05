#!/usr/bin/env node

/**
 * Release Preparation Script
 *
 * This script helps prepare a new release by:
 * 1. Validating that all changes are committed
 * 2. Prompting for version bump (patch, minor, major)
 * 3. Building the CSS to verify it compiles
 * 4. Providing instructions for creating the release
 */

const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function exec(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: "pipe" }).trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("Variable Content Width - Release Preparation\n");

  // Check for uncommitted changes
  const status = exec("git status --porcelain");
  if (status) {
    console.error("❌ Error: You have uncommitted changes:");
    console.error(status);
    console.error(
      "\nPlease commit or stash your changes before preparing a release.",
    );
    process.exit(1);
  }

  // Get current version
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const currentVersion = packageJson.version;
  console.log(`Current version: ${currentVersion}\n`);

  // Prompt for version bump
  console.log("What type of version bump would you like?");
  console.log("  1. patch (0.2.0 → 0.2.1) - Bug fixes");
  console.log("  2. minor (0.2.0 → 0.3.0) - New features");
  console.log("  3. major (0.2.0 → 1.0.0) - Breaking changes");
  console.log("  4. custom - Specify version manually\n");

  const choice = await question("Enter choice (1-4): ");

  let bumpType;
  let newVersion;

  switch (choice.trim()) {
    case "1":
      bumpType = "patch";
      break;
    case "2":
      bumpType = "minor";
      break;
    case "3":
      bumpType = "major";
      break;
    case "4":
      const custom = await question("Enter version (e.g., 1.0.0): ");
      newVersion = custom.trim();
      break;
    default:
      console.error("Invalid choice");
      process.exit(1);
  }

  // Calculate new version if using npm version
  if (bumpType) {
    console.log(`\nRunning: npm version ${bumpType} --no-git-tag-version`);
    exec(`npm version ${bumpType} --no-git-tag-version`);
    const updated = JSON.parse(fs.readFileSync("package.json", "utf8"));
    newVersion = updated.version;
  } else {
    // Update package.json manually
    packageJson.version = newVersion;
    fs.writeFileSync(
      "package.json",
      JSON.stringify(packageJson, null, 2) + "\n",
    );
  }

  console.log(`Version updated to: ${newVersion}\n`);

  // Build CSS to verify
  console.log("Building CSS to verify...");
  try {
    exec("npm run build");
    console.log("Build successful\n");
  } catch (error) {
    console.error("❌ Build failed! Fix errors before releasing.");
    process.exit(1);
  }

  // Check if CHANGELOG was updated
  console.log("Checking CHANGELOG.md...");
  const changelog = fs.readFileSync("CHANGELOG.md", "utf8");
  if (
    !changelog.includes(`[${newVersion}]`) &&
    !changelog.includes(`## [${newVersion}]`)
  ) {
    console.warn(
      "Warning: CHANGELOG.md does not contain an entry for this version",
    );
    const shouldContinue = await question("Continue anyway? (y/N): ");
    if (shouldContinue.toLowerCase() !== "y") {
      console.log("Aborted. Please update CHANGELOG.md first.");
      process.exit(1);
    }
  } else {
    console.log("CHANGELOG.md looks good\n");
  }

  // Clean up built file (it shouldn't be committed)
  if (fs.existsSync("variable-content-width.css")) {
    fs.unlinkSync("variable-content-width.css");
    console.log("Cleaned up built CSS file (will be built in CI)\n");
  }

  // Provide release instructions
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Release preparation complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("Next steps:\n");
  console.log("1. Review the changes:");
  console.log("   git diff\n");
  console.log("2. Commit the version bump:");
  console.log(`   git add package.json CHANGELOG.md`);
  console.log(`   git commit -m "Release v${newVersion}"\n`);
  console.log("3. Push to main:");
  console.log("   git push origin main\n");
  console.log("4. Create and push the tag:");
  console.log(`   git tag v${newVersion}`);
  console.log(`   git push origin v${newVersion}\n`);
  console.log("5. GitHub Actions will automatically:");
  console.log("   - Build the CSS");
  console.log("   - Create a release");
  console.log("   - Attach the built CSS file\n");
  console.log(
    `6. Visit: https://github.com/Bregor/obsidian-variable-content-width/releases/tag/v${newVersion}`,
  );
  console.log("   to verify the release\n");

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
