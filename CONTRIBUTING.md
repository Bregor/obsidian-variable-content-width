# Contributing to Obsidian Variable Content Width

Thank you for your interest in contributing to the Obsidian Variable Content Width CSS snippet! This document provides guidelines and information for contributors.

## How to Contribute

### Reporting Bugs
- Use the [GitHub Issues](https://github.com/Bregor/obsidian-variable-content-width/issues) page
- Search existing issues first to avoid duplicates
- Use the bug report template
- Include your Obsidian version, operating system, and active theme
- Provide steps to reproduce the issue
- Include screenshots if relevant

### Suggesting Features
- Use [GitHub Discussions](https://github.com/Bregor/obsidian-variable-content-width/discussions) for feature ideas
- Describe your use case and why the feature would be beneficial
- Consider if the feature aligns with the project's goals
- Be open to alternative solutions

### Code Contributions
- Fork the repository
- Create a feature branch (`git checkout -b feature/your-feature-name`)
- Make your changes
- Test thoroughly (see Testing Guidelines below)
- Commit with clear, descriptive messages
- Submit a Pull Request

## Testing Guidelines

### Required Testing
Before submitting any code changes, please test:

1. **Core Functionality**
   - Both "Readable Line Length" ON and OFF modes
   - Source mode and Preview mode
   - Style Settings integration and real-time updates
   - All typography controls (H1, H2, H3, callouts)

2. **Responsive Behavior**
   - Split pane layouts (narrow and wide panes)
   - Different screen sizes (desktop, tablet, mobile)
   - Container query breakpoints (900px, 1200px)

3. **Content Types**
   - Regular text paragraphs
   - All heading levels (H1-H6)
   - Tables (regular and wide)
   - Code blocks and syntax highlighting
   - Callouts and admonitions
   - Images and media
   - Mermaid diagrams
   - Mathematical expressions (if using MathJax)

4. **Theme Compatibility**
   - Default Obsidian theme
   - At least 2-3 popular community themes
   - Dark and light modes

### Testing Checklist
- [ ] No horizontal or vertical scrollbars appear unexpectedly
- [ ] Content width responds to Style Settings changes immediately
- [ ] Typography hierarchy is preserved and visually balanced
- [ ] No layout shifts or jarring visual changes
- [ ] Print/PDF export looks clean and professional
- [ ] Mobile view degrades gracefully
- [ ] No console errors related to CSS

## Code Style Guidelines

### File Organization
- **Source files** live in `src/modules/`
- **Main entry point** is `src/variable-content-width.css`
- **Built output** is `variable-content-width.css` (git-tracked for releases)
- Use `@import` for module composition in the main file

### CSS Conventions
- Use 2-space indentation
- Group related properties together
- Use logical properties when possible (`margin-inline` vs `margin-left/right`)
- Comment complex calculations and selectors
- Use CSS custom properties for all configurable values
- Prefer `clamp()` over `min()`/`max()` when appropriate
- Use PostCSS nesting for better organization (will be compiled to standard CSS)

### Variable Naming
- Prefix all variables with `--vcw-set-` for Style Settings
- Use descriptive names: `--vcw-set-h1-scale` not `--vcw-h1`
- Internal variables can use `--vcw-` prefix without `set`
- Define all configurable variables in `src/modules/_vars.css`

### Selector Specificity
- Use the minimum specificity required
- Prefer class selectors over element selectors
- Document why `!important` is used (if necessary)
- Target Obsidian's specific DOM structure precisely
- Use PostCSS nesting for readability (it will be flattened on build)

### Comments
- Document the purpose of each major section
- Explain complex calculations
- Note browser compatibility requirements
- Include examples for configurable values

```css
/* =========== SECTION NAME ===========
   Brief description of what this section does
   ================================== */

/* Complex calculation explanation */
.selector {
  /* Why this calculation: responsive width with constraints */
  width: clamp(var(--min), var(--ideal), var(--max));
}
```

### Module Guidelines
When creating or modifying modules:

- **`_vars.css`** - Only CSS variables and Style Settings schema
- **`_containers.css`** - Container query definitions only
- **`preview.css`** - Preview/reading mode specific styles
- **`source.css`** - Source/edit mode specific styles
- **`mobile.css`** - Mobile-specific overrides (max-width: 1023px)
- **`a11y.css`** - Accessibility features (prefers-* media queries)
- **`print.css`** - Print/export optimizations
- **`debug.css`** - Debug mode visuals (toggle-able via Style Settings)

## Development Setup

### Prerequisites
- **Node.js** (v16 or later) and npm
- **Obsidian** installed and running
- **Style Settings plugin** installed in Obsidian
- A test vault with diverse content types
- Multiple themes for compatibility testing

### Local Development

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/obsidian-variable-content-width.git
   cd obsidian-variable-content-width
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up development workflow**

   **Option A: Manual copy** (simple)
   ```bash
   # Build once
   npm run build

   # Copy to Obsidian snippets folder
   cp variable-content-width.css /path/to/your/vault/.obsidian/snippets/
   ```

   **Option B: Watch mode + manual copy** (faster iteration)
   ```bash
   # Terminal 1: Auto-rebuild on file changes
   npm run watch

   # Terminal 2: Copy after each build
   # (or enable the snippet and reload Obsidian after changes)
   ```

   **Option C: Symlink** (best for active development)
   ```bash
   # Create symlink to snippets folder (one-time setup)
   ln -s "$(pwd)/variable-content-width.css" /path/to/your/vault/.obsidian/snippets/

   # Run watch mode
   npm run watch

   # In Obsidian: Reload the snippet or restart after changes
   ```

4. **Enable the snippet in Obsidian**
   - Settings → Appearance → CSS Snippets
   - Enable "Variable Content Width"

5. **Make changes to source files**
   - Edit files in `src/modules/` directory
   - Changes will be automatically rebuilt (if using watch mode)
   - Reload snippet in Obsidian to see changes

6. **Use debug mode**
   - Settings → Style Settings → Variable Content Width → Debug
   - Enable debug mode to see visual container boundaries
   - Use browser DevTools to inspect layout and debug issues

### Recommended Test Content
Create a test note with:
```markdown
# Heading 1
## Heading 2
### Heading 3

Regular paragraph text with sufficient length to test line wrapping and width constraints.

| Table | Header | Example |
|-------|---------|---------|
| Data  | More    | Content |

> [!info] Callout Example
> This is a callout to test width scaling

```css
/* Code block example */
.test-selector {
  property: value;
}
```

![Test Image](path/to/image.png)

![wide Test Image](path/to/wide-image.png)
```

## 🚀 Pull Request Process

### Before Submitting
1. **Build the project**: Run `npm run build` to ensure it compiles without errors
2. **Test thoroughly**: Follow the Testing Guidelines above
3. **Update documentation**: Update README.md if adding new features or settings
4. **Update changelog**: Add your changes to [CHANGELOG.md](CHANGELOG.md)
5. **Verify Style Settings schema**: Test all new/modified settings in Obsidian
6. **Check for breaking changes**: Ensure existing functionality still works
7. **Only commit source files**: Do NOT commit `variable-content-width.css` (it's built in CI)

### PR Description Template
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested in both source and preview modes
- [ ] Tested with readable line length ON and OFF
- [ ] Tested in split pane layouts
- [ ] Tested with multiple themes
- [ ] All Style Settings controls work correctly
- [ ] No console errors or layout issues

## Screenshots
Include before/after screenshots if relevant.

## Additional Context
Any other information relevant to this PR.
```

### Review Process
1. **Automated checks**: GitHub Actions build workflow must pass
2. **Manual code review**: Code review by maintainers
3. **Testing verification**: Reviewer tests changes in Obsidian
4. **Approval and merge**: Once approved, changes are merged
5. **Release**: Built CSS is automatically created when a version tag is pushed

## Build System

This project uses PostCSS to build a single CSS file from modular sources.

### Build Tools
- **PostCSS**: Core build system
- **postcss-import**: Concatenates `@import` statements
- **postcss-nesting**: Compiles nested CSS to flat selectors
- **autoprefixer**: Adds vendor prefixes for browser compatibility

### Build Commands
```bash
# Build once (production)
npm run build

# Watch mode (development)
npm run watch
```

### Build Configuration
The build is configured in `postcss.config.cjs`:
```javascript
module.exports = {
  map: true,  // Generates source maps
  plugins: {
    "postcss-import": {},      // Resolves @import
    "postcss-nesting": {},     // Handles nesting
    autoprefixer: {},          // Adds vendor prefixes
  },
};
```

### Source Maps
Source maps (`variable-content-width.css.map`) are generated during build. These help with debugging but should not be committed to git (they're in `.gitignore`).

### Module Import Order
The import order in `src/variable-content-width.css` matters:
1. **Variables first** (`_vars.css`) - Must be loaded before usage
2. **Containers** (`_containers.css`) - Defines container contexts
3. **View modes** (`preview.css`, `source.css`) - Core functionality
4. **Overrides last** (`mobile.css`, `a11y.css`, `print.css`, `debug.css`)

## CI/CD Pipeline

### Automated Workflows

The project uses GitHub Actions for continuous integration and releases:

#### **Build Workflow** (`.github/workflows/build.yml`)
- **Triggers**: On push/PR to main or version branches
- **Purpose**: Validates that source code builds successfully
- **Steps**:
  1. Checks out code
  2. Installs Node.js and dependencies
  3. Runs `npm run build`
  4. Verifies build output exists
  5. Uploads build artifact (available for 30 days)

#### **Release Workflow** (`.github/workflows/release.yml`)
- **Triggers**: When a version tag (`v*`) is pushed
- **Purpose**: Automatically creates GitHub releases with built CSS
- **Steps**:
  1. Checks out code
  2. Installs dependencies and builds CSS
  3. Creates GitHub release with the tag
  4. Attaches `variable-content-width.css` as a downloadable asset
  5. Auto-generates release notes

### Creating a Release

To create a new release:

1. **Update version in package.json**:
   ```bash
   npm version patch  # or minor, or major
   ```

2. **Update CHANGELOG.md** with release notes

3. **Commit and push changes**:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Bump version to v0.2.0"
   git push origin main
   ```

4. **Create and push version tag**:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

5. **GitHub Actions will automatically**:
   - Build the CSS from source
   - Create a GitHub release
   - Attach the built CSS file
   - Users can download from the release page

### Distribution Model

- **Source code**: Tracked in git (`src/` directory)
- **Built CSS**: NOT tracked in git, built in CI
- **Distribution**: Via GitHub Releases only
- **Users**: Download pre-built CSS from releases
- **Developers**: Build locally from source

## Resources

### Obsidian CSS Development
- [Obsidian CSS Variables](https://docs.obsidian.md/Reference/CSS+variables/Foundations/Colors)
- [Style Settings Plugin Documentation](https://github.com/mgmeyers/obsidian-style-settings)
- [Obsidian Developer Documentation](https://docs.obsidian.md/Home)

### CSS Technologies Used
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Math Functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions)

### Community
- [Obsidian Discord](https://discord.gg/veuWUTm) - #appearance channel
- [Obsidian Forum](https://forum.obsidian.md/) - Appearance section
- [r/ObsidianMD](https://reddit.com/r/ObsidianMD) - Reddit community

## Recognition

Contributors will be recognized in:
- README.md acknowledgments section
- [CHANGELOG.md](CHANGELOG.md) for their specific contributions
- GitHub contributors page

Thank you for helping make Variable Content Width better for the entire Obsidian community! 🙏
