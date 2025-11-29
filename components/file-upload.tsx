"use client";

import { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileLoaded: (content: string, fileName: string) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileLoaded, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        alert("Please upload a CSV file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileName(file.name);
        onFileLoaded(content, file.name);
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleClear = useCallback(() => {
    setFileName(null);
  }, []);

  if (fileName) {
    return (
      <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
        <FileSpreadsheet className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium flex-1 truncate">{fileName}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleClear}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging && !disabled
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleInputChange}
        className="hidden"
        id="csv-upload"
        disabled={disabled}
      />
      <label
        htmlFor="csv-upload"
        className={cn(
          "flex flex-col items-center gap-2",
          !disabled && "cursor-pointer"
        )}
      >
        <Upload className="h-10 w-10 text-muted-foreground" />
        <div className="text-sm">
          <span className="font-semibold text-primary">Click to upload</span>
          {" or drag and drop"}
        </div>
        <p className="text-xs text-muted-foreground">CSV files only</p>
      </label>
    </div>
  );
}
