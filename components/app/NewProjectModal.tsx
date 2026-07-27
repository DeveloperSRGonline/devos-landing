"use client";

import React from "react";
import { 
  FolderGit2, 
  Server, 
  Shield, 
  Zap, 
  BookOpen, 
  Code2, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: { name: string; color: string; icon: string }) => void;
}

const colorPresets = [
  "#3B82F6", // Blue
  "#22C55E", // Green
  "#A855F7", // Purple
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#06B6D4", // Cyan
];

const iconOptions = [
  { name: "FolderGit2", icon: FolderGit2 },
  { name: "Server", icon: Server },
  { name: "Shield", icon: Shield },
  { name: "Zap", icon: Zap },
  { name: "BookOpen", icon: BookOpen },
  { name: "Code2", icon: Code2 },
];

export function NewProjectModal({ isOpen, onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState(colorPresets[0]);
  const [selectedIcon, setSelectedIcon] = React.useState(iconOptions[0].name);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      color: selectedColor,
      icon: selectedIcon,
    });
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
              Project Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. user-auth-service"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    selectedColor === color ? "scale-115 ring-2 ring-white ring-offset-2 ring-offset-surface" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Icon Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
              Project Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = selectedIcon === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedIcon(opt.name)}
                    className={`flex items-center justify-center p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
