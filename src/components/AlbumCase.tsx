
import React from "react";

type AlbumCaseProps = {
  image: string;
  title: string;
  active: boolean;
  onClick?: () => void;
};

export default function AlbumCase({ image, title, active, onClick }: AlbumCaseProps) {
  return (
    <div
      className={`album-case group cursor-pointer select-none transition-transform duration-300
        ${active ? "album-case-active" : ""}
      `}
      tabIndex={0}
      onClick={onClick}
      aria-label={title}
      style={{ perspective: "1200px", touchAction: "none" }}
    >
      <div className="album-case-inner">
        <img
          src={image}
          alt={title}
          draggable={false}
          className="album-case-art"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            userSelect: "none",
          }}
        />
        {/* Case overlay shine */}
        <div className="album-case-shine" />
      </div>
      <div className="album-case-title mt-3 text-lg font-bold text-white shadow-md text-center">
        {title}
      </div>
    </div>
  );
}
