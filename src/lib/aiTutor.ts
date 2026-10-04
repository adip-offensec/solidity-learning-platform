import { Lesson } from "@/types/learning";
import { CompilationResult, ExecutionResult } from "@/types/execution";

export interface TutorMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  codeSnippet?: string;
  suggestedAction?: string;
}

export interface TutorContext {
  lesson: Lesson;
  userCode: string;
  compilation: CompilationResult | null;
  execution: ExecutionResult | null;
}

export function generateTutorResponse(
  userQuestion: string,
  context: TutorContext
): TutorMessage {
  const q = userQuestion.toLowerCase().trim();
  const { lesson, userCode, compilation, execution } = context;

  let replyText = "";

  if (q.includes("hint") || q.includes("give me a hint") || q.includes("stuck")) {
    replyText = `💡 **Hint for ${lesson.exercise.title}**:\n\n` +
      `**Concept**: ${lesson.exercise.hints[0]}\n\n` +
      `**Guidance**: ${lesson.exercise.hints[1]}\n\n` +
      `*Try modifying your contract in the editor and click 'Compile & Run' to test!*`;
  } else if (q.includes("solution") || q.includes("show me the solution")) {
    replyText = `🔓 **Exercise Solution**:\n\n\`\`\`solidity\n${lesson.exercise.solutionCode}\n\`\`\`\n\n` +
      `**Why this works**:\n${lesson.exercise.solutionExplanation}`;
  } else if (
    (q.includes("error") || q.includes("why is this wrong") || q.includes("fix error")) &&
    compilation &&
    !compilation.success &&
    compilation.errors.length > 0
  ) {
    const mainErr = compilation.errors[0].formattedMessage;
    replyText = `🔍 **Compiler Error Breakdown**:\n\n` +
      `\`\`\`text\n${mainErr}\n\`\`\`\n\n` +
      `**Explanation**:\n` +
      `The Solidity compiler encountered a syntax or type mismatch. Common causes in this step:\n` +
      `- Missing semicolon \`;\` at the end of a line.\n` +
      `- Type mismatch (e.g. assigning a \`string\` to a \`uint256\`).\n` +
      `- Forgetting visibility specifiers (\`public\`, \`private\`, \`external\`, \`internal\`).\n\n` +
      `Check line positions reported in the diagnostic above and verify matching braces!`;
  } else if (q.includes("gas") || q.includes("why does this cost gas") || q.includes("sstore")) {
    replyText = `⛽ **Gas & EVM Execution Costs**:\n\n` +
      `In Ethereum, gas compensates nodes for computational work and storage allocation.\n\n` +
      `- **SSTORE (Writing to Storage)**: Up to 20,000 gas for cold slot allocation.\n` +
      `- **SLOAD (Reading Storage)**: 2,100 gas for cold slot load.\n` +
      `- **Memory & Stack**: Cost only 3 gas per word.\n\n` +
      `In **${lesson.title}**, minimizing state writes saves transaction fees for your users!`;
  } else if (q.includes("security") || q.includes("attack") || q.includes("reentrancy") || q.includes("vulnerability")) {
    if (lesson.securityNotes && lesson.securityNotes.length > 0) {
      const sec = lesson.securityNotes[0];
      replyText = `🛡️ **Security Alert: ${sec.vulnerability}** (${sec.riskLevel} Risk)\n\n` +
        `${sec.explanation}\n\n` +
        `**Vulnerable Pattern**:\n\`\`\`solidity\n${sec.vulnerablePattern}\n\`\`\`\n\n` +
        `**Fixed Secure Pattern**:\n\`\`\`solidity\n${sec.fixedPattern}\n\`\`\``;
    } else {
      replyText = `🛡️ **Solidity Security Best Practices**:\n\n` +
        `1. Always follow **Checks-Effects-Interactions (CEI)** pattern.\n` +
        `2. Use \`msg.sender\` for access control, NEVER \`tx.origin\`.\n` +
        `3. Use custom errors or explicit \`require\` statements to sanitize inputs.`;
    }
  } else if (q.includes("explain like i'm a beginner") || q.includes("simple")) {
    replyText = `🐣 **Beginner Breakdown for ${lesson.title}**:\n\n` +
      `${lesson.beginnerExplanation}\n\n` +
      `Think of a smart contract as a digital vending machine that strictly enforces rules without needing a bank or middleman.`;
  } else {
    replyText = `🤖 **Solidity Tutor Analysis for '${lesson.title}'**:\n\n` +
      `You are currently studying **${lesson.category}**.\n\n` +
      `**Key Takeaways**:\n` +
      `- ${lesson.summary}\n\n` +
      `**Your Code Status**:\n` +
      (compilation?.success
        ? `✅ Code compiles successfully! You can execute functions in the console below.`
        : `⚠️ Code has compilation diagnostics. Ask "Why is this wrong?" or "Give me a hint" to debug!`);
  }

  return {
    id: `msg-${Date.now()}`,
    sender: "tutor",
    text: replyText,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

export function explainCodeLineByLine(code: string): string {
  const lines = code.split("\n");
  const breakdown: string[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) return;

    if (trimmed.startsWith("pragma solidity")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Specifies the required Solidity compiler version constraint.`);
    } else if (trimmed.startsWith("contract ")) {
      const match = trimmed.match(/contract\s+(\w+)/);
      const name = match ? match[1] : "Contract";
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Declares the smart contract object \`${name}\`. Stored at a unique Ethereum address upon deployment.`);
    } else if (trimmed.includes("uint256 public ") || trimmed.includes("address public ")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Declares a **public state variable** stored permanently in contract storage. Generates an automatic getter function.`);
    } else if (trimmed.startsWith("function ")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Defines an EVM callable function with explicit visibility and mutability rules.`);
    } else if (trimmed.includes("require(")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Precondition validation guard. If false, reverts all state modifications and refunds unspent gas.`);
    } else if (trimmed.includes("revert ")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Explicitly aborts transaction execution and returns custom error selector to caller.`);
    } else if (trimmed.includes("emit ")) {
      breakdown.push(`- **Line ${idx + 1}** (\`${trimmed}\`): Emits an EVM event log appended to transaction bloom filters for off-chain indexing.`);
    }
  });

  return breakdown.length > 0
    ? `### 🔍 Line-by-Line Code Breakdown\n\n` + breakdown.join("\n\n")
    : "No contract syntax found to break down. Write some Solidity code above!";
}
