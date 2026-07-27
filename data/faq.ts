export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is DevOS?",
    answer:
      "DevOS is a developer workspace tool designed to help developers connect their project notes, code snippets, AI chat outputs, and learning tracker into one unified knowledge hub.",
  },
  {
    question: "How does AI Chat Memory work?",
    answer:
      "AI Chat Memory allows you to capture insightful prompts and responses from AI coding assistants and save them directly inside your relevant project workspace for future reference.",
  },
  {
    question: "Is there a free tier available?",
    answer:
      "Yes, the Starter plan is 100% free forever and includes up to 3 active projects, snippet management, and context-linked notes.",
  },
  {
    question: "Can I use DevOS with my team?",
    answer:
      "Absolutely. The Team plan allows developers to share project knowledge bases, code snippet libraries, and collaborative documentation.",
  },
  {
    question: "Does DevOS replace my IDE?",
    answer:
      "No, DevOS works alongside your favorite IDE (like VS Code or WebStorm) as your personal developer knowledge base and organization system.",
  },
  {
    question: "How does Unified Search work?",
    answer:
      "Unified Search indexes all your notes, saved snippets, project metadata, and AI responses so you can locate anything across all projects in milliseconds.",
  },
];
