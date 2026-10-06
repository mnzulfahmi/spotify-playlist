import { useCallback, useEffect, useRef, useState, type FocusEvent, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export type MusicProject = {
  id: number | string;
  artist: string;
  album: string;
  category: string;
  label: string;
  year: string;
  image: string;
};

export type PortfolioConfig = {
  timeZone?: string;
  timeUpdateInterval?: number;
  idleDelay?: number;
  debounceDelay?: number;
};

export type PortfolioLocation = {
  latitude?: string;
  longitude?: string;
  display?: boolean;
};

export type PortfolioSocialLinks = {
  spotify?: string;
  email?: string;
  x?: string;
};

export type PortfolioCallbacks = {
  onProjectHover?: (project: MusicProject) => void;
  onProjectLeave?: () => void;
  onContainerLeave?: () => void;
  onIdleStart?: () => void;
  onThemeChange?: (theme: "light" | "dark") => void;
};

export type MusicPortfolioProps = {
  PROJECTS_DATA?: MusicProject[];
  LOCATION?: PortfolioLocation;
  CALLBACKS?: PortfolioCallbacks;
  CONFIG?: PortfolioConfig;
  SOCIAL_LINKS?: PortfolioSocialLinks;
};

type ProjectItemProps = {
  project: MusicProject;
  index: number;
  onActivate: (index: number, project: MusicProject) => void;
  onDeactivate: (event: MouseEvent<HTMLLIElement> | FocusEvent<HTMLLIElement>) => void;
  isActive: boolean;
};

const DEFAULT_CONFIG: Required<PortfolioConfig> = {
  timeZone: "America/New_York",
  timeUpdateInterval: 1_000,
  idleDelay: 4_000,
  debounceDelay: 100,
};

function TimeDisplay({ config }: { config: Required<PortfolioConfig> }) {
  const [time, setTime] = useState({ hours: "", minutes: "", dayPeriod: "" });

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: config.timeZone,
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });
      const parts = formatter.formatToParts(new Date());

      setTime({
        hours: parts.find((part) => part.type === "hour")?.value ?? "",
        minutes: parts.find((part) => part.type === "minute")?.value ?? "",
        dayPeriod: parts.find((part) => part.type === "dayPeriod")?.value ?? "",
      });
    };

    updateTime();
    const interval = window.setInterval(updateTime, config.timeUpdateInterval);
    return () => window.clearInterval(interval);
  }, [config.timeUpdateInterval, config.timeZone]);

  return (
    <time className="corner-item bottom-right" id="current-time">
      {time.hours}
      <span className="time-blink" aria-hidden="true">
        :
      </span>
      {time.minutes} {time.dayPeriod}
    </time>
  );
}

function ProjectItem({ project, index, onActivate, onDeactivate, isActive }: ProjectItemProps) {
  const artistRef = useRef<HTMLSpanElement>(null);
  const albumRef = useRef<HTMLSpanElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textRefs = {
      artist: artistRef,
      album: albumRef,
      category: categoryRef,
      label: labelRef,
      year: yearRef,
    };

    Object.entries(textRefs).forEach(([key, ref]) => {
      if (!ref.current) return;
      gsap.killTweensOf(ref.current);
      const value = project[key as keyof Pick<MusicProject, "artist" | "album" | "category" | "label" | "year">];

      if (isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(ref.current, {
          duration: 0.7,
          scrambleText: {
            text: value,
            chars: "qwerty1337h@ck3r",
            revealDelay: 0.2,
            speed: 0.4,
          },
        });
      } else {
        ref.current.textContent = value;
      }
    });
  }, [isActive, project]);

  return (
    <li
      className={`project-item ${isActive ? "active" : ""}`}
      onMouseEnter={() => onActivate(index, project)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(index, project)}
      onBlur={onDeactivate}
      data-image={project.image}
      tabIndex={0}
      aria-label={`${project.artist}, ${project.album}, ${project.year}`}
    >
      <span ref={artistRef} className="project-data artist hover-text">
        {project.artist}
      </span>
      <span ref={albumRef} className="project-data album hover-text">
        {project.album}
      </span>
      <span ref={categoryRef} className="project-data category hover-text">
        {project.category}
      </span>
      <span ref={labelRef} className="project-data label hover-text">
        {project.label}
      </span>
      <span ref={yearRef} className="project-data year hover-text">
        {project.year}
      </span>
    </li>
  );
}

