
import React from "react";

type AlbumDetailsCardProps = {
  title: string;
  desc: string;
  tech?: string[];
  href?: string;
};

export default function AlbumDetailsCard({
  title,
  desc,
  tech,
  href,
}: AlbumDetailsCardProps) {
  return (
    <div className="mt-10 mx-auto max-w-md neu-card py-8 px-7 animate-fade-in-up">
      <h3 className="text-2xl font-bold gradient-text mb-2">{title}</h3>
      <p className="text-gray-200 mb-2">{desc}</p>
      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {tech.map((t) => (
            <span key={t} className="bg-blue-glow/10 text-blue-glow text-xs px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      )}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 underline underline-offset-4 text-blue-glow hover:text-blue-400 font-semibold transition"
        >
          See Project &rarr;
        </a>
      )}
    </div>
  );
}
