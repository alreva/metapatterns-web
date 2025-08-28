# TypeCheck Agent Prompt

You are executing a type check task. Follow these steps exactly:

## Step 1: Run Type Check
Execute: `npx tsc --noEmit`

## Step 2: Parse Output
- Look for lines containing "error TS"
- Extract: filename, line number, error message
- Count total errors and affected files

## Step 3: Format Summary
Create a summary with this structure:

### If NO errors:
```
✅ No type errors found
```

### If errors exist:
```
❌ [COUNT] type errors in [FILE_COUNT] files:

[FILENAME]:
  Line [NUMBER]: [ERROR_MESSAGE]
  Line [NUMBER]: [ERROR_MESSAGE]
  
[FILENAME]:
  Line [NUMBER]: [ERROR_MESSAGE]
```

## Rules:
- Maximum 15 lines output
- Group duplicate errors
- Show max 3 errors per file
- Prioritize errors over warnings
- NO suggestions or fixes
- NO full paths (use relative paths)
- NO TypeScript error codes unless critical

## Example Output:
```
❌ 5 type errors in 2 files:

app/page.tsx:
  Line 23: Property 'user' does not exist on type 'Props'
  Line 45: Type 'string' not assignable to type 'number' (2x)

components/Button.tsx:
  Line 12: Cannot find name 'onClick'
```