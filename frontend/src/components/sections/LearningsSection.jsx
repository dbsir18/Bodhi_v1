import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lightbulb, ArrowLeft } from 'lucide-react';
import { learnings as rawLearnings } from '../../data/mock';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { slugify } from '../../App';

const learnings = [...rawLearnings].reverse();

const proseClasses = `prose dark:prose-invert max-w-none
  prose-p:text-[15px] prose-p:leading-[1.85] prose-p:text-stone-700 dark:prose-p:text-stone-300 prose-p:mb-6
  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-stone-100
  prose-h1:text-2xl prose-h1:mb-6
  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone-200 dark:prose-h2:border-stone-700
  prose-strong:text-stone-900 dark:prose-strong:text-stone-100 prose-strong:font-semibold
  prose-em:text-stone-600 dark:prose-em:text-stone-400
  prose-blockquote:border-l-[3px] prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/60 dark:prose-blockquote:bg-amber-950/20 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-stone-600 dark:prose-blockquote:text-stone-400
  prose-hr:border-none prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-stone-300 dark:prose-hr:via-stone-600 prose-hr:to-transparent prose-hr:my-10
  prose-li:text-[15px] prose-li:text-stone-700 dark:prose-li:text-stone-300 prose-li:leading-[1.85]
  prose-table:text-sm prose-th:text-stone-700 dark:prose-th:text-stone-300
  prose-code:text-amber-700 dark:prose-code:text-amber-300 prose-code:bg-amber-50 dark:prose-code:bg-amber-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
  prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:underline-offset-2 prose-a:decoration-amber-300 dark:prose-a:decoration-amber-700`;

const LearningsSection = ({ articleSlug, onArticleChange }) => {
  const [selectedLearning, setSelectedLearning] = useState(null);

  // Sync with URL slug
  useEffect(() => {
    if (articleSlug) {
      const found = learnings.find(l => slugify(l.title) === articleSlug);
      if (found) setSelectedLearning(found);
    } else {
      setSelectedLearning(null);
    }
  }, [articleSlug]);

  const selectLearning = (learning) => {
    setSelectedLearning(learning);
    onArticleChange?.(slugify(learning.title));
  };

  const clearSelection = () => {
    setSelectedLearning(null);
    onArticleChange?.(null);
  };

  if (learnings.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 dark:text-stone-500">
        <div className="text-center">
          <p className="text-lg mb-1">Learnings</p>
          <p className="text-sm">Coming soon</p>
        </div>
      </div>
    );
  }

  const renderCoverImage = (item) => (
    <div className="relative shrink-0">
      <img
        src={item.coverImage}
        alt={item.title}
        className="w-full max-h-[40vh] object-contain"
      />
      {/* Stronger gradient so white text always pops */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
      <div className="absolute bottom-5 left-8 right-8">
        <h2 className="text-2xl font-bold text-white tracking-tight" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{item.title}</h2>
        <p className="text-white/70 text-sm mt-1.5 font-light">{item.date}</p>
      </div>
    </div>
  );

  const stripLeadingTitle = (content) =>
    content?.replace(/^#[^\n]*\n+/, '') ?? content;

  const renderArticle = (learning) => (
    <>
      {learning.coverImage ? renderCoverImage(learning) : (
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-2 shrink-0">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">{learning.title}</h2>
          <p className="text-stone-400 text-sm mt-1.5">{learning.date}</p>
        </div>
      )}
      <div className={`px-6 md:px-8 py-6 ${proseClasses}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {learning.coverImage
            ? stripLeadingTitle(learning.content)
            : learning.content}
        </ReactMarkdown>
      </div>
    </>
  );

  // Mobile: two-step flow (card list → article)
  const renderMobile = () => {
    if (selectedLearning) {
      return (
        <div className="flex flex-col h-full bg-white dark:bg-stone-900/60">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200/80 dark:border-stone-700/60 shrink-0">
            <button onClick={clearSelection} className="p-1 -ml-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
              <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            </button>
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate">{selectedLearning.title}</span>
          </div>
          <ScrollArea className="flex-1">
            {renderArticle(selectedLearning)}
          </ScrollArea>
        </div>
      );
    }

    return (
      <ScrollArea className="h-full">
        <div className="p-4 space-y-3">
          {learnings.map((learning) => (
            <div
              key={learning.id}
              onClick={() => selectLearning(learning)}
              className="rounded-xl overflow-hidden cursor-pointer bg-stone-50 dark:bg-stone-800/60 shadow-sm hover:shadow-md transition-shadow"
            >
              {learning.coverImage && (
                <img src={learning.coverImage} alt={learning.title} className="w-full h-36 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-0">
                    {learning.category}
                  </Badge>
                  <span className="text-xs text-stone-400">{learning.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-stone-800 dark:text-stone-200">{learning.title}</h4>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 line-clamp-3 leading-relaxed">{learning.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  // Desktop: existing two-pane layout
  const renderDesktop = () => (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 border-r border-stone-200 dark:border-stone-700/60 bg-[#f7f5f2] dark:bg-stone-900/40 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-2 pt-3">
            {learnings.map((learning) => {
              const isActive = selectedLearning?.id === learning.id;
              return (
                <div
                  key={learning.id}
                  onClick={() => selectLearning(learning)}
                  className={`rounded-xl cursor-pointer mb-1.5 overflow-hidden transition-all duration-150 ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 shadow-md ring-1 ring-amber-200 dark:ring-amber-800/40'
                      : 'hover:bg-white/70 dark:hover:bg-stone-800/60 hover:shadow-sm'
                  }`}
                >
                  {/* Thumbnail if cover exists */}
                  {learning.coverImage && (
                    <div className="h-24 overflow-hidden">
                      <img src={learning.coverImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-0">
                        {learning.category}
                      </Badge>
                      <span className="text-xs text-stone-400">{learning.date}</span>
                    </div>
                    <h4 className={`font-medium text-sm line-clamp-2 ${isActive ? 'text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}`}>{learning.title}</h4>
                    {!learning.coverImage && (
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 line-clamp-2 leading-relaxed">{learning.excerpt}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      {/* Reading pane */}
      <div className="flex-1 flex flex-col bg-white dark:bg-stone-900/60">
        {selectedLearning ? (
          <ScrollArea className="flex-1">
            {renderArticle(selectedLearning)}
          </ScrollArea>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-amber-400 dark:text-amber-500" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Pick something to read</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Select a piece from the left</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full md:hidden">{renderMobile()}</div>
      <div className="h-full hidden md:block">{renderDesktop()}</div>
    </>
  );
};

export default LearningsSection;
