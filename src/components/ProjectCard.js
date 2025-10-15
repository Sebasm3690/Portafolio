import { LuExternalLink, LuGithub, LuVideo, LuBadgeCheck } from "react-icons/lu";

function Pill({ children }) {
  return (
    <span className="inline-block rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs leading-5 text-neutral-300">
      {children}
    </span>
  );
}

export default function ProjectCard({ p }) {
  return (
    <article
      className={
        "project-card group h-full rounded-2xl border border-neutral-800 bg-neutral-900 p-5 " +
        "text-left text-neutral-200 shadow-sm transform-gpu transition duration-200 " +
        "hover:scale-[1.01] hover:shadow-md [&_p]:!text-left [&_li]:!text-left"
      }
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* 🧱 BLOQUE PRE-IMAGEN con altura reservada */}
      <div className="space-y-3 min-h-[170px] md:min-h-[190px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
          {p.context && (
            <span className="shrink-0 text-sm text-neutral-400 whitespace-nowrap text-right">
              {p.context}
            </span>
          )}
        </div>

        {/* Descripción con clamp para que todas ocupen el mismo alto */}
        {p.short && (
          <p
            className="text-sm text-neutral-400 max-w-[52ch] !text-left leading-6
                       overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
          >
            {p.short}
          </p>
        )}
      </div>

      {/* Imagen (quedará alineada porque arriba ya tenemos una altura uniforme) */}
      {p.image && (
        <a
          href={p.links?.caseStudy ?? p.links?.live ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block overflow-hidden rounded-xl"
        >
          <img
            src={p.image}
            alt={`Captura del proyecto ${p.title}`}
            loading="lazy"
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>
      )}

      {/* Stack */}
      {Array.isArray(p.stack) && p.stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((t, i) => (
            <Pill key={i}>{t}</Pill>
          ))}
        </div>
      )}

      {/* Bullets */}
      {Array.isArray(p.results) && p.results.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
          {p.results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
        {p.links?.live && (
          <a
            href={p.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuExternalLink size={16} /> Live
          </a>
        )}

        {/* Repo único */}
        {p.links?.repo && (
          <a
            href={p.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuGithub size={16} /> Repo
          </a>
        )}

        {/* Repos separados */}
        {p.links?.repoFront && (
          <a
            href={p.links.repoFront}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuGithub size={16} /> Repo (Front)
          </a>
        )}
        {p.links?.repoBack && (
          <a
            href={p.links.repoBack}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuGithub size={16} /> Repo (Back)
          </a>
        )}

        {/* Alternativa: lista de repos etiquetados */}
        {Array.isArray(p.links?.repos) &&
          p.links.repos.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-300 hover:text-white"
            >
              <LuGithub size={16} /> {r.label ?? "Repo"}
            </a>
          ))}

        {p.links?.video && (
          <a
            href={p.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuVideo size={16} /> Video
          </a>
        )}
        {p.links?.caseStudy && (
          <a
            href={p.links.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white"
          >
            <LuBadgeCheck size={16} /> Caso
          </a>
        )}
      </div>
    </article>
  );
}
