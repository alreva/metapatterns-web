# Images Directory

This directory contains all visual diagrams and illustrations for the Metapatterns documentation.

## Directory Structure

- **4Kinds/** - Diagrams illustrating the four kinds of software architectures
- **Communication/** - Communication patterns and paradigm illustrations
- **Conclusion/** - Analysis diagrams for pattern comparison and lifecycle
- **Contents/** - Overview diagrams for each metapattern
- **Dependencies/** - Dependency relationship diagrams between patterns
- **Evolutions/** - Pattern evolution and transformation diagrams
- **Heart/** - Core architectural concept illustrations
- **Intro/** - Foundational concept diagrams and examples
- **Main/** - Detailed implementation diagrams for each pattern
- **Misc/** - Cover images and miscellaneous diagrams
- **Performance/** - Performance optimization illustrations
- **Relations/** - Inter-pattern relationship diagrams
- **Variants/** - Pattern variant and subtype diagrams

## File Formats

- **PNG files**: Optimized images for web display
- **VSDX files**: Source Visio files (excluded from git via .gitignore)

## Usage

Images are referenced in markdown files using relative paths:
```markdown
![Diagram Description](./img/Category/diagram-name.png)
```

## Image Guidelines

- All images are optimized for web display
- Consistent styling and color schemes across diagrams
- High contrast for accessibility
- Descriptive filenames matching content topics

## Source Files

Source Visio (.vsdx) files are maintained locally but excluded from version control to reduce repository size. Only the exported PNG files are committed.