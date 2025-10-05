# Release Workflow Guide

This document explains the CI/CD setup and release process for Variable Content Width.

## Overview

The project uses GitHub Actions to automatically build and distribute the CSS snippet. This ensures:
- Clean git history (no built files committed)
- Reproducible builds (consistent environment)
- Automated releases (one command to publish)
- Build validation on every PR

## Architecture

### Source Code (Git)
```
src/
├── variable-content-width.css    # Entry point
└── modules/
    ├── _vars.css                 # Variables
    ├── _containers.css           # Container queries
    ├── preview.css               # Preview mode
    ├── source.css                # Source mode
    ├── mobile.css                # Mobile styles
    ├── a11y.css                  # Accessibility
    ├── print.css                 # Print styles
    └── debug.css                 # Debug mode
```

### Built Output (NOT in Git)
```
variable-content-width.css        # Built, distributed via releases
variable-content-width.css.map    # Source maps (dev only)
```

### CI/CD Workflows

#### 1. Build Workflow (`build.yml`)
**Triggers**: Every push/PR to main or version branches

**Purpose**: Validate that code builds successfully

**Steps**:
1. Checkout code
2. Install dependencies (`npm ci`)
3. Build CSS (`npm run build`)
4. Verify output exists
5. Upload artifact (available for 30 days)

**Result**: Green checkmark on PRs means code will build successfully

#### 2. Release Workflow (`release.yml`)
**Triggers**: When a version tag is pushed (e.g., `v0.2.0`)

**Purpose**: Automatically create releases with built CSS

**Steps**:
1. Checkout code
2. Install dependencies
3. Build CSS from source
4. Create GitHub release with the tag
5. Attach built CSS as downloadable asset
6. Auto-generate release notes

**Result**: Users can download `variable-content-width.css` from the release page

## Creating a Release

### Method 1: Using the Prepare Script (Recommended)

```bash
npm run prepare-release
```

This interactive script will:
1. Check for uncommitted changes
2. Prompt for version bump type
3. Update `package.json`
4. Build CSS to verify it works
5. Remind you to update `CHANGELOG.md`
6. Provide exact commands to complete the release

### Method 2: Manual Steps

1. **Update version in package.json**
   ```bash
   npm version patch  # or minor, or major
   # This creates: 0.2.0 → 0.2.1 (patch)
   #               0.2.0 → 0.3.0 (minor)
   #               0.2.0 → 1.0.0 (major)
   ```

2. **Update CHANGELOG.md**
   - Change `## [0.2.0] - TBD` to `## [0.2.0] - 2025-10-05`
   - Add release notes under appropriate sections

3. **Test the build locally**
   ```bash
   npm run build
   # Verify it builds without errors
   # Built file will be ignored by git
   ```

4. **Commit changes**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Release v0.2.0"
   git push origin main
   ```

5. **Create and push the version tag**
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

6. **Wait for GitHub Actions**
   - Go to: https://github.com/Bregor/obsidian-variable-content-width/actions
   - Watch the "Release" workflow run
   - Should complete in ~1-2 minutes

7. **Verify the release**
   - Go to: https://github.com/Bregor/obsidian-variable-content-width/releases
   - Verify the release was created
   - Verify `variable-content-width.css` is attached
   - Test downloading and using it in Obsidian

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.2.0 → 0.2.1): Bug fixes, no new features
- **Minor** (0.2.0 → 0.3.0): New features, backward compatible
- **Major** (0.2.0 → 1.0.0): Breaking changes

## Distribution Model

### For Users
1. Go to [Releases](https://github.com/Bregor/obsidian-variable-content-width/releases)
2. Download `variable-content-width.css` from latest release
3. Install in Obsidian snippets folder

### For Contributors
1. Clone repository
2. Edit source files in `src/`
3. Run `npm run watch` for live rebuilding
4. Submit PR (built file is NOT included)
5. CI validates the build automatically

## Troubleshooting

### Build fails in CI
- Run `npm run build` locally to see the error
- Fix the issue in source files
- Commit and push the fix

### Release workflow doesn't trigger
- Ensure you pushed the tag: `git push origin v0.2.0`
- Check that tag format matches `v*` pattern
- Verify workflows are enabled in repository settings

### Release created but no CSS attached
- Check workflow logs for build errors
- Verify `variable-content-width.css` is created during build
- Check file path in `release.yml` is correct

### Want to delete a bad release
```bash
# Delete the tag locally
git tag -d v0.2.0

# Delete the tag remotely
git push origin :refs/tags/v0.2.0

# Delete the release on GitHub (use web UI)
```

Then fix the issue and create a new release with a bumped version.

## Best Practices

1. **Always test locally before tagging**
   ```bash
   npm run build
   # Test the built CSS in Obsidian
   ```

2. **Update CHANGELOG.md before releasing**
   - Users read this to understand changes
   - Include migration notes for breaking changes

3. **Use meaningful commit messages**
   - CI logs will reference these
   - Helps with debugging failed releases

4. **One release at a time**
   - Don't create multiple tags simultaneously
   - Wait for previous release workflow to complete

5. **Monitor the Actions tab**
   - Watch for build failures
   - Address issues quickly

## Future Enhancements

Potential improvements to consider:

- [ ] Automated changelog generation from commits
- [ ] Pre-release/beta distribution via branches
- [ ] CSS minification for smaller file size
- [ ] Automated testing of CSS validity
- [ ] Version bump suggestions based on commit messages
- [ ] Slack/Discord notifications on releases
