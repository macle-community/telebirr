(() => {
  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[character];
    });

  const resolveSourceLink = (href, day) => {
    try {
      const sourcePage =
        `https://github.com/macle-community/telebirr/blob/main/` +
        `master-class/course-materials/lessons/day-${String(day).padStart(2, "0")}.md`;
      const resolved = new URL(href, sourcePage);
      return ["http:", "https:"].includes(resolved.protocol) ? resolved.href : null;
    } catch {
      return null;
    }
  };

  const renderInline = (value, day) => {
    const code = [];
    const withCodeTokens = value.replace(/`([^`]+)`/g, (_match, contents) => {
      const token = `\uE000${code.length}\uE001`;
      code.push(`<code>${escapeHtml(contents)}</code>`);
      return token;
    });
    let html = escapeHtml(withCodeTokens);

    html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_match, alt, href) => {
      const safeHref = resolveSourceLink(href, day);
      return safeHref
        ? `<img src="${escapeHtml(safeHref)}" alt="${escapeHtml(alt)}" loading="lazy">`
        : escapeHtml(_match);
    });
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_match, label, href) => {
      const safeHref = resolveSourceLink(href, day);
      return safeHref
        ? `<a href="${escapeHtml(safeHref)}" target="_blank" rel="noopener noreferrer">${renderInline(label, day)}</a>`
        : escapeHtml(_match);
    });
    html = html
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>");
    return html.replace(/\uE000(\d+)\uE001/g, (_match, index) => code[Number(index)]);
  };

  const isListItem = (line) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(line);
  const isBlockStart = (line) =>
    /^(?:#{1,6}\s|```|>|(?:[-*_]\s*){3,}$|\s*\|.*\|\s*$|<(?:Button|Input)\b)/.test(line) ||
    isListItem(line);

  const splitTableRow = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const renderMarkdown = (markdown, day) => {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const blocks = [];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index];
      const trimmed = line.trim();

      if (!trimmed) {
        index += 1;
        continue;
      }

      if (trimmed.startsWith("```")) {
        const language = trimmed.slice(3).trim().match(/^[a-zA-Z0-9_-]+/)?.[0] ?? "";
        const code = [];
        index += 1;
        while (index < lines.length && !lines[index].trim().startsWith("```")) {
          code.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) index += 1;
        const languageClass = language ? ` class="language-${language}"` : "";
        blocks.push(`<pre><code${languageClass}>${escapeHtml(code.join("\n"))}</code></pre>`);
        continue;
      }

      const jsxStart = trimmed.match(/^<(Button|Input)\b/);
      if (jsxStart) {
        const tag = jsxStart[1];
        const code = [];
        while (index < lines.length) {
          code.push(lines[index]);
          const current = lines[index];
          index += 1;
          if (current.includes(`</${tag}>`) || current.includes("/>")) break;
        }
        blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        continue;
      }

      const heading = trimmed.match(/^(#{1,6})\s+(.+?)\s*#*$/);
      if (heading) {
        const level = heading[1].length;
        blocks.push(`<h${level}>${renderInline(heading[2], day)}</h${level}>`);
        index += 1;
        continue;
      }

      if (/^(?:[-*_]\s*){3,}$/.test(trimmed)) {
        blocks.push("<hr>");
        index += 1;
        continue;
      }

      if (trimmed.startsWith(">")) {
        const quote = [];
        while (index < lines.length && lines[index].trim().startsWith(">")) {
          quote.push(lines[index].trim().replace(/^>\s?/, ""));
          index += 1;
        }
        blocks.push(`<blockquote>${renderMarkdown(quote.join("\n"), day)}</blockquote>`);
        continue;
      }

      if (
        trimmed.startsWith("|") &&
        index + 1 < lines.length &&
        /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
      ) {
        const headers = splitTableRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].trim().startsWith("|")) {
          rows.push(splitTableRow(lines[index]));
          index += 1;
        }
        const headerHtml = headers.map((cell) => `<th>${renderInline(cell, day)}</th>`).join("");
        const bodyHtml = rows
          .map((row) => `<tr>${headers.map((_header, column) => `<td>${renderInline(row[column] ?? "", day)}</td>`).join("")}</tr>`)
          .join("");
        blocks.push(`<div class="table-scroll"><table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`);
        continue;
      }

      if (isListItem(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const tag = ordered ? "ol" : "ul";
        const items = [];
        while (index < lines.length) {
          const current = lines[index];
          const marker = current.match(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/);
          if (!marker || /^\s*\d+[.)]\s+/.test(current) !== ordered) break;
          const contents = [marker[1].trim()];
          index += 1;
          while (index < lines.length && /^\s{2,}\S/.test(lines[index]) && !isListItem(lines[index])) {
            contents.push(lines[index].trim());
            index += 1;
          }
          items.push(`<li>${renderInline(contents.join(" "), day)}</li>`);
        }
        blocks.push(`<${tag}>${items.join("")}</${tag}>`);
        continue;
      }

      const paragraph = [];
      while (index < lines.length && lines[index].trim() && !(paragraph.length && isBlockStart(lines[index].trim()))) {
        paragraph.push(lines[index]);
        index += 1;
      }
      const paragraphHtml = paragraph
        .map((part) => renderInline(part.trim(), day))
        .reduce((content, part, partIndex) => {
          if (partIndex === 0) return part;
          return `${content}${paragraph[partIndex - 1].endsWith("  ") ? "<br>" : " "}${part}`;
        }, "");
      blocks.push(`<p>${paragraphHtml}</p>`);
    }

    return blocks.join("\n");
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { renderMarkdown };
  }

  if (typeof document === "undefined") return;

  const homeContent = document.querySelector("#home-content");
  const lessonView = document.querySelector("#lesson-view");
  const lessonStatus = document.querySelector("#lesson-status");
  const lessonPosition = document.querySelector("#lesson-position");
  const lessonContent = document.querySelector("#lesson-content");
  const previousLesson = document.querySelector("#previous-lesson");
  const nextLesson = document.querySelector("#next-lesson");
  let latestLoad = 0;

  const setLessonNavigation = (link, day, label) => {
    if (day < 1 || day > 30) {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");
      return;
    }
    link.href = `#lesson/day-${String(day).padStart(2, "0")}`;
    link.setAttribute("aria-disabled", "false");
    link.textContent = label;
  };

  const showCourseHome = () => {
    latestLoad += 1;
    homeContent.hidden = false;
    lessonView.hidden = true;
    document.title = "Macle Mini App Masterclass";
  };

  const showLesson = async (day) => {
    const loadId = ++latestLoad;
    homeContent.hidden = true;
    lessonView.hidden = false;
    lessonStatus.hidden = false;
    lessonStatus.textContent = "Loading lesson…";
    lessonContent.replaceChildren();
    lessonPosition.textContent = `Day ${day} of 30`;
    setLessonNavigation(previousLesson, day - 1, "← Previous lesson");
    setLessonNavigation(nextLesson, day + 1, "Next lesson →");
    document.title = `Day ${day} · Macle Mini App Masterclass`;
    window.scrollTo(0, 0);

    try {
      const filename = `day-${String(day).padStart(2, "0")}.md`;
      const response = await fetch(`./lessons/${filename}`);
      if (!response.ok) {
        throw new Error(`The lesson file could not be loaded (HTTP ${response.status}).`);
      }
      const markdown = await response.text();
      if (loadId !== latestLoad) return;
      lessonContent.innerHTML = renderMarkdown(markdown, day);
      lessonStatus.hidden = true;
      const heading = lessonContent.querySelector("h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    } catch (error) {
      if (loadId !== latestLoad) return;
      lessonStatus.textContent = `Unable to load Day ${day}: ${error.message} Please try again later.`;
      document.title = `Lesson unavailable · Macle Mini App Masterclass`;
    }
  };

  const renderRoute = () => {
    const match = window.location.hash.match(/^#lesson\/day-(\d{2})$/);
    const day = match ? Number(match[1]) : 0;
    if (day >= 1 && day <= 30) {
      showLesson(day);
    } else {
      showCourseHome();
    }
  };

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
})();
