"use client";

import { useEffect, useRef } from "react";
import { Topic } from "@/lib/subjects";

interface MindMapProps {
  topic: Topic;
}

export function MindMap({ topic }: MindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Define gradient for nodes
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <linearGradient id="centralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#facc15;stop-opacity:0.9" />
      </linearGradient>
      <linearGradient id="subtopicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#fef9c3;stop-opacity:0.9" />
      </linearGradient>
      <filter id="dropShadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    `;
    svg.appendChild(defs);

    // Create central topic node
    const centralNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    centralNode.innerHTML = `
      <circle 
        cx="${centerX}" 
        cy="${centerY}" 
        r="70" 
        fill="url(#centralGradient)"
        stroke="#eab308"
        stroke-width="2"
        filter="url(#dropShadow)"
      />
      <text 
        x="${centerX}" 
        y="${centerY}" 
        class="text-base font-bold" 
        fill="#000000"
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${topic.title}
      </text>
    `;
    svg.appendChild(centralNode);

    // Create animated pulse effect for central node
    const pulseCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    pulseCircle.setAttribute("cx", centerX.toString());
    pulseCircle.setAttribute("cy", centerY.toString());
    pulseCircle.setAttribute("r", "70");
    pulseCircle.setAttribute("fill", "none");
    pulseCircle.setAttribute("stroke", "#fbbf24");
    pulseCircle.setAttribute("stroke-width", "2");
    pulseCircle.setAttribute("opacity", "0");
    pulseCircle.innerHTML = `
      <animate
        attributeName="r"
        from="70"
        to="80"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.6"
        to="0"
        dur="1.5s"
        repeatCount="indefinite"
      />
    `;
    svg.appendChild(pulseCircle);

    // Create subtopic nodes with curved connections
    topic.subtopics.forEach((subtopic, index) => {
      const angle = (index * 2 * Math.PI) / topic.subtopics.length;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Create curved connection line
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const controlX = centerX + radius * 0.5 * Math.cos(angle);
      const controlY = centerY + radius * 0.5 * Math.sin(angle);

      line.setAttribute(
        "d",
        `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${x} ${y}`
      );
      line.setAttribute("stroke", "#fbbf24");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("fill", "none");
      line.setAttribute("opacity", "0.6");
      svg.appendChild(line);

      // Create subtopic node with hover effect
      const subtopicNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      subtopicNode.innerHTML = `
        <circle 
          cx="${x}" 
          cy="${y}" 
          r="55" 
          fill="url(#subtopicGradient)"
          stroke="#fbbf24"
          stroke-width="2"
          filter="url(#dropShadow)"
          class="transition-transform duration-300 hover:scale-110"
        >
          <animate
            attributeName="r"
            from="55"
            to="55"
            dur="0.3s"
            begin="mouseover"
            fill="freeze"
          />
        </circle>
        <text 
          x="${x}" 
          y="${y}" 
          class="text-sm font-medium" 
          fill="#000000"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${subtopic.title}
        </text>
      `;
      svg.appendChild(subtopicNode);

      // Add description on hover
      const descriptionText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      descriptionText.setAttribute("x", x.toString());
      descriptionText.setAttribute("y", (y + 70).toString());
      descriptionText.setAttribute("text-anchor", "middle");
      descriptionText.setAttribute("fill", "#666666");
      descriptionText.setAttribute("font-size", "12");
      descriptionText.setAttribute("opacity", "0");
      descriptionText.textContent = subtopic.description;

      subtopicNode.addEventListener("mouseenter", () => {
        descriptionText.setAttribute("opacity", "1");
      });

      subtopicNode.addEventListener("mouseleave", () => {
        descriptionText.setAttribute("opacity", "0");
      });

      svg.appendChild(descriptionText);
    });
  }, [topic]);

  return (
    <div className="w-full overflow-x-auto bg-gray-50 rounded-xl p-4">
      <svg
        ref={svgRef}
        width="800"
        height="600"
        className="mx-auto"
        viewBox="0 0 800 600"
      />
    </div>
  );
}

export default MindMap;
