import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

export interface MarkdownViewProps {
  content: string
  isUser?: boolean
  className?: string
}

interface InlineToken {
  type: 'text' | 'bold' | 'italic' | 'bold_italic' | 'code' | 'link'
  content: string
  href?: string
}

interface MarkdownBlock {
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'bullet'
    | 'numbered'
    | 'quote'
    | 'hr'
    | 'codeblock'
    | 'spacer'
    | 'paragraph'
  content?: string
  num?: string
  lang?: string
}

/**
 * Parses inline formatting:
 * - ***bold italic***
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - `code`
 * - [label](url)
 */
function parseInline(text: string): InlineToken[] {
  if (!text) return []

  const tokens: InlineToken[] = []
  const regex =
    /(\[(.+?)\]\((https?:\/\/[^\s)]+)\)|\*\*\*([^*]+?)\*\*\*|___([^_]+?)___|\*\*([^*]+?)\*\*|__([^_]+?)__|(?<!\*)\*([^*]+?)\*(?!\*)|`([^`]+?)`)/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }

    const [
      ,
      ,
      linkText,
      linkUrl,
      biText1,
      biText2,
      bText1,
      bText2,
      iText,
      cText
    ] = match

    if (linkText && linkUrl) {
      tokens.push({ type: 'link', content: linkText, href: linkUrl })
    } else if (biText1 || biText2) {
      tokens.push({ type: 'bold_italic', content: biText1 || biText2 })
    } else if (bText1 || bText2) {
      tokens.push({ type: 'bold', content: bText1 || bText2 })
    } else if (iText) {
      tokens.push({ type: 'italic', content: iText })
    } else if (cText) {
      tokens.push({ type: 'code', content: cText })
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', content: text }]
}

/**
 * Parses markdown blocks:
 * - Code blocks (```lang ... ```)
 * - Headings (#, ##, ###)
 * - Lists (-, *, 1.)
 * - Blockquotes (>)
 * - Horizontal rules (---)
 * - Paragraphs
 */
function parseMarkdownBlocks(text: string): MarkdownBlock[] {
  if (!text) return []

  const lines = text.split(/\r?\n/)
  const blocks: MarkdownBlock[] = []
  let inCodeBlock = false
  let codeLang = ''
  let codeLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // 1. Code Block Delimiter
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          type: 'codeblock',
          lang: codeLang,
          content: codeLines.join('\n')
        })
        inCodeBlock = false
        codeLines = []
        codeLang = ''
      } else {
        inCodeBlock = true
        codeLang = trimmed.slice(3).trim()
        codeLines = []
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // 2. Empty / Spacer Line
    if (!trimmed) {
      if (blocks.length > 0 && blocks[blocks.length - 1].type !== 'spacer') {
        blocks.push({ type: 'spacer' })
      }
      continue
    }

    // 3. Headings
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', content: trimmed.slice(4) })
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', content: trimmed.slice(3) })
    } else if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', content: trimmed.slice(2) })
    } else if (trimmed === '---' || trimmed === '***') {
      blocks.push({ type: 'hr' })
    } else if (trimmed.startsWith('> ')) {
      blocks.push({ type: 'quote', content: trimmed.slice(2) })
    } else if (/^[-*•]\s+/.test(trimmed)) {
      blocks.push({ type: 'bullet', content: trimmed.replace(/^[-*•]\s+/, '') })
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s+(.*)$/)
      if (match) {
        blocks.push({ type: 'numbered', num: match[1], content: match[2] })
      } else {
        blocks.push({ type: 'paragraph', content: trimmed })
      }
    } else {
      blocks.push({ type: 'paragraph', content: trimmed })
    }
  }

  if (inCodeBlock && codeLines.length > 0) {
    blocks.push({
      type: 'codeblock',
      lang: codeLang,
      content: codeLines.join('\n')
    })
  }

  return blocks
}

export default function MarkdownView({
  content,
  isUser = false,
  className = ''
}: MarkdownViewProps) {
  const blocks = parseMarkdownBlocks(content)

  const renderInline = (inlineText?: string) => {
    if (!inlineText) return null
    const tokens = parseInline(inlineText)

    return tokens.map((token, idx) => {
      switch (token.type) {
        case 'bold':
          return (
            <Text
              key={idx}
              className={
                isUser
                  ? 'font-bold text-white'
                  : 'font-bold text-gray-950 tracking-tight'
              }
            >
              {token.content}
            </Text>
          )
        case 'bold_italic':
          return (
            <Text
              key={idx}
              className={
                isUser
                  ? 'font-bold italic text-white'
                  : 'font-bold italic text-gray-950'
              }
            >
              {token.content}
            </Text>
          )
        case 'italic':
          return (
            <Text
              key={idx}
              className={isUser ? 'italic text-white/90' : 'italic text-gray-700'}
            >
              {token.content}
            </Text>
          )
        case 'code':
          return (
            <Text
              key={idx}
              className={
                isUser
                  ? 'font-mono text-[11px] bg-white/20 text-white px-1.5 py-0.5 rounded border border-white/30'
                  : 'font-mono text-[11px] bg-emerald-50 text-emerald-900 border border-emerald-200/90 px-1.5 py-0.5 rounded font-semibold'
              }
            >
              {token.content}
            </Text>
          )
        case 'link':
          return (
            <Text
              key={idx}
              onClick={() => {
                if (token.href) {
                  Taro.setClipboardData({
                    data: token.href,
                    success: () =>
                      Taro.showToast({ title: 'Link copied', icon: 'success' })
                  })
                }
              }}
              className={
                isUser
                  ? 'text-white underline font-semibold'
                  : 'text-[#2b881f] underline font-semibold cursor-pointer'
              }
            >
              {token.content}
            </Text>
          )
        default:
          return <Text key={idx}>{token.content}</Text>
      }
    })
  }

  return (
    <View className={`flex flex-col ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <View key={idx} className="my-1.5">
                <Text
                  className={`text-[16px] font-extrabold ${
                    isUser ? 'text-white' : 'text-gray-950'
                  }`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'h2':
            return (
              <View key={idx} className="my-1">
                <Text
                  className={`text-[14.5px] font-bold ${
                    isUser ? 'text-white' : 'text-gray-950'
                  }`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'h3':
            return (
              <View key={idx} className="my-0.5">
                <Text
                  className={`text-[13.5px] font-bold ${
                    isUser ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'bullet':
            return (
              <View
                key={idx}
                className="flex flex-row items-start space-x-2 my-1 pl-0.5"
              >
                <View
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    isUser ? 'bg-white' : 'bg-[#76bc21]'
                  }`}
                />
                <Text
                  className={`text-[13.5px] leading-relaxed flex-1 ${
                    isUser ? 'text-white font-medium' : 'text-gray-800'
                  }`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'numbered':
            return (
              <View
                key={idx}
                className="flex flex-row items-start space-x-1.5 my-1 pl-0.5"
              >
                <Text
                  className={`text-[12.5px] font-bold flex-shrink-0 mt-0.5 ${
                    isUser ? 'text-white' : 'text-[#5ea315]'
                  }`}
                >
                  {block.num}
                </Text>
                <Text
                  className={`text-[13.5px] leading-relaxed flex-1 ${
                    isUser ? 'text-white font-medium' : 'text-gray-800'
                  }`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'quote':
            return (
              <View
                key={idx}
                className={`my-1 pl-2.5 py-1 border-l-2 rounded-r ${
                  isUser
                    ? 'border-white/60 bg-white/10 text-white'
                    : 'border-[#76bc21] bg-emerald-50/40 text-gray-700'
                }`}
              >
                <Text className="text-[12.5px] italic leading-relaxed">
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          case 'hr':
            return (
              <View
                key={idx}
                className={`h-px my-2 ${isUser ? 'bg-white/30' : 'bg-gray-200'}`}
              />
            )
          case 'codeblock':
            return (
              <View
                key={idx}
                className={`my-1.5 p-2.5 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto ${
                  isUser
                    ? 'bg-black/20 text-white border border-white/20'
                    : 'bg-gray-900 text-emerald-400 border border-gray-800 shadow-inner'
                }`}
              >
                {block.lang && (
                  <Text className="text-[9px] uppercase font-bold text-gray-400 block mb-1">
                    {block.lang}
                  </Text>
                )}
                <Text className="whitespace-pre font-mono text-[11px]">
                  {block.content}
                </Text>
              </View>
            )
          case 'spacer':
            return <View key={idx} className="h-1.5" />
          case 'paragraph':
          default: {
            const isPureTitle =
              block.content &&
              block.content.trim().startsWith('**') &&
              block.content.trim().endsWith('**') &&
              !block.content.trim().slice(2, -2).includes('**')
            return (
              <View key={idx} className={isPureTitle ? 'mt-2 mb-1' : 'my-0.5'}>
                <Text
                  className={`text-[13.5px] leading-relaxed ${
                    isPureTitle ? 'font-bold text-[14px]' : ''
                  } ${isUser ? 'text-white font-medium' : 'text-gray-800 font-normal'}`}
                >
                  {renderInline(block.content)}
                </Text>
              </View>
            )
          }
        }
      })}
    </View>
  )
}
