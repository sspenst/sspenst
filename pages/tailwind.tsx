/* eslint-disable react-hooks/set-state-in-effect */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Highlight, themes } from 'prism-react-renderer';
import React, { useEffect, useRef, useState } from 'react';
import SS from '../components/icons/ss';
import LevelCard from '../components/tailwind/levelCard';
import Rabbit from '../components/tailwind/rabbit';
import Sidebar from '../components/tailwind/sidebar';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  title?: string;
}

function Section({ children, id, title }: SectionProps) {
  return (
    <section className='scroll-mt-20 mt-6 flex flex-col gap-6' id={id}>
      {title &&
      <a className='group relative flex gap-4 w-fit font-medium text-xl' href={`#${id}`}>
        <h3 className=''>{title}</h3>
        <span className='absolute -ml-6 group-hover:block hidden text-neutral-600 dark:text-neutral-400'>#</span>
      </a>
      }
      {children}
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className='text-sm bg-neutral-300 dark:bg-neutral-700 py-1 px-2 rounded-md'>
      {children}
    </code>
  );
}

function CodeBlock({ code }: { code: string }) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState(themes.vsDark);

  useEffect(() => {
    setTheme(resolvedTheme === 'dark' ? themes.vsDark : themes.vsLight);
  }, [resolvedTheme]);

  return (
    <div className=''>
      <Highlight
        theme={theme}
        code={code}
        language='tsx'
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className='text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 py-2 px-4 rounded-md wrap-break-word whitespace-pre-wrap'>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

interface ImagePlusProps {
  bgColor: string;
  caption: string;
  src: string;
  title: string;
}

function ImagePlus({ bgColor, caption, src, title }: ImagePlusProps) {
  return (
    <div
      className='flex flex-col gap-4 items-center p-4 max-w-full rounded-xl border border-neutral-700'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className='flex items-center max-w-full overflow-hidden rounded-md'>
        <Image alt={`${title} Preview`} src={src} width={756} height={1} />
      </div>
      <div className='text-neutral-200 text-sm text-center'>
        {caption}
      </div>
    </div>
  );
}

export default function Tailwind() {
  const [activeSection, setActiveSection] = useState<string | undefined>('intro');
  const asideRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    function findActiveProject() {
      const projects = document.querySelectorAll('article section');

      for (let i = projects.length - 1; i >= 0; i--) {
        const project = projects[i];
        const rect = project.getBoundingClientRect();

        // NB: corresponds to scroll-mt-20
        if (rect.top <= 81) {
          setActiveSection(project.id);
          break;
        }
      }
    }

    window.addEventListener('scroll', findActiveProject);

    findActiveProject();
    setIsMounted(true);

    return () => window.removeEventListener('scroll', findActiveProject);
  }, []);

  useGSAP(() => {
    const aside = asideRef.current;
    const title = titleRef.current;
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(aside, {
      duration: 1,
      y: -110,
    }, {
      duration: 1,
      y: 0,
    });

    tl.fromTo(title, {
      duration: 1,
      scale: 1.3,
      x: 295,
      y: 120,
    }, {
      duration: 1,
      scale: 1,
      x: 0,
      y: 0,
    }, '<');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 150, 1);

      tl.progress(progress);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (<>
    <Head>
      <title>Tailwind - Design Engineer</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex w-full max-w-6xl'>
        <aside className='hidden lg:flex flex-col gap-8 sticky top-24 w-72 font-medium h-fit' ref={asideRef} style={{
          visibility: isMounted ? 'visible' : 'hidden',
        }}>
          <div className='lg:flex hidden flex-col items-start gap-3 pl-6' ref={titleRef} style={{
            visibility: isMounted ? 'visible' : 'hidden',
          }}>
            <div className='flex gap-4 items-center'>
              <div className='border border-slate-300 dark:border-slate-700 p-2 shadow-lg rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 h-fit'>
                <Image alt='tailwind labs logo' src='tailwind.png' width='30' height='30' style={{
                  minHeight: 30,
                  minWidth: 30,
                }} />
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-medium'>Tailwind Labs</h1>
              </div>
            </div>
            <h2 className='text-md'>Design Engineer Application</h2>
          </div>
          <div className='flex flex-col gap-8 px-8'>
            <div className='flex items-center max-w-full overflow-hidden rounded-full w-48 h-48 shadow-lg'>
              <Image alt='Spencer Spenst headshot' src='me.jpeg' width={2360} height={2360} priority />
            </div>
            <Sidebar
              activeId={activeSection}
              links={[
                { id: 'intro', text: 'Intro' },
                { id: 'history', text: 'How did I get here?' },
                { id: 'pathology', text: 'Pathology' },
                { id: 'thinky', text: 'Thinky.gg' },
                { id: 'spotify', text: 'Spotify Web API SDK' },
                { id: 'rabbit', text: 'Rabbit' },
                { id: 'future', text: 'What\'s next?' },
                { id: 'outro', text: 'Outro' },
              ]}
            />
          </div>
        </aside>
        <div className='flex flex-col gap-4 px-8 top-0 max-w-full'>
          <div className='lg:hidden flex flex-col items-center lg:items-start gap-4'>
            <div className='lg:hidden flex items-center max-w-full overflow-hidden rounded-full w-48 h-48 shadow-lg'>
              <Image alt='Spencer Spenst headshot' src='me.jpeg' width={2360} height={2360} priority />
            </div>
            <span className='text-3xl mb-6 lg:hidden block'>Spencer Spenst</span>
            <div className='flex gap-4 items-center'>
              <div className='border border-slate-300 dark:border-slate-700 p-2 shadow-lg rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 h-fit'>
                <Image alt='tailwind labs logo' src='tailwind.png' width='40' height='40' style={{
                  minHeight: 40,
                  minWidth: 40,
                }} />
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-medium'>Tailwind Labs</h1>
              </div>
            </div>
            <h2 className='text-2xl'>Design Engineer Application</h2>
          </div>
          <article className='flex flex-col gap-6 lg:mt-32 mt-4 mb-2 leading-relaxed'>
            <Section id='intro'>
              <p>Hey! My name is Spencer Spenst. I started using Tailwind CSS in January 2022 and since then it has been a part of every project I&apos;ve worked on. I first heard about this position through <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://twitter.com/adamwathan/status/1773341818773540949' rel='noreferrer' target='_blank'>Adam&apos;s tweet</a> on March 28 and immediately knew I had to apply. After an Easter weekend eating ham and visiting family I went straight to work on this application.</p>
              <p>A quick logistical intro, I am currently a self-employed software developer based in Abbotsford, BC, Canada (UTC-7). I am willing to make any hours work to effectively collaborate with the team and I have no issues working as an independent contractor! Okay, now let&apos;s get to the more interesting parts.</p>
            </Section>
            <Section id='history' title='How did I get here?'>
              <p>And what has led me to apply for this position? We can start at the beginning. The first computer I was able to get my hands on was an HP Mini netbook at the age of 12. With the netbook in one hand and the latest Java for Dummies book in the other I started to play with code. Two years later I was able to save up enough to build my own PC, and this has set me off on a journey to where I am today.</p>
              <p>Since then I&apos;ve always been involved with programming in some way - whether it was designing websites, solving coding challenges like <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://projecteuler.net/' rel='noreferrer' target='_blank'>Project Euler</a>, or building small pieces of software - so it was only natural that I ended up graduating from UBC in Computer Engineering.</p>
              <p>I found myself in the classic Big Tech career path, which was exciting at first but also helped me realize it wasn&apos;t the kind of software development I was truly passionate about. Your point that says <i>&quot;we say no to great opportunities if there&apos;s any chance it would make our days less fun&quot;</i> really resonates with me since this is the mindset I was arriving at when I decided to leave Microsoft. I want to work on products that I find fun and useful and I want to make these products look great.</p>
            </Section>
            <Section id='pathology' title='Pathology'>
              <p>After Microsoft I gave myself the chance to dive into the areas of software I found the most interesting. One of the first projects I started making was called Pathology, which is a remake of a flash game from 2005 where the goal is to reach the exit in the least number of moves. The project gained some niche popularity and steadily gained users. It became a playground for me to experiment with Next.js, React, Tailwind CSS, and more, all while listening to user feedback and improving the game.</p>
              <div className='flex gap-12 py-4 flex-wrap justify-center'>
                {/* <ImagePlus bgColor='rgb(51 51 51)' caption='2005 - Original Flash game' src='/psychopath-42.png' title='Psychopath Preview' /> */}
                <ImagePlus bgColor='rgb(38 38 38)' caption='Pathology level page - Jacoby Transfer by davidspencer6174' src='jacoby-transfer.png' title='Pathology Preview' />
              </div>
              <p>All of the development for Pathology has been public and open-source, and the community has contributed to improving the game. The collaborative nature of the project gave me the opportunity to mentor an aspiring software engineer. I helped onboard him to get the app running locally, and gave guidance where needed to help with contributing and shipping new features like <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://github.com/sspenst/thinky.gg/pull/766' rel='noreferrer' target='_blank'>Achievements</a>. He was even able to use his work on Pathology to help land a junior position!</p>
            </Section>
            <Section id='thinky' title='Thinky.gg'>
              <p>I was able to get in contact with <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://www.linkedin.com/in/dannymiller2/' rel='noreferrer' target='_blank'>Danny Miller</a> (the original creator of the flash game) and we ended up working on Pathology together. We realized the infrastructure we had built for Pathology may have some potential as a puzzle game platform, so we extended it to support multiple games and rebranded it to <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://thinky.gg' rel='noreferrer' target='_blank'>Thinky.gg</a>. Some fun stats, in total Thinky.gg has amassed over 34,000 hours of playtime - with over 2000 users that&apos;s an average of around 17 hours per player! These users have collectively completed over 300,000 levels and these numbers are still growing.</p>
              <p>With my affinity for front-end and Danny&apos;s preference for backend, I was able to focus more of my efforts on user-facing elements. It gave me a good chance to design and expirement with clean components that could be reused across games. One of my favorites is this <Code>LevelCard</Code> component:</p>
              <div className='flex justify-center'>
                <LevelCard />
              </div>
              <p>With a growing userbase I wanted to make sure these components were accessible and robust. The title has <Code>line-clamp-2</Code> to ensure long titles do not disrupt the UX and so that surrounding components are positioned in a predictable way. It also has <Code>wrap-break-word</Code> to ensure single words don&apos;t extend past the edge of the title area. You can almost guarantee there will be users that will push the boundaries of a system (and indeed, a level was published at the maximum title length with 50 of the longest unicode character: ﷽), so handling these cases is important.</p>
              <p>Another important note is the checkmark in the corner when the level is solved. This was added to handle deuteranomaly color blindness, so those users could more easily see which levels have been solved vs unoptimized.</p>
            </Section>
            <Section id='spotify' title='Spotify Web API SDK'>
              <p>I have always been a big fan of music, from playing piano to finding obscure genres to producing my own songs. I wanted a better way to discover new tracks, and I noticed Spotify&apos;s API had some interesting options to query for music.</p>
              <p>When looking for a library to use I found there was a new package that had only recently been created by a Spotify employee. It was still underdeveloped and lacking the functionality I needed for my project, so I started making PRs and ended up becoming the top contributor besides the original creator!</p>
              <p><a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://github.com/spotify/spotify-web-api-ts-sdk/pull/12' rel='noreferrer' target='_blank'>This PR</a> was a useful one that allowed me to optimize the initial page load. Previously you would authenticate like this:</p>
              <CodeBlock code={`const [spotifyApi, setSpotifyApi] = useState<SpotifyApi | null>();

useEffect(() => {
  const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);

  api.authenticate().then(
    () => setSpotifyApi(api),
    () => setSpotifyApi(null),
  );
}, []);`} />
              <p><Code>spotifyApi</Code> is your way to call Spotify&apos;s APIs through the SDK. Requests to APIs through <Code>spotifyApi</Code> will return 401 until you have authenticated successfully. This sounds fine, until you find out the way <Code>authenticate</Code> was implemented did not guarantee the authentication flow had completed by the time the function had returned. There was no way to actually confirm you had authenticated successfully, so the first requests sent immediately after <Code>setSpotifyApi</Code> would almost always return 401 and would need to be retried.</p>
              <p>I wanted to load pages as fast as possible without wasting any API calls, so my PR exposes a <Code>getAccessToken</Code> function which you can use to infer if the authentication has completed. With this change merged, I was able to update my code to the following:</p>
              <CodeBlock code={`const [spotifyApi, setSpotifyApi] = useState<SpotifyApi | null>();

useEffect(() => {
  const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);

  api.authenticate().then(
    async () => {
      const accessToken = await api.getAccessToken();
  
      setSpotifyApi(accessToken ? api : undefined);
    },
    () => setSpotifyApi(null),
  );
}, []);`} />
              <p>Now we can <Code>await</Code> until the access token is confirmed to exist, then we can call <Code>setSpotifyApi</Code> and make our requests immediately!</p>
            </Section>
            <Section id='rabbit' title='Rabbit'>
              <p>With the Spotify Web API SDK enhanced with all the features I needed, I was able to build <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://rabbit.sspenst.com' rel='noreferrer' target='_blank'>Rabbit</a> - a quick way to discover new tracks. This is probably my favorite project I&apos;ve released from a UX perspective. My goal was to put out a simple but refined product with intentional and cohesive design.</p>
              <div className='flex justify-center'>
                <Rabbit />
              </div>
              <p>This is the main component for discovering songs. Feel free to play around with the buttons here! It even has a help modal that uses the same components as the actual page. Most of the icons come from <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://heroicons.com' rel='noreferrer' target='_blank'>Heroicons</a> and the help dialog is made with the <a className='text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://headlessui.com/react/dialog' rel='noreferrer' target='_blank'>Headless UI</a>.</p>
            </Section>
            <Section id='future' title='What&apos;s next?'>
              <p>As I have hopefully shown from the projects I&apos;ve shared and this page itself, I put a lot of care into the projects I work on. I love to optimize and simplify wherever possible, but at the same time I want things to look good and be intuitive for others. Balancing all of these things on pages and in components is where I have the most fun.</p>
              <p>Designing and building new components for Catalyst, along with interactive microsites and documentation pages, are some of the points that got me the most excited from the job posting. To be honest, all of the projects that I would have worked on + the upcoming projects sound fun to me, and I would love to be the one to implement them.</p>
            </Section>
            <Section id='outro' title='Outro'>
              <p>It&apos;s a rare chance that you get to use all of the technology requirements for a position in the application itself! This page is built with Next.js, React, TypeScript, and Tailwind CSS. It also gets a 100 from Lighthouse on accessibility, uses semantic HTML elements, can be installed as a PWA, and even uses GSAP for the title!</p>
              <p>Hopefully this gives you a bit of insight into who I am and what drives me. I would love to continue this conversation soon and talk more about the position.</p>
            </Section>
            <Link aria-label='Home' href='/' className='flex items-center gap-4 mt-6 w-fit font-medium text-black dark:text-white hover:text-neutral-400 dark:hover:text-neutral-400 transition'>
              <div className='flex gap-2 w-8 h-8'>
                <SS />
              </div>
              <span className='text-xl'>
                Spencer Spenst
              </span>
            </Link>
          </article>
        </div>
      </div>
    </div>
  </>);
}
