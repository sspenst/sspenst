import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SS from '../components/icons/ss';
import Sidebar from '../components/sidebar';

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

export default function Tailwind() {
  const [activeSection, setActiveSection] = useState<string | undefined>('intro');

  useEffect(() => {
    function findActiveProject() {
      const projects = document.querySelectorAll('article section');

      for (let i = projects.length - 1; i >= 0; i--) {
        const project = projects[i];
        const rect = project.getBoundingClientRect();

        // NB: corresponds to scroll-mt-20
        if (rect.top <= 80) {
          setActiveSection(project.id);
          break;
        }
      }
    }

    window.addEventListener('scroll', findActiveProject);

    findActiveProject();

    return () => window.removeEventListener('scroll', findActiveProject);
  }, []);

  return (<>
    <Head>
      <title>Tailwind - Design Engineer</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='w-full max-w-7xl'>
        <aside className='hidden lg:flex flex-col gap-8 fixed w-72 px-8 font-medium'>
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
        </aside>
        <div className='flex flex-col lg:pl-72 gap-4 px-8'>
          <div className='flex flex-col items-center w-full lg:items-start gap-4'>
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
          <article className='flex flex-col gap-6 my-2 leading-relaxed'>
            <Section id='intro'>
              <p>Hey! My name is Spencer Spenst. I started using Tailwind CSS in January 2022 and since then it has been a part of every project I&apos;ve worked on. I first heard about this position through <a className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://twitter.com/adamwathan/status/1773341818773540949' rel='noreferrer' target='_blank'>Adam&apos;s tweet</a> on March 28 and immediately knew I had to apply. After an Easter weekend eating ham and visiting family I went straight to work on this application.</p>
              <p>A quick logistical intro, I am currently a self-employed software developer based in Abbotsford, BC, Canada (UTC-7). I am willing to make any hours work to effectively collaborate with the team and I have no issues working as an independent contractor! Okay, now let&apos;s get to the more interesting parts.</p>
            </Section>
            <Section id='history' title='How did I get here?'>
              <p>And what has led me to apply for this position? We can start at the beginning. The first computer I was able to get my hands on was an HP Mini netbook at the age of 12. With the netbook in one hand and the latest Java for Dummies book in the other I started to play with code. Two years later I was able to save up enough to build my own PC, and this has set me off on a journey to where I am today.</p>
              <p>Since then I&apos;ve always been involved with programming in some way - whether it was designing websites, solving coding challenges like <a className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://projecteuler.net/' rel='noreferrer' target='_blank'>Project Euler</a>, or building small pieces of software - so it was only natural that I ended up graduating from UBC in Computer Engineering.</p>
              <p>I found myself in the classic Big Tech career path, which was exciting at first but also helped me realize it wasn&apos;t the kind of software development I was truly passionate about. Your point about &quot;we say no to great opportunities if there&apos;s any chance it would make our days less fun&quot; really resonates with me since this is the mindset I was arriving at when I decided to leave Microsoft. I want to work on products that I find fun and useful and I want to make these products look great.</p>
            </Section>
            <Section id='pathology' title='Pathology'>
              <p>After Microsoft I gave myself the chance to dive into the areas of software I found the most interesting. One of the first projects I started making was called Pathology, which was a remake of a flash game from 2005 where the goal is to reach the exit in the least number of moves. The project gained some niche popularity and steadily gained users. It became a playground for me to experiment with Next.js, React, Tailwind CSS, MongoDB, all while listening to user feedback and improving the game.</p>
              <p>Include before/after images</p>
              <p>All of the development for Pathology has been public and open-source, and the community has contributed to improving the game. These contributions gave me the opportunity to mentor an aspiring software engineer. I helped onboard him to get the app running locally, and gave guidance where needed to contribute and ship new features like <a className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 font-medium transition' href='https://github.com/sspenst/pathology/pull/766' rel='noreferrer' target='_blank'>Achievements</a>. He was even able to use his work on Pathology to help land a junior position!</p>
            </Section>
            <Section id='thinky' title='Thinky.gg'>
              <p>I was able to get in contact with the original creator of the flash game and we ended up becoming equal owners of Pathology. We realized the infrastructure we had built for Pathology may have some potential as a puzzle game platform, so we extended it to be able to support multiple games and called it Thinky.gg. With my affinity for front-end and his preference for backend, I was able to focus more of my efforts on UX and front-end facing components. It gave me a good chance to design and expirement with reusable and clean components that could be used across games. Here is one of components I am quite happy with:</p>
              <p>Level card component (interactive in some way???)</p>
            </Section>
            <Section id='spotify' title='Spotify Web API SDK'>
              <p>I have always been a big fan of music, from playing piano to finding obscure genres to producing my own songs. With my endless thirst for music I was looking for a better way to discover new songs. I noticed Spotify&apos;s API had some interesting options to query for music so I wanted to make a website that would let you query with these options.</p>
              <p>When looking for a library to interface with Spotify&apos;s API I found there was a new package that had only recently been created by a Spotify employee. It was still underdeveloped and lacking the functionality I needed for my project, so I started making PRs. I can happily say I am now the top contributor besides the original creator!</p>
              <p>An interesting feature I added was (something to do with auth?) put a bunch of code snippets and explain how it works</p>
            </Section>
            <Section id='rabbit' title='Rabbit'>
              <p>With the Spotify Web API SDK fleshed out with all the features I needed, I was able to build Rabbit - a quick way to discover new tracks. This is probably my favorite project I&apos;ve released from a design perspective. My goal was to put out a simple but refined product with intentional and cohesive design.</p>
              <p>Component</p>
              <p>Here is the main component for discovering songs. Feel free to play around with the buttons here! It even has a help modal that uses the same components as the actual page, to add to the cohesion and intuitiveness of the design.</p>
            </Section>
            <Section id='future' title='What&apos;s next?'>
              <p>As you can probably tell from the examples I have shared and this application itself, I put a lot of care into the projects I work on. I love to optimize and simplify wherever possible, but at the same time I want things to look good visually and be intuitive for others. Balancing all of these things on pages and components is where I have the most fun.</p>
              <p>Designing and building new components for Catalyst, along with interactive microsites and documentation pages, are some of the points that got me the most excited from the job posting. To be honest, all of the projects that I would have worked on + the upcoming projects sound fun to me, and I would love to be the one to implement them.</p>
            </Section>
            <Section id='outro' title='Outro'>
              <p>It&apos;s a rare chance that you get to use all of the technology requirements for a position in the application itself! This page is built with Next.js, React, TypeScript, and Tailwind CSS. This page also gets a X% score on Lighthouse, uses semantic HTML elements, and even uses GSAP! (TODO)</p>
              <p>Hopefully you now have a bit of insight into who I am and what drives me! Would love to continue this conversation soon and talk more about the position.</p>
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
