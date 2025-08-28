# Claude Code Custom Agents

This directory contains custom agent configurations for Claude Code.

## Available Agents

### TypeCheck Agent
A specialized agent that runs TypeScript type checking and returns concise error summaries.

**Usage:**
When working with Claude Code, you can invoke this agent by asking:
- "Run the typecheck agent"
- "Check types in the project"
- "Run type validation"

The agent will:
1. Run `npx tsc --noEmit` to check TypeScript types
2. Parse any errors found
3. Return a concise summary (max 15 lines)
4. Group similar errors to avoid clutter

**Example Output:**
```
❌ 3 type errors in 2 files:

app/page.tsx:
  Line 15: Property 'user' does not exist on type 'Props'
  Line 23: Type 'string' not assignable to type 'number'

components/Button.tsx:
  Line 8: Cannot find name 'onClick'
```

### UnitTest Agent
A specialized agent that runs unit tests and returns concise test results.

**Usage:**
When working with Claude Code, you can invoke this agent by asking:
- "Run the unittest agent"
- "Run tests"
- "Execute unit tests"
- "Check if tests pass"

The agent will:
1. Detect the test framework (Jest, Vitest, etc.)
2. Run the test suite
3. Parse test results
4. Return a concise summary (max 20 lines)
5. Focus on failures and key metrics

**Example Output (Success):**
```
✅ All tests passed!

Test Suites: 5 passed, 5 total
Tests: 42 passed, 42 total
Time: 3.2 seconds
```

**Example Output (Failures):**
```
❌ Test failures detected:

Failed: 2/5 test suites, 3/42 tests

FAILURES:

📁 components/Button.test.tsx:
  ❌ "renders with correct text" (line 15)
     Error: Expected "Click" but received "Submit"
  ❌ "handles click events"
     Error: onClick not called

📁 utils/validation.test.ts:
  ❌ "validates email format"
     Error: Expected false but got true

Summary: 39 passed, 3 failed, 42 total
Time: 4.1 seconds
```

## How It Works

Claude Code will use the Task tool with the appropriate `subagent_type` to run these agents:
- `subagent_type: "typecheck"` for TypeScript checking
- `subagent_type: "unittest"` for running tests

Both agents:
- Have limited tool access (Bash, Read, Grep, LS)
- Cannot modify files (read-only operations)
- Return summarized results to avoid context bloat
- Focus on actionable information only

## Benefits

1. **Context Preservation**: Agents run in isolation, keeping the main conversation clean
2. **Concise Output**: Only essential information is returned
3. **Consistent Format**: Standardized output format for easy reading
4. **No Bloat**: Full stack traces and verbose output stay out of the main thread

## Adding New Agents

To add a new agent:
1. Create a new YAML file in `.claude/agents/`
2. Define the agent's name, description, tools, and system prompt
3. Optionally add a detailed prompt in `.claude/prompts/`
4. Update this README with usage instructions
5. Test by asking Claude Code to run your agent

## Configuration Structure

```
.claude/
├── agents/
│   ├── typecheck.yaml       # TypeScript checking agent
│   └── unittest.yaml        # Unit test runner agent
├── prompts/
│   ├── typecheck-prompt.md  # Detailed TypeScript checking instructions
│   └── unittest-prompt.md   # Detailed test running instructions
└── README.md                # This file
```

## Tips for Using Agents

- Run typecheck after making TypeScript changes
- Run unittest after implementing new features or fixes
- Agents can be run in parallel for faster feedback
- Results are cached briefly to avoid redundant runs