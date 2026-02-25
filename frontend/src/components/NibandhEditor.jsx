import React, { useCallback, useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { 
  $getRoot, 
  $getSelection,
  $createParagraphNode,
  $createTextNode,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND
} from 'lexical';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Undo, 
  Redo,
  Save,
  FileText,
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const theme = {
  paragraph: 'mb-2',
  heading: {
    h1: 'text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100',
    h2: 'text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100',
    h3: 'text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100',
  },
  list: {
    ul: 'list-disc ml-4 mb-2',
    ol: 'list-decimal ml-4 mb-2',
    listitem: 'mb-1',
  },
  quote: 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-2',
  code: 'bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm',
  link: 'text-blue-500 hover:text-blue-600 underline',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 dark:bg-gray-800 rounded px-1 font-mono text-sm',
  },
};

function onError(error) {
  console.error(error);
}

// Toolbar Plugin
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('bold')}
        className="h-8 w-8 p-0"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('italic')}
        className="h-8 w-8 p-0"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('underline')}
        className="h-8 w-8 p-0"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('code')}
        className="h-8 w-8 p-0"
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Auto-save Plugin
function AutoSavePlugin({ onSave, docId }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const saveInterval = setInterval(() => {
      editor.getEditorState().read(() => {
        const content = JSON.stringify(editor.getEditorState().toJSON());
        onSave(docId, content);
      });
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [editor, onSave, docId]);

  return null;
}

const NibandhEditor = () => {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('nibandh-docs');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome to Nibandh', content: null, updatedAt: new Date().toISOString() }
    ];
  });
  const [activeDocId, setActiveDocId] = useState(documents[0]?.id || '1');
  const [isSaved, setIsSaved] = useState(true);

  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];

  const initialConfig = {
    namespace: 'Nibandh',
    theme,
    onError,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      CodeNode,
    ],
  };

  const saveDocument = useCallback((docId, content) => {
    setDocuments(prev => {
      const updated = prev.map(doc => 
        doc.id === docId 
          ? { ...doc, content, updatedAt: new Date().toISOString() }
          : doc
      );
      localStorage.setItem('nibandh-docs', JSON.stringify(updated));
      return updated;
    });
    setIsSaved(true);
  }, []);

  const createNewDocument = () => {
    const newDoc = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: null,
      updatedAt: new Date().toISOString()
    };
    setDocuments(prev => {
      const updated = [...prev, newDoc];
      localStorage.setItem('nibandh-docs', JSON.stringify(updated));
      return updated;
    });
    setActiveDocId(newDoc.id);
  };

  const deleteDocument = (docId) => {
    if (documents.length <= 1) return;
    setDocuments(prev => {
      const updated = prev.filter(d => d.id !== docId);
      localStorage.setItem('nibandh-docs', JSON.stringify(updated));
      if (activeDocId === docId) {
        setActiveDocId(updated[0]?.id);
      }
      return updated;
    });
  };

  const updateTitle = (docId, newTitle) => {
    setDocuments(prev => {
      const updated = prev.map(doc =>
        doc.id === docId ? { ...doc, title: newTitle } : doc
      );
      localStorage.setItem('nibandh-docs', JSON.stringify(updated));
      return updated;
    });
  };

  const onChange = () => {
    setIsSaved(false);
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Documents</span>
          <Button variant="ghost" size="sm" onClick={createNewDocument} className="h-7 w-7 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {documents.map(doc => (
              <div
                key={doc.id}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  activeDocId === doc.id 
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveDocId(doc.id)}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate flex-1">{doc.title}</span>
                {documents.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteDocument(doc.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-opacity"
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Title Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={activeDoc?.title || ''}
            onChange={(e) => updateTitle(activeDocId, e.target.value)}
            placeholder="Untitled"
            className="text-2xl font-bold w-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs ${isSaved ? 'text-green-500' : 'text-yellow-500'}`}>
              {isSaved ? '✓ Saved' : '• Unsaved changes'}
            </span>
            <span className="text-xs text-gray-400">
              Last updated: {activeDoc?.updatedAt ? new Date(activeDoc.updatedAt).toLocaleString() : 'Never'}
            </span>
          </div>
        </div>

        {/* Lexical Editor */}
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <div className="flex-1 relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="h-full p-4 outline-none text-gray-700 dark:text-gray-200 prose dark:prose-invert max-w-none" />
              }
              placeholder={
                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                  Start writing... Use Markdown shortcuts like # for headings, ** for bold, etc.
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
          <AutoSavePlugin onSave={saveDocument} docId={activeDocId} />
        </LexicalComposer>
      </div>
    </div>
  );
};

export default NibandhEditor;
