import type {
  About,
  Blog,
  Gallery,
  Guestbook,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
  Doom,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Samiullah",
  lastName: "Javed",
  name: "Samiullah Javed",
  role: "Software Developer & Future Founder",
  avatar: "/images/avatar.jpg",
  email: "samiullahjavedd@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
};

const doom: Doom = {
  path: "/doom",
  label: "DOOM",
  title: "DOOM Game",
  description:
    '"Against all the evil that Hell can conjure, all the wickedness that mankind can produce, we will send unto them... only you. Rip and tear, until it is done."',
  controls:
    "Arrow Keys to Move, CTRL to Open/Interact, SPACE to Fire, SHIFT to Strafe, ESC for Menu.",
  iframe: {
    link: "/doom-game/index.html",
  },
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I might email you someday (if it's important)</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Resume",
    icon: "resume",
    link: "/Samiullah_Javed.pdf",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/samiullahjaved",
    essential: true,
  },
  {
    name: "8sami",
    icon: "github",
    link: "https://github.com/8sami",
    essential: true,
  },
  {
    name: "sam1-khan",
    icon: "github",
    link: "https://github.com/sam1-khan",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/wotareudoing/",
    essential: true,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@wotareudoing",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Making lives easier by solving problems</>,
  featured: {
    display: true,
    // hmmm, play doom? rickroll?
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: <>Assalamualaikum👋, I'm Sami. I love making products that solve actual problems.</>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `who dafuq is ${person.name}?`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: true,
    link: "https://cal.eu/samiullahjaved/30min",
  },
  now: {
    display: false,
    title: "Now",
    description: [<>hi</>, <>hello</>, <>hii</>],
  },
  intro: {
    display: true,
    title: "Introduction",
    description: [
      <>
        I can be described as someone who is genuinely curious, straight-forward and someone who
        actually listens.
      </>,
      <>
        That said, I mostly tend to follow my gut feeling and curiosity, and that same gut feeling
        and curiosity led me to learn programming back when I was in 9th grade. Since then, I have
        learned whatever I thought would be fun to learn.
      </>,
      <>
        Programming is like a superpower to me that has enabled me to create whatever I want,
        however I want, wherever I want, for whatever reason I want, for whoever I want. I get to
        choose to solve someone's problem using whatever means, for whatever reason and get
        compensated for doing so and enjoy it all the whilst!
      </>,
      <>
        So I am not someone who does things just for the sake of money or just because my boss told
        me to do it. I need to see my contribution making an impact on someone's life, which makes
        me a bad corporate employee, but I would rather stay true to myself than lie just to earn a
        few cents.
      </>,
      <>
        I find product development quite enojoyable. There's just so much fun in solving someone's
        problem and the process of getting realtime feedback, improving the product based on that
        and then getting positive feedback in the end is one of my most cherished source of
        serotonin.
      </>,
    ],
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Devkind",
        timeframe: "Jul. 2025 - Feb. 2026",
        role: "Software Developer",
        achievements: [
          <>
            Built a plug-and-play checkout for Swell stores using Cloudflare KV, Easyblocks, and
            NextJS, featuring a no-code editor for UI customisation.
          </>,
          <>
            Optimised the core checkout logic from 3 steps to 1, reducing friction and increasing
            completion rates by &asymp;35%.
          </>,
          <>
            Delivered 6+ client projects end-to-end, managing design, backend, frontend
            implementation, and deployment.
          </>,
          <>
            Mentored an intern through code reviews and task delegation to ensure timely and
            effective task completion.
          </>,
        ],
        images: [],
      },
      {
        company: "Devkind",
        timeframe: "Mar. 2025 - Jun. 2025",
        role: "Developer Intern",
        achievements: [
          <>
            Reworked a legacy website with a modern, sleek design, improving SEO and UX, which
            directly increased organic traffic, sales leads and decreased paint time from 172 ms to
            30 ms.
          </>,
          <>
            Standardised AI usage by creating a database of specialised prompts, reducing API token
            costs by &asymp;30%, and ensuring code consistency.
          </>,
          <>
            Automated marketing workflows using N8N and Slack, saving the team 10+ hours of manual
            work weekly.
          </>,
        ],
        images: [],
      },
      {
        company: "Samiullah Arif Enterprises (SAE)",
        timeframe: "Nov. 2024 - Apr. 2025",
        role: "Full-stack Freelance Developer",
        achievements: [
          <>
            Built a custom invoicing system using Django Ninja and NextJS that had processed upto
            20,000,000 PKR in transactions.
          </>,
          <>
            Iterated on the product based on real-time client feedback to handle different scenarios
            and 4+ new feature requests.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Islamia Government Science College Sukkur",
        description: "Intermediate in Computer Science",
        achievements: [],
        timeframe: "Aug. 2024 - Expd. 2026",
      },
      {
        name: "APWA Excellent World School Sukkur",
        description: "Primary & High School",
        achievements: [
          "1st position in Annual Examination 2022",
          "2nd position in Annual Examination 2020-21",
        ],
        timeframe: "Apr. 2014 - Aug. 2024",
      },
    ],
  },
  certifications: {
    display: true,
    title: "Certifications & Specializations",
    certificates: [
      {
        title: "Python 3 Programming",
        description: (
          <>
            <Text variant="body-default-s" onBackground="brand-weak">
              University of Michigan, Aug. 2024
            </Text>
          </>
        ),
        images: [],
        link: "https://www.coursera.org/account/accomplishments/specialization/QD9YGUEAT2P7",
      },
      {
        title: "Django for Everybody",
        description: (
          <>
            <Text variant="body-default-s" onBackground="brand-weak">
              University of Michigan, Oct. 2024
            </Text>
          </>
        ),
        images: [],
        link: "https://www.coursera.org/account/accomplishments/specialization/RKJ9K8JLME9M",
      },
      {
        title: "SQL for Data Science",
        description: (
          <>
            <Text variant="body-default-s" onBackground="brand-weak">
              UC Davis, Mar. 2025
            </Text>
          </>
        ),
        images: [],
        link: "https://www.coursera.org/account/accomplishments/verify/L2PNKKAY8YZH",
      },
      {
        title: "Version Control with Git",
        description: (
          <>
            <Text variant="body-default-s" onBackground="brand-weak">
              Atlassian, Aug. 2024
            </Text>
          </>
        ),
        images: [],
        link: "https://www.coursera.org/account/accomplishments/verify/DQ6FW6GSKSJO",
      },
      {
        title: "CS50x",
        description: (
          <>
            <Text variant="body-default-s" onBackground="brand-weak">
              Harvard University, Jun. 2024
            </Text>
          </>
        ),
        images: [],
        link: "https://certificates.cs50.io/96c90c9d-1fb7-4699-85a0-ed932f005519.pdf?size=letter",
      },
    ],
  },
  technical: {
    // needs special attention
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: <>All the languages I have ever laid my hands on</>,
        tags: [
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "C++",
            icon: "cpp",
          },
          {
            name: "C",
            icon: "c",
          },
          {
            name: "Bash",
            icon: "bash",
          },
          {
            name: "Elixir",
            icon: "elixir",
          },
          {
            name: "PHP",
            icon: "php",
          },
        ],
        images: [],
      },
      {
        title: "Frameworks",
        description: <>Call me Da Vinci for how many frameworks I have used</>,
        tags: [
          {
            name: "Nextjs",
            icon: "nextjs",
          },
          {
            name: "React",
            icon: "react",
          },
          {
            name: "React Native",
            icon: "react",
          },
          {
            name: "Expo",
            icon: "expo",
          },
          {
            name: "Nodejs",
            icon: "nodejs",
          },
          {
            name: "Django",
            icon: "django",
          },
          {
            name: "Django Ninja",
            icon: "django",
          },
          {
            name: "Flask",
            icon: "flask",
          },
          {
            name: "Laravel",
            icon: "laravel",
          },
        ],
        images: [],
      },
      {
        title: "Databases",
        description: <>Been using these to store all the data</>,
        tags: [
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
          {
            name: "MySQL",
            icon: "mysql",
          },
          {
            name: "SQLite",
            icon: "sqlite",
          },
          {
            name: "Google Sheets",
            icon: "googlesheets",
          },
        ],
        images: [],
      },
      {
        title: "Deployment Platforms",
        description: <>Code deployed on these platforms</>,
        tags: [
          {
            name: "Vercel",
            icon: "vercel",
          },
          {
            name: "Cloudflare",
            icon: "cloudflare",
          },
          {
            name: "Netlify",
            icon: "netlify",
          },
          {
            name: "PythonAnywhere",
            icon: "pythonanywhere",
          },
        ],
        images: [],
      },
      {
        title: "UI libraries",
        description: <>My art pieces are created using these libraries</>,
        tags: [
          {
            name: "Tailwind CSS",
            icon: "tailwindcss",
          },
          {
            name: "Shadcn UI",
            icon: "shadcnui",
          },
          {
            name: "ChakraUI",
            icon: "chakraui",
          },
          {
            name: "Ant Design",
            icon: "antdesign",
          },
          {
            name: "Bootstrap",
            icon: "bootstrap",
          },
          {
            name: "Once UI",
            icon: "onceui",
          },
          {
            name: "Shopify Polaris",
            icon: "shopify",
          },
        ],
        images: [],
      },
      {
        title: "Helpful Tools",
        description: <>Different tools that have helped me here and there</>,
        tags: [
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "GitHub",
            icon: "github",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Postman",
            icon: "postman",
          },
          {
            name: "Figma",
            icon: "figma",
          },
          {
            name: "GitLab",
            icon: "gitlab",
          },
          {
            name: "Jira",
            icon: "jira",
          },
        ],
        images: [],
      },
      {
        title: "IDEs",
        description: <>Ranking of all the IDEs I have used so far, from good to meh</>,
        tags: [
          {
            name: "VS Code",
            icon: "vscode",
          },
          {
            name: "Antigravity",
            icon: "google",
          },
          {
            name: "Sublime Text",
            icon: "sublimetext",
          },
          {
            name: "Jupyter Notebook",
            icon: "jupyter",
          },
          {
            name: "Cursor",
            icon: "cursor",
          },
          {
            name: "Android Studio",
            icon: "androidstudio",
          },
          {
            name: "Zed",
            icon: "zed",
          },
          {
            name: "Kiro",
            icon: "kiro",
          },
        ],
        images: [],
      },
      {
        title: "Honorable Mentions",
        description: <>Life would have been boring without these</>,
        tags: [
          {
            name: "N8N",
            icon: "n8n",
          },
          {
            name: "Firebase",
            icon: "firebase",
          },
          {
            name: "Stripe",
            icon: "stripe",
          },
          {
            name: "Redis",
            icon: "redis",
          },
          {
            name: "Celery",
            icon: "celery",
          },
          {
            name: "Twilio",
            icon: "twilio",
          },
          {
            name: "VirusTotal",
            icon: "virustotal",
          },
          {
            name: "Jinja",
            icon: "jinja",
          },
        ],
        images: [],
      },
    ],
  },
  gif: {
    title: "A little something to stare in awe at",
    description: "I don't know why, but I really liked this gif, and wanted to add it here",
    display: true,
    src: "/images/vangogh.gif",
    alt: "Van Gogh",
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const guestbook: Guestbook = {
  path: "/guestbook",
  label: "Guestbook",
  title: "Say hi👋 to fellow passersby",
  description: "How was you stay here? Leave a comment👇",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, guestbook, doom };
