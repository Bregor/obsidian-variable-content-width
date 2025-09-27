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

### CSS Conventions
- Use 2-space indentation
- Group related properties together
- Use logical properties when possible (`margin-inline` vs `margin-left/right`)
- Comment complex calculations and selectors
- Use CSS custom properties for all configurable values
- Prefer `clamp()` over `min()`/`max()` when appropriate

### Variable Naming
- Prefix all variables with `--vcw-set-` for Style Settings
- Use descriptive names: `--vcw-set-h1-scale` not `--vcw-h1`
- Internal variables can use `--vcw-` prefix without `set`

### Selector Specificity
- Use the minimum specificity required
- Prefer class selectors over element selectors
- Document why `!important` is used (if necessary)
- Target Obsidian's specific DOM structure precisely

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

## 🏗️ Development Setup

### Prerequisites
- Obsidian installed and running
- Style Settings plugin installed
- A test vault with diverse content types
- Multiple themes for compatibility testing

### Local Development
1. Fork and clone the repository
2. Copy `variable-content-width.css` to your Obsidian snippets folder
3. Enable the snippet in Obsidian
4. Make changes and test in real-time
5. Use browser DevTools to inspect layout and debug issues

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
1. Ensure all tests pass (see Testing Guidelines)
2. Update documentation if adding new features
3. Add your changes to [CHANGELOG.md](CHANGELOG.md)
4. Verify Style Settings schema is correct
5. Check that your changes don't break existing functionality

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
1. Automated checks (if any) must pass
2. Manual code review by maintainers
3. Testing verification by reviewer
4. Approval and merge

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
