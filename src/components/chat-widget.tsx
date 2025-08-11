"use client";

import { useState, useRef, useEffect, useRef as useMutableRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Sparkles, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

// Static sample messages (no Date.now for SSR determinism)
const sampleMessages: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hi! I&apos;m the embedded assistant. Ask me about this portfolio or technologies used.", ts: 0 },
  { id: "2", role: "user", content: "What stack powers this site?", ts: 1 },
  { id: "3", role: "assistant", content: "Next.js App Router, TypeScript, Tailwind, shadcn/ui, Framer Motion & Lucide icons.", ts: 2 }
];

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [mounted, open, messages.length]);

  // Simple incremental ID generator to keep deterministic ordering (avoids
  // crypto.randomUUID differences server/client if SSR re-enabled later)
  const idCounter = useMutableRef(1000);

  const nextId = () => (idCounter.current++).toString();

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    const userMsg: ChatMessage = { id: nextId(), role: 'user', content: text, ts: Date.now() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setSending(true);

    // Placeholder assistant bubble while waiting
    const tempId = nextId();
    setMessages(m => [...m, { id: tempId, role: 'assistant', content: '…thinking', ts: Date.now() }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setMessages(m => m.map(msg => msg.id === tempId ? { ...msg, content: data.reply || '(empty response)' } : msg));
  } catch {
      // We intentionally do not surface detailed error info to the user.
      setMessages(m => m.map(msg => msg.id === tempId ? { ...msg, content: 'Error contacting AI service.' } : msg));
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Avoid SSR to eliminate hydration risks for this non-critical widget
  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="mb-3 w-[310px] sm:w-[360px] h-[420px] backdrop-blur-xl rounded-2xl border border-border/70 bg-neutral-950/85 shadow-xl shadow-black/40 overflow-hidden flex flex-col"
          >
            <div className="relative flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-neutral-900/90">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-800 text-white shadow-inner">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold tracking-wide text-neutral-200">Chat (AI)</p>
                <p className="text-[10px] text-neutral-400">Gemini powered</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto rounded-md p-1 text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
            >
              {messages.map(m => (
                <div key={m.id} className={cn(
                  "group flex w-full",
                  m.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "relative max-w-[78%] rounded-xl px-3 py-2 text-xs leading-relaxed shadow-sm ring-1 whitespace-pre-wrap break-words",
                    "[overflow-wrap:anywhere] [word-break:break-word]",
                    m.role === 'user'
                      ? "bg-white text-neutral-900 ring-neutral-200 shadow-neutral-900/10"
                      : "bg-neutral-900/80 text-neutral-200 ring-neutral-800"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl bg-neutral-900/80 px-3 py-2 text-xs text-neutral-400 ring-1 ring-neutral-800">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-300" />
                    thinking
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border/60 p-3 bg-neutral-900/70">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={2}
                  placeholder="Ask something..."
                  className="w-full resize-none rounded-md border border-neutral-800 bg-neutral-950/70 px-3 py-2 pr-10 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 backdrop-blur"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                  className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full mb-1 bg-white text-neutral-900 shadow disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 hover:scale-105 active:scale-95 transition"
                >
                  {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="mt-2 text-[9px] text-neutral-500 leading-snug">
                Uses Google Gemini with a brief personal context about Himadri. Do not share secrets here.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: open ? 1.04 : 1.1 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/40 ring-1 focus:outline-none focus-visible:ring-2 transition-colors overflow-hidden",
          open ? "bg-neutral-900 text-white ring-neutral-700" : "bg-white text-neutral-900 ring-neutral-300"
        )}
      >
        {!open && (
          <ShakingBot />
        )}
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : null}
        </AnimatePresence>
        {/* Keep subtle ambient only when open to reduce visual noise when closed */}
        {open && (
          <span className="pointer-events-none absolute inset-0 rounded-full animate-ping opacity-15 bg-white/5" />
        )}
      </motion.button>
    </div>
  );
}
// Closed-state visual: bot avatar that performs a periodic gentle shake
function ShakingBot() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="flex items-center justify-center h-full w-full"
      animate={reduceMotion ? undefined : {
        rotate: [0,0,3,-3,3,-3,1,-1,0,0],
        y: [0,0,-1,1,-1,1,0,0,0,0]
      }}
  // Total cycle = duration + repeatDelay = 1.0 + 2.0 = 3s
  transition={reduceMotion ? undefined : { duration: 1.0, repeat: Infinity, repeatDelay: 2.0, ease: 'easeInOut' }}
    >
      <Image
        src="/bot.png"
        alt="Chat bot"
        width={32}
        height={32}
        className="pointer-events-none h-8 w-8 object-contain select-none"
        draggable={false}
        priority={false}
      />
    </motion.div>
  );
}
