import { ZoomIn, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSite } from "../../hooks/useSite";

type ZoomProps = {
  src: string;
  alt: string;
};

const Zoom = ({ src, alt }: ZoomProps) => {
  const site = useSite();
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!previewOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [previewOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        aria-label={site.accessibility.enlargeImage}
        className="absolute bottom-3 right-3 z-10 rounded-lg
        bg-black p-2 text-white backdrop-blur-sm
        transition-colors hover:bg-black/70 hover:translateX-60"
      >
        <ZoomIn size={22} strokeWidth={1.75} />
      </button>

      {previewOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex
            items-center justify-center bg-black/85 p-4"
            onClick={() => setPreviewOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${alt} — ${site.accessibility.imagePreview}`}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[80vh] max-w-[85vw]
                rounded-xl object-contain"
              />

              <button
                type="button"
                autoFocus
                onClick={() => setPreviewOpen(false)}
                aria-label={site.accessibility.closePreview}
                className="absolute top-3 right-3 rounded-lg
                bg-black/60 p-2 text-white
                hover:bg-black/80"
              >
                <X size={20} />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Zoom;
