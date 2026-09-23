import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { FlowDiagram } from "@/components/common/flow-diagram";
import { cn } from "@/lib/utils";

function FlowOrPre({ children, ...props }: { children?: ReactNode }) {
  if (
    isValidElement<{ className?: string; children?: ReactNode }>(children) &&
    children.props.className?.includes("language-flow")
  ) {
    return <FlowDiagram source={String(children.props.children)} />;
  }
  return <pre {...props}>{children}</pre>;
}

export function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:font-medium prose-headings:tracking-tight",
        "prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-t prose-h2:border-border prose-h2:pt-10 first:prose-h2:mt-0 first:prose-h2:border-0 first:prose-h2:pt-0",
        "prose-p:text-muted-foreground prose-p:leading-relaxed",
        "prose-li:text-muted-foreground",
        "prose-strong:text-foreground",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:font-mono prose-code:text-sm",
        "prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:border prose-pre:border-border/70 prose-pre:bg-muted/40 prose-pre:px-4 prose-pre:py-4 prose-pre:font-mono prose-pre:text-xs prose-pre:leading-relaxed prose-pre:text-muted-foreground sm:prose-pre:text-sm",
        "prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ pre: ({ node: _node, ...props }) => <FlowOrPre {...props} /> }}
      >{content}</ReactMarkdown>
    </div>
  );
}
