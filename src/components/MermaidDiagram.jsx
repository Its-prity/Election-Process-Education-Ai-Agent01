import React, { useRef, useEffect } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Outfit, sans-serif'
});

export const MermaidDiagram = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.render('mermaid-svg-' + Math.random().toString(36).substring(7), chart).then((result) => {
        if (ref.current) ref.current.innerHTML = result.svg;
      }).catch(e => {
        console.error("Mermaid error", e);
      });
    }
  }, [chart]);

  return <div className="mermaid-diagram fade-in" ref={ref} aria-label="Generated Diagram" role="img" />;
};
