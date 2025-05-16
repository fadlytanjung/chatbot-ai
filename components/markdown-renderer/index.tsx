"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface Props {
  content: string;
}

const components: Components = {
  h2({ node, children, ...props }) {
    return (
      <h2 {...props} className="group scroll-mt-20">
        {children}
        <a
          href={`#${(node?.properties as any).id}`}
          className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400"
        >
          🔗
        </a>
      </h2>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-auto">
        <table className="table-auto border-collapse border border-gray-200">
          {children}
        </table>
      </div>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    );
  },
  img({ src, alt, title }) {
    return (
      <figure className="text-center my-4">
        <img src={src} alt={alt} title={title} className="mx-auto" />
        {alt && (
          <figcaption className="text-xs text-gray-500 mt-1">{alt}</figcaption>
        )}
      </figure>
    );
  },
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div
      className="prose max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,
        ]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
