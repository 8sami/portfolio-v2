import type { About, Blog, Socials, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text, SmartLink } from "@once-ui-system/core";

const person: Person = {
  firstName: "Huzaifa",
  lastName: "Khan",
  name: "Huzaifa Khan",
  role: "AI Engineer & Founder",
  avatar: "/images/avatar.png",
  email: "huzaifakhan04@gmail.com",
  timezone: "Asia/Karachi",
  location: "Islamabad, Pakistan",
  languages: ["English", "Urdu", "Punjabi"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Thoughts on AI, startups, and building things that matter.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/huzaifakhan04",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/huzaifakhan04/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/huzaifa.gguf/",
    essential: true,
  },
  {
    name: "Tiktok",
    icon: "tiktok",
    link: "https://www.tiktok.com/@huzaifa.gguf",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I don't wait for permission to build.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Fastrack</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/fastrack-agentic-ai-hiring-manager",
  },
  subline: (
    <>
      I'm Huzaifa — AI engineer, founder, and the kind of person who closes paying customers before
      the product exists. 6 SaaS products shipped. 9 hackathons won.{" "}
      <Text as="span" size="xl" weight="strong">
        Fortune 100 clients.
      </Text>{" "}
      All from Islamabad, Pakistan.
      <br />
      Currently at{" "}
      <Text as="span" size="xl" weight="strong">
        Avirso
      </Text>{" "}
      (SF) — and yes, I'm also on{" "}
      <SmartLink href="https://www.instagram.com/huzaifa.gguf/">Instagram</SmartLink>{" "}
      &{" "}
      <SmartLink href="https://www.tiktok.com/@huzaifa.gguf">TikTok</SmartLink>{" "}
      if you prefer your builders unfiltered.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, AI Engineer & Founder based in Islamabad, Pakistan`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://linktr.ee/huzaifakhan04",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Here's something I learned early: if you wait until conditions are perfect, someone else
        ships first. So I stopped waiting. I've been building things on the internet since I could
        string a Python script together — and in 4+ years of doing this seriously, across startups
        and SMEs in Pakistan, the UAE, and the US, the pattern has been pretty consistent: I show
        up before I'm supposed to, and I build before I'm ready.
        <br />
        <br />
        The clearest example:{" "}
        <SmartLink href="https://fastrack.work">Fastrack</SmartLink>
        , my agentic AI hiring manager. We had paying customers before we had a product. Closed 10+
        B2B deals in four months. Funded the runway by winning hackathons. It was completely
        chaotic and it worked exactly as well as it should have.
        <br />
        <br />
        That's the shape of most things I've built. 6 SaaS products shipped from zero —
        FinTech, HRTech, EdTech, MarTech, AgTech. (Yes, I have a type. The type is: "verticals
        that don't think they need AI yet.") Right now I'm a Senior Associate at{" "}
        <strong>Avirso</strong>, a boutique management consultancy in San Francisco, helping Fortune
        100 firms figure out their AI strategy before their competitors do. Alongside that, Fractional
        CTO at{" "}
        <SmartLink href="https://cmoonthego.ai">CMOontheGO</SmartLink>{" "}
        and consulting software engineer at{" "}
        <SmartLink href="https://cattleos.com">CattleOS</SmartLink>{" "}
        — an Antler-backed, $5M valuation voice-AI operating system for ranchers. Yes, that's real.
        It's actually one of the more interesting technical problems I've worked on.
        <br />
        <br />
        On the research side: Google ranked my voice-AI project, Vocalink, in the top 10 across all
        of APAC from 3,300+ submissions in the 2025 Solution Challenge. I've co-authored research on
        MoE architectures in LLMs, maintained an open-source AI tool with 1,000+ contributors, and
        won 9 hackathons — some of which directly funded companies I was building at the time.
        <br />
        <br />
        I'm a Data Science grad from FAST-NUCES, 5x Dean's List, 2x top of class. I've been
        recognised by Google, Huawei, Hult Prize Foundation, Vyro, Allied Bank Limited, and Zindigi.
        None of those things are what I lead with, because credentials are the last thing I think
        about when I'm deciding whether to build something.
        <br />
        <br />
        Outside all of this: I post about tech, startups, and the less polished stuff on{" "}
        <SmartLink href="https://www.instagram.com/huzaifa.gguf/">Instagram</SmartLink>{" "}
        and{" "}
        <SmartLink href="https://www.tiktok.com/@huzaifa.gguf">TikTok</SmartLink>{" "}
        (@huzaifa.gguf). I don't like chocolate, I think Stranger Things is overrated, and pineapple
        belongs on pizza — I will not be taking questions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Avirso",
        timeframe: "Feb 2026 – Present",
        role: "Senior Associate, Management Consulting",
        achievements: [
          <>
            Avirso is a boutique management consultancy out of San Francisco whose clients are
            Fortune 100 firms. The problems here are genuinely hard — not "build a feature" hard,
            but "this organisation has 80,000 people and needs to decide what AI means for its next
            five years" hard. I work on the tech side of that question. It turns out that building
            scrappy AI products for years is pretty good preparation for telling large companies
            what they're getting wrong about it.
          </>,
        ],
        images: [],
      },
      {
        company: "CattleOS",
        timeframe: "Jan 2026 – Present",
        role: "Consulting Software Engineer",
        achievements: [
          <>
            The pitch for{" "}
            <SmartLink href="https://cattleos.com">CattleOS</SmartLink>
            : ranchers and feedlot operators are still running one of the world's largest industries
            on notebooks and spreadsheets. You're out in a field, your hands aren't free, and you
            need to log what just happened to an animal in real-time. CattleOS solves this with
            voice-first AI — speak it, it captures it, it syncs even when there's no signal. The
            product works offline because the field doesn't care about your connectivity.
          </>,
          <>
            Antler-backed, $5M valuation, founding team. I work on core AI infrastructure. It's one
            of the more technically interesting problems I've been close to — the constraints are
            real, the stakes are real, and the industry is much larger than most people assume.
          </>,
        ],
        images: [
          {
            src: "/images/about/cattleos.png",
            alt: "CattleOS – Voice-first AI for cattle management",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "CMOontheGO",
        timeframe: "Sep 2025 – Present",
        role: "Fractional Chief Technology Officer",
        achievements: [
          <>
            Most founders and SMBs can't afford a CMO. They either get no strategic marketing or
            they pay agency fees for generic output.{" "}
            <SmartLink href="https://cmoonthego.ai">CMOontheGO</SmartLink>{" "}
            is the answer to that problem: a multi-agent AI that runs marketing strategy, planning,
            and real-time optimisation — delivering personalised, actionable audits at about 1/10th
            the cost of a human CMO. It's not a chatbot. It's a system that actually thinks through
            your marketing position.
          </>,
          <>
            I came on as Fractional CTO when the product needed to stop being a proof of concept
            and start being something that scales. I own the AI architecture, the product roadmap,
            and the technical team. The fun part is that the problem — making strategic marketing
            intelligence accessible — is genuinely unsolved well.
          </>,
        ],
        images: [
          {
            src: "/images/about/cmoonthego.png",
            alt: "CMOontheGO – Multi-agent AI for marketing strategy",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "IPP-US",
        timeframe: "Nov 2025 – Present",
        role: "Officer",
        achievements: [
          <>
            IPP WORLD is an NPO that funds Pakistani for-profit social ventures with up to $20K
            non-dilutive — no equity taken, just backing founders who are trying to create real jobs.
            I help run their annual New Venture Contest (NVC) and drive outreach to identify the
            ventures worth betting on.
          </>,
        ],
        images: [],
      },
      {
        company: "easypaisa digital bank",
        timeframe: "Sep 2025 – Feb 2026",
        role: "GenAI Specialist",
        achievements: [
          <>
            easypaisa isn't a startup. It's one of Pakistan's largest digital banks — 59M users,
            19M+ loans issued annually. At that scale, a 1% improvement in credit accuracy affects
            real people's access to money. A single fraud pattern that goes undetected costs
            hundreds of thousands of dollars. That's the environment I came into to consult on their
            5-year GenAI strategy — and ended up going considerably deeper on the technical side
            than a consulting engagement usually does.
          </>,
          <>
            Built a credit risk model from scratch: ~75% accuracy, 750+ behavioural features, daily
            and monthly and yearly signal patterns across 19M+ annual loans. Not a weekend project.
            The feature engineering alone took longer than most MVPs I've shipped.
          </>,
          <>
            Through anomaly detection and identity clustering, I found $168K+ in active, coordinated
            credit abuse — people running device-level loan arbitrage schemes at scale. The findings
            changed how they write credit rules.
          </>,
          <>
            Also automated their KYC encryption/decryption pipeline. Used to take 30+ minutes
            manually, per request. Now it's under a minute. The kind of change that's boring to
            explain and immediately obvious to everyone who used to do it by hand.
          </>,
        ],
        images: [],
      },
      {
        company: "Fastrack",
        timeframe: "Sep 2024 – Aug 2025",
        role: "CEO & Co-Founder",
        achievements: [
          <>
            Recruiting is broken in a very specific way: the best candidates often lose to people
            who are better at formatting resumes than doing the job.{" "}
            <SmartLink href="https://fastrack.work">Fastrack</SmartLink>{" "}
            was built to fix that. It's the first agentic AI hiring manager — it handles sourcing,
            shortlisting, outreach (email and automated calls), scheduling, and ATS tracking
            end-to-end. Recruiters stop drowning in inboxes. They start talking to people worth
            talking to. It plugs into any ATS/CRM or works standalone.
          </>,
          <>
            The way we built it is probably more interesting than the product itself: we had paying
            customers before we had anything to show them. We launched an MVP in under a month with
            5 people. We closed 10+ B2B deals within four months. We raised non-dilutive funding
            from executives at Meta and T-Mobile. And when we needed to extend runway between those
            milestones? We won hackathons. It was completely chaotic. It worked.
          </>,
          <>
            Fastrack is also the clearest version of something I believe: you don't need to be
            ready to start. You need to start to get ready.
          </>,
        ],
        images: [
          {
            src: "/images/about/fastrack.png",
            alt: "Fastrack – Agentic AI Hiring Manager",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "GoAccelovate",
        timeframe: "Jan 2025 – Mar 2025",
        role: "Data Science Lead",
        achievements: [
          <>
            Career counselling for most students is one underfunded advisor, one brief meeting, and
            a generic recommendation to "follow your passion."{"  "}
            <SmartLink href="https://app.mymentro.ai">MyMentro</SmartLink>
            is what that should look like instead: an AI career coach that layers 10+ established
            frameworks — SWOT, GROW, PESTEL, RIASEC, and others — to generate genuinely
            personalised academic and employment roadmaps. Not suggestions. Actual structured
            intelligence about where someone should go and how to get there.
          </>,
          <>
            I led the full build. Cut report generation time by ~77% using Hybrid RAG and semantic
            caching. Shipped KPI-based skill audits, real-time LinkedIn job matching, university
            programme guidance, and career analytics. The thing that mattered most: students
            stopped getting advice that could have been written for anyone.
          </>,
        ],
        images: [
          {
            src: "/images/about/mymentro.png",
            alt: "MyMentro – AI Career Intelligence",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Knowledge Discovery & DS Lab",
        timeframe: "May 2024 – Mar 2025",
        role: "Research Assistant",
        achievements: [
          <>
            The question behind <strong>Vocalink</strong> was simple and kind of radical: what if
            you never had to touch a keyboard to edit a document? Full voice control — not
            dictation, not voice-to-text, but actual document management through speech. I took
            it from the idea to a working MVP: LangGraph architecture, Docker Compose on VPS,
            designed for real-world scalability from day one.
          </>,
          <>
            Then Google ranked it in the{" "}
            <strong>top 10 AI solutions across all of APAC</strong> in the 2025 Solution Challenge
            — out of 3,300+ submissions from across the region. I still think about how many
            talented people were in that pool. That one felt earned.
          </>,
          <>
            Also co-authored research on a novel Mixture-of-Experts (MoE) approach in LLMs: how
            to get faster real-time workflow performance without the accuracy tradeoff you'd
            normally expect.
          </>,
        ],
        images: [
          {
            src: "https://www.youtube.com/watch?v=2EHemNhCX64",
            alt: "Vocalink – Youtube Video",
            width: 16,
            height: 9,
          },
          {
            src: "/images/about/gdg-apac.png",
            alt: "Vocalink – Google APAC Top 10, 2025",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Reality AI Lab",
        timeframe: "Jun 2024 – Oct 2024",
        role: "AI Engineer",
        achievements: [
          <>
            Co-built a personalised AI software engineering tutor for App Academy — 500+ members,
            the company's first B2B client, acquired for $40K. The stack: RAG pipelines, GPT-4o,
            Microsoft Florence-2 for visual understanding. The interesting design challenge was
            making something that actually adapts to where an individual student is, rather than
            serving the same content to everyone.
          </>,
          <>
            Also spent significant time on{" "}
            <SmartLink href="https://github.com/vibing-ai/marvel-ai-backend">
              Marvel AI
            </SmartLink>
            , an open-source AI teaching assistant that grew to 1,000+ contributors. That's a
            different kind of engineering problem: you're not just building features, you're
            maintaining a system that hundreds of people are actively trying to extend in different
            directions at once. Built on GroqCloud and NVIDIA NIM for inference. I led code reviews
            and kept the architecture coherent through a lot of pull requests.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "FAST-NUCES",
        description: (
          <>
            B.S. in Data Science. Dean's List 5 times, top of class twice. I also spent four
            semesters as a Teaching Assistant — DS, Big Data Analytics, Database Systems — which
            is how I learned that explaining something clearly is harder than building it. That
            turned out to be useful later.
          </>
        ),
      },
      {
        name: "Founder Institute",
        description: (
          <>
            Core Program in Entrepreneurship (Oct 2024 – Feb 2025). The most unfiltered education
            in what building a company actually looks like — the part business school skips.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills & Stack",
    skills: [
      {
        title: "AI & LLM Engineering",
        description: (
          <>
            Agentic pipelines, RAG (standard and hybrid), LangGraph, LangChain, OpenAI GPT-4o,
            Anthropic Claude, Groq, NVIDIA NIM, Microsoft Florence-2, MoE architectures, AutoML.
            I've deployed all of this in production for real users — not as demos, not in notebooks,
            but in systems that break if you get them wrong. That distinction matters to me.
          </>
        ),
        tags: [
          { name: "LangChain" },
          { name: "LangGraph" },
          { name: "OpenAI" },
          { name: "RAG" },
          { name: "AutoML" },
          { name: "Python" },
        ],
        images: [],
      },
      {
        title: "Product & 0 → 1",
        description: (
          <>
            6 products shipped from nothing. I've done the whole arc: figuring out whether the
            problem is real, building the first version, finding the first customer, closing the
            first deal, hiring the first person, scaling past the point where you can hold it all
            in your head. The early stage is where I'm most useful — and honestly most interested.
          </>
        ),
        tags: [
          { name: "0→1 SaaS" },
          { name: "B2B" },
          { name: "Agentic AI" },
          { name: "FinTech" },
          { name: "HRTech" },
          { name: "EdTech" },
        ],
        images: [],
      },
      {
        title: "Data Science & Analytics",
        description: (
          <>
            Credit risk modelling at scale (750+ features, 19M+ loans), anomaly detection,
            identity clustering, NLP on Roman Urdu and Hinglish, transliteration pipelines,
            segmentation research, Tableau and D3.js for visualisation. The difference between
            data science in a classroom and data science at easypaisa is that the second one
            has consequences. I've only worked in the second kind.
          </>
        ),
        tags: [
          { name: "Python" },
          { name: "SQL" },
          { name: "Tableau" },
          { name: "D3.js" },
          { name: "NLP" },
          { name: "Clustering" },
        ],
        images: [],
      },
      {
        title: "Awards & Recognition",
        description: (
          <>
            🏆 <strong>Google APAC Solution Challenge 2025</strong> — Top 10 / 3,300+ submissions
            <br />
            🏆 <strong>9x Hackathon Winner</strong> — incl. DataQuest Winner & DataViz Runner-Up at NaSCon
            <br />
            🎓 <strong>5x Dean's List of Honours</strong> — FAST-NUCES
            <br />
            <br />
            Recognised by: <strong>Google · Huawei · Hult Prize Foundation · Vyro · Allied Bank
            Limited · Zindigi</strong>
          </>
        ),
        tags: [
          { name: "Google", icon: "/images/logos/google.png" },
          { name: "Huawei", icon: "/images/logos/huawei.png" },
          { name: "Hult Prize", icon: "/images/logos/hultprize.png" },
          { name: "Vyro", icon: "/images/logos/vyro.png" },
          { name: "Allied Bank", icon: "/images/logos/alliedbank.png" },
          { name: "Zindigi", icon: "/images/logos/zindigi.png" },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI, startups, and building things...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `AI products and SaaS projects by ${person.name}`,
};

const socials: Socials = {
  path: "/socials",
  label: "Socials",
  title: `Socials – ${person.name}`,
  description: `Follow ${person.name} on Instagram & TikTok @huzaifa.gguf`,
};

export { person, social, newsletter, home, about, blog, work, socials };
