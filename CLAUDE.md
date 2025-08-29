# Claude Code Project Setup

## Custom Agents Available

This project has two specialized validation agents configured in `.claude/agents/`:

### typecheck
- **Purpose**: Runs TypeScript type checking with concise error reporting
- **Usage**: "Run the typecheck agent" or "Check types in the project"
- **When to use**: After any TypeScript code changes
- **Output**: Max 15 lines, grouped errors by file, no stack traces

### unittest
- **Purpose**: Executes unit tests and provides summarized results  
- **Usage**: "Run the unittest agent" or "Run tests"
- **When to use**: After implementing features or making changes
- **Output**: Max 20 lines, focuses on failures and key metrics

## Required Workflow

**Always validate changes before completing tasks:**
1. Make code changes
2. Run `typecheck` agent to validate TypeScript
3. Run `unittest` agent to ensure tests pass
4. Fix any issues found
5. Mark task as complete

## Quick Commands

```
"Run the typecheck agent"
"Run the unittest agent"  
"Run typecheck and unittest agents"
```

## Documentation

See `.claude/README.md` for detailed agent documentation and configuration details.