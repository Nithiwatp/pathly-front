"use client";
import { useState } from "react";

const MindMapComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [mindMapSummary, setMindMapSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function generateMindMapSummary(text: string): Promise<string> {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate mind map summary");
    }

    const data = await response.json();
    return data.mindMapSummary; // Update to return mind map summary
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const generatedMindMap = await generateMindMapSummary(inputText);
      setMindMapSummary(generatedMindMap);
    } catch (err) {
      setError("Failed to generate mind map summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to generate mind map summary"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Mind Map"}
        </button>
      </form>
      {mindMapSummary && (
        <div>
          <h3>Mind Map Summary:</h3>
          <pre>{mindMapSummary}</pre> {/* Using <pre> to preserve formatting */}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default MindMapComponent;
