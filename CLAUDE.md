# Claude Code Project Setup

## Custom Workflows Available

This project has two specialized validation workflows configured in `.claude/agents/`:

### typecheck workflow
- **Purpose**: Runs TypeScript type checking with concise error reporting
- **Command**: `npx tsc --noEmit`
- **Usage**: "Run the typecheck workflow" or "Check types in the project"
- **When to use**: After any TypeScript code changes
- **Output format**: 
  - ✅ No type errors found (when successful)
  - ❌ X type errors in Y files (when errors exist)
  - Max 15 lines, grouped errors by file, no stack traces

### unittest workflow
- **Purpose**: Executes unit tests and provides summarized results
- **Command**: `npm test` (or appropriate test command)
- **Usage**: "Run the unittest workflow" or "Run tests"
- **When to use**: After implementing features or making changes
- **Output**: Max 20 lines, focuses on failures and key metrics

## Required Workflow

**Always validate changes before completing tasks:**
1. Make code changes
2. Run typecheck workflow (`npx tsc --noEmit`) to validate TypeScript
3. Run unittest workflow (`npm test`) to ensure tests pass
4. Fix any issues found
5. Mark task as complete

## Quick Commands

```
"Run the typecheck workflow"
"Run the unittest workflow"  
"Run typecheck and unittest workflows"
```

Note: These are custom workflows defined in `.claude/agents/` that provide formatted output.

## Documentation

See `.claude/README.md` for detailed agent documentation and configuration details.