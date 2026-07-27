"use client";

import React, { useState, useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Note } from "@/types/workspace";
import { Plus, Trash2, Edit3, ArrowLeft, FileText } from "lucide-react";

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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Notes
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
            >
              Save Note
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Note Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border-b border-white/10 pb-2 text-xl font-bold text-white focus:outline-none focus:border-accent transition-all placeholder:text-white/30"
        />

        <textarea
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full min-h-[300px] bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white/90 focus:outline-none focus:border-accent transition-all resize-y placeholder:text-white/30"
        />

        <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/5">
          <span>
            {wordCount} words | {charCount} characters
          </span>
          {editingNoteId && <span>Auto-saving enabled (2s debounce)</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">
          Notes ({projectNotes.length})
        </h3>
        <button
          onClick={handleStartNewNote}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-3.5 h-3.5" /> New Note
        </button>
      </div>

      {projectNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-xl">
          <FileText className="w-10 h-10 text-white/20 mb-3" />
          <p className="text-sm text-white/60 mb-1">No notes yet</p>
          <p className="text-xs text-white/40 mb-4">
            Create notes linked to this project to keep your ideas organized.
          </p>
          <button
            onClick={handleStartNewNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> New Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleStartEditNote(note)}
              className="group relative p-4 rounded-xl bg-black/20 border border-white/10 hover:border-accent/40 cursor-pointer transition-all hover:shadow-lg hover:shadow-accent/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                    {note.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-red-400 rounded transition-all"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-white/60 line-clamp-3 mb-4 leading-relaxed">
                  {note.body || "(Empty note)"}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/5">
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/60 font-medium">
                  {note.wordCount} words
                </span>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
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