export default function MusicPortfolio({
  PROJECTS_DATA = [],
  LOCATION = {},
  CALLBACKS = {},
  CONFIG = {},
  SOCIAL_LINKS = {},
}: MusicPortfolioProps) {
  const config = { ...DEFAULT_CONFIG, ...CONFIG };
  const [activeIndex, setActiveIndex] = useState(-1);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);
  const activeIndexRef = useRef(-1);
  const callbacksRef = useRef(CALLBACKS);

  useEffect(() => {
    callbacksRef.current = CALLBACKS;
  }, [CALLBACKS]);

  useEffect(() => {
    PROJECTS_DATA.forEach((project) => {
      if (project.image) {
        const image = new Image();
        image.src = project.image;
      }
    });
  }, [PROJECTS_DATA]);

  const handleProjectActivate = useCallback(
    (index: number, project: MusicProject) => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);

      if (activeIndexRef.current === index) return;
      activeIndexRef.current = index;
      setActiveIndex(index);
      callbacksRef.current.onProjectHover?.(project);

      const background = backgroundRef.current;
      if (!project.image || !background) return;
      background.style.transition = "none";
      background.style.transform = "translate(-50%, -50%) scale(1.12)";
      background.style.backgroundImage = `url("${project.image}")`;
      background.style.opacity = "1";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          background.style.transition =
            "opacity 600ms ease, transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          background.style.transform = "translate(-50%, -50%) scale(1)";
        });
      });
    },
    [],
  );

  const handleProjectDeactivate = useCallback(() => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      callbacksRef.current.onProjectLeave?.();
    }, config.debounceDelay);
  }, [config.debounceDelay]);

  const handleContainerLeave = useCallback(() => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    activeIndexRef.current = -1;
    setActiveIndex(-1);
    if (backgroundRef.current) backgroundRef.current.style.opacity = "0";
    callbacksRef.current.onContainerLeave?.();
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const locationLabel = [LOCATION.latitude, LOCATION.longitude].filter(Boolean).join(", ");

  return (
    <div className="music-portfolio-shell">
      <main
        className={`portfolio-container ${activeIndex !== -1 ? "has-active" : ""}`}
        onMouseLeave={handleContainerLeave}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) handleContainerLeave();
        }}
      >
        <h1 className="sr-only">Young Broke &amp; Lonely music portfolio</h1>
        <ul className="project-list" role="list">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onActivate={handleProjectActivate}
              onDeactivate={handleProjectDeactivate}
              isActive={activeIndex === index}
            />
          ))}
        </ul>
      </main>

      <div
        ref={backgroundRef}
        className="background-image"
        id="backgroundImage"
        role="img"
        aria-hidden="true"
      />

      <aside className="corner-elements" aria-label="Portfolio details">
        <nav className="corner-item top-right" aria-label="Social links">
          {SOCIAL_LINKS.spotify && (
            <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noreferrer">
              Spotify
            </a>
          )}
          {SOCIAL_LINKS.email && <a href={SOCIAL_LINKS.email}>Email</a>}
          {SOCIAL_LINKS.x && (
            <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">
              X
            </a>
          )}
        </nav>
        {LOCATION.display !== false && locationLabel && (
          <div className="corner-item bottom-left">{locationLabel}</div>
        )}
        <TimeDisplay config={config} />
      </aside>
    </div>
  );
}
