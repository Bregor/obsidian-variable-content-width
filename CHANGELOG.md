# Changelog

All notable changes to the Variable Content Width snippet will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-10-05

### Changed
- **Build System**: Migrated to PostCSS-based modular architecture
  - Source files now organized in `src/modules/` directory
  - Build process uses `postcss-import`, `postcss-nesting`, and `autoprefixer`
  - Enables better code organization and maintainability
  - Developers should use `npm run build` or `npm run watch` for development

### Added
- **CI/CD Pipeline**: GitHub Actions workflows for automated building and releases
  - Build validation on every push/PR
  - Automatic release creation when version tags are pushed
  - Built CSS distributed via GitHub Releases, not committed to repository
- **Release Script**: `npm run prepare-release` for streamlined version management
- **Documentation**: Comprehensive guides for build system and release process

### Technical
- Source code split into focused modules: `_vars.css`, `_containers.css`, `preview.css`, `source.css`, `mobile.css`, `a11y.css`, `print.css`, `debug.css`
- PostCSS nesting support for cleaner source code
- Source maps generated for easier debugging (not included in distribution)
- Built CSS removed from git tracking (`.gitignore`)
- GitHub Actions workflows: `build.yml` and `release.yml`
- Updated all documentation to reflect CI/CD workflow

## [0.1.0] - 2025-09-28

### Added
- Initial release of Variable Content Width CSS snippet
- Container query-based responsive design for true per-pane width control
- Full Style Settings plugin integration with GUI controls
- Support for both "Readable Line Length" ON and OFF modes
- Typography hierarchy controls (H1, H2, H3, Callout scaling)
- Advanced padding and width constraint customization
- Mobile-responsive design (follows theme defaults on <1024px screens)
- Accessibility features (reduced motion, high contrast support)
- Print optimization for clean PDF exports
- Comprehensive documentation and examples

### Features
- **Intelligent Width Management**: Uses `cqi` units for split-pane awareness
- **Style Settings Integration**: 10+ configurable parameters with sliders and text inputs
- **Typography Controls**: Independent width scaling for headings and callouts
- **Responsive Elements**: Tables and diagrams adapt to container width
- **Cross-Mode Compatibility**: Works seamlessly in source and preview modes
- **Modern CSS**: Container queries, logical properties, CSS custom properties
- **Performance Optimized**: Efficient selectors and minimal DOM impact

### Technical Details
- Minimum browser support: Chrome 105+, Firefox 110+, Safari 16+
- File size: <10KB CSS, no JavaScript dependencies
- Compatible with all major Obsidian themes
- Tested on Obsidian v1.4.16+ across Windows, macOS, and Linux

### Configuration Options
- **Readable Width**: Responsive (`85cqi`) or fixed (`800px`) sizing
- **Width Constraints**: Configurable min/max boundaries
- **Typography Scaling**: H1 (1.2x), H2 (1.15x), H3 (1.05x), Callouts (1.2x)
- **Padding Control**: Adjustable side spacing multiplier
- **Element Breakout**: Tables and wide content expansion rules

---

## Future Releases

### Planned for v0.2.0
- [x] Additional element types for responsive behavior
- [x] Debug mode with visual content boundaries
- [x] Theme-specific compatibility improvements

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

- Report bugs: [GitHub Issues](https://github.com/Bregor/obsidian-variable-content-width/issues)
- Feature requests: [GitHub Discussions](https://github.com/Bregor/obsidian-variable-content-width/discussions)
