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
    let isMounted = true;
    if (ref.current && chart) {
      // Mermaid can occasionally fail on complex AI outputs. We parse it safely.
      mermaid.render('mermaid-svg-' + Math.random().toString(36).substring(7), chart).then((result) => {
        if (isMounted && ref.current) ref.current.innerHTML = result.svg;
      }).catch(e => {
        console.error("Mermaid error", e);
        if (isMounted && ref.current) {
          ref.current.innerHTML = '<div style="color: #ef4444; background: #fee2e2; padding: 1rem; border-radius: 0.5rem; font-size: 0.9rem; text-align: center;"><em>The AI generated an overly complex diagram that could not be rendered. Please ask for a simpler explanation.</em></div>';
        }
        // Remove Mermaid's global error overlay if it injects one
        const errorOverlay = document.querySelector('body > pre[style*="position: absolute"]');
        if (errorOverlay) errorOverlay.remove();
        const errorSvg = document.querySelector(`#${e.hash}`);
        if (errorSvg) errorSvg.remove();
      });
    }
    return () => { isMounted = false; };
  }, [chart]);

  return <div className="mermaid-diagram fade-in" ref={ref} aria-label="Generated Diagram" role="img" />;
};
