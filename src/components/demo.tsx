import MusicPortfolio, { type MusicProject } from "@/components/ui/music-portfolio";

const projectsData: MusicProject[] = [
  {
    id: 1,
    artist: "YOUNG BROKE & LONELY",
    album: "LONELY BOY",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2024",
    image:
      "https://cdn.21st.dev/assets/mirror/d4/d4340c726554d9982f86c18eed4d079a4c5a6bf97055be6ac02c432b7b7d0359.jpg",
  },
  {
    id: 2,
    artist: "YOUNG BROKE & LONELY",
    album: "IN YOUR MEMORY",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2024",
    image:
      "https://cdn.21st.dev/assets/mirror/cb/cb0f44451826df84a363c19df179175775fe90c02e6b69207beb6e932e73c02c.jpg",
  },
  {
    id: 3,
    artist: "YOUNG BROKE & LONELY",
    album: "WHO AM I?",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2023",
    image:
      "https://cdn.21st.dev/assets/mirror/aa/aa85ff48215569a86fb50a604a38a5d189b48304e84c5c935bbc9fee321161c8.jpg",
  },
  {
    id: 4,
    artist: "YOUNG BROKE & LONELY",
    album: "SINGLE MOM",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2023",
    image:
      "https://cdn.21st.dev/assets/mirror/3d/3d17231b16fc5c76167dd50839c09d427403ead2a74e5c77fd4573a829fa0e25.jpg",
  },
  {
    id: 5,
    artist: "YOUNG BROKE & LONELY",
    album: "GHOST",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2023",
    image:
      "https://cdn.21st.dev/assets/mirror/12/1244231e754ad9955ba3d36d43d3333ec1d3b6d55cd156e1caa5e8b54d4e6668.jpg",
  },
  {
    id: 6,
    artist: "YOUNG BROKE & LONELY",
    album: "DIFFICULTY",
    category: "SINGLE",
    label: "SELF RELEASED",
    year: "2022",
    image:
      "https://cdn.21st.dev/assets/mirror/2d/2dbbdeff8004bc7a38f63933de78195015f38a9d59553aef0755f38271208771.jpg",
  },
];

export default function DemoOne() {
  return (
    <MusicPortfolio
      PROJECTS_DATA={projectsData}
      CONFIG={{
        timeZone: "America/New_York",
        timeUpdateInterval: 1_000,
        idleDelay: 4_000,
        debounceDelay: 100,
      }}
      SOCIAL_LINKS={{
        spotify: "https://open.spotify.com/user/mnzulfahmi17",
        email: "mailto:mnzulfahmi17@gmail.com",
        x: "https://x.com/stalkevrythng",
      }}
      LOCATION={{ latitude: "43.9250° N", longitude: "19.5530° E", display: true }}
    />
  );
}
