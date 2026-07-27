"use client";

import React, { useState, useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Note } from "@/types/workspace";
import { Plus, Trash2, ArrowLeft, FileText, Sparkles, Clock, Hash } from "lucide-react";

export function NoteEditor() {
  const { notes, activeProjectId, addNote, updateNote, deleteNote } =
    useWorkspaceStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const projectNotes = notes.filter((n) => n.projectId === activeProjectId);

  const handleStartNewNote = () => {
    setEditingNoteId(null);
    setTitle("");
    setBody("");
    setIsEditing(true);
  };

  const handleStartEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setBody(note.body);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!title.trim() && !body.trim()) return;

    if (editingNoteId) {
      updateNote(editingNoteId, { title, body });
    } else if (activeProjectId) {
      addNote({
        projectId: activeProjectId,
        title: title || "Untitled Note",
        body,
      });
    }
    setIsEditing(false);
    setEditingNoteId(null);
    setTitle("");
    setBody("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingNoteId(null);
    setTitle("");
    setBody("");
  };

  // Debounced auto-save for existing notes in edit mode
  useEffect(() => {
    if (!isEditing || !editingNoteId) return;

    const timer = setTimeout(() => {
      updateNote(editingNoteId, { title, body });
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, body, isEditing, editingNoteId, updateNote]);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const charCount = body.length;

  if (isEditing) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Notes</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 bg-black/40 border border-white/10 rounded-2xl p-6 shadow-inner">
          <input
            type="text"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-bold text-white focus:outline-none focus:border-accent transition-all placeholder:text-white/20 tracking-tight"
          />

          <textarea
            placeholder="Write markdown or context notes here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[340px] bg-transparent text-sm text-white/90 focus:outline-none transition-all resize-y placeholder:text-white/20 leading-relaxed font-sans"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 px-2">
          <span className="flex items-center gap-2">
            <Hash className="w-3.5 h-3.5 text-accent" />
            {wordCount} words &bull; {charCount} characters
          </span>
          {editingNoteId && (
            <span className="flex items-center gap-1.5 text-accent/80 font-mono text-[11px]">
              <Clock className="w-3 h-3" /> Auto-saving enabled
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Context Notes
          </h3>
          <p className="text-xs text-white/50">Architecture docs, setup notes, and decisions for this workspace.</p>
        </div>
        <button
          onClick={handleStartNewNote}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" /> New Note
        </button>
      </div>

      {projectNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-14 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <div className="p-4 rounded-2xl bg-white/5 text-white/30 mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">No notes saved yet</p>
          <p className="text-xs text-white/40 mb-5 max-w-xs">
            Scaffold architectural specs, env variable mappings, or design decisions linked to this project.
          </p>
          <button
            onClick={handleStartNewNote}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all border border-white/10"
          >
            <Plus className="w-4 h-4" /> Create Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleStartEditNote(note)}
              className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-accent/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                    {note.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all shrink-0"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-sans">
                  {note.body || "(Empty note content)"}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/40 pt-4 border-t border-white/5 mt-4">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/60 font-mono">
                  {note.wordCount} words
                </span>
                <span>{new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function NotesPanel() {
  return <NoteEditor />;
}

