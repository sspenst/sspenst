import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

function getProfileSlug(userName: string) {
  return `https://pathology.thinky.gg/profile/${userName}`;
}

interface SolvedProps {
  className?: string;
}

function Solved({ className }: SolvedProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='rgb(0, 200, 0)' className={classNames('w-6 h-6', className)} style={{ minHeight: 24, minWidth: 24 }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12' />
    </svg>
  );
}

interface ProfileAvatarProps {
  size?: number;
  userId: string;
}

function ProfileAvatar({ size = 36, userId }: ProfileAvatarProps) {
  return (
    <div className='flex items-end'>
      <span
        className='border border-neutral-400 dark:border-neutral-600'
        style={{
          backgroundImage: `url("https://pathology.thinky.gg/api/avatar/${userId}.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: size / 2,
          height: size,
          width: size,
        }}
      />
    </div>
  );
}

interface FormattedUserProps {
  className?: string;
  onClick?: () => void;
  userName: string;
}

function FormattedUser({ className, onClick, userName }: FormattedUserProps) {
  return (
    <div className={classNames('flex items-center gap-2 truncate w-fit max-w-full font-bold', className)}>
      <div className='flex items-center gap-2 truncate w-fit'>
        <a
          className='hover:underline truncate'
          href={getProfileSlug(userName)}
          onClick={onClick}
          rel='noreferrer'
          target='_blank'
        >
          {userName}
        </a>
      </div>
    </div>
  );
}

function LevelDropdown() {
  return (
    <Menu as='div' className='relative'>
      <Menu.Button className='flex items-center' id='dropdownMenuBtn' aria-label='dropdown menu'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 hover:opacity-100 opacity-50' style={{ minHeight: 24, minWidth: 24 }}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z' />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 m-1 w-fit origin-top-right rounded-[10px] shadow-lg border z-20 bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700'>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames('flex w-full items-center rounded-md cursor-pointer px-3 py-2 gap-3 whitespace-nowrap', active ? 'bg-neutral-300 dark:bg-neutral-700' : undefined )}>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z' />
                  </svg>
                  <span>Copy level data</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames('flex w-full items-center rounded-md cursor-pointer px-3 py-2 gap-3 whitespace-nowrap', active ? 'bg-neutral-300 dark:bg-neutral-700' : undefined)}>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' />
                  </svg>
                  <span>Share link</span>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function LevelCard() {
  const [userMoves, setUserMoves] = useState<number | undefined>(undefined);

  const level = {
    _id: '625b37c5c94d970253498023',
    isRanked: true,
    leastMoves: 33,
    name: 'A New Kind of Trick',
    slug: 'hi19hi19/a-new-kind-of-trick',
  };

  const user = {
    _id: '629d82e6bea013f020227b23',
    name: 'hi19hi19',
  };

  // const level = {
  //   _id: '6503ec90cacd2a6899641e12',
  //   isRanked: true,
  //   leastMoves: 44,
  //   name: 'Your Hats Look Different Today',
  //   slug: 'mathmasterzach/your-hats-look-different-today',
  // };

  // const user = {
  //   _id: '636dbd2a0bf3aa9c6f6810ea',
  //   name: 'mathmasterzach',
  // };

  const color = userMoves === undefined ? undefined : userMoves === level.leastMoves ? 'rgb(0, 200, 0)' : 'rgb(230, 200, 20)';

  return (
    <div className='flex flex-wrap justify-center gap-8 items-center'>
      <div className='pb-3 rounded-lg flex flex-col gap-2 w-64 max-w-full h-fit hover:bg-neutral-300 dark:hover:bg-neutral-700 transition p-1 text-left'>
        <a
          className='border-2 border-neutral-300 dark:border-neutral-700 background rounded-md bg-cover bg-center w-full relative overflow-hidden'
          href={`https://pathology.thinky.gg/level/${level.slug}`}
          rel='noreferrer'
          style={{
            aspectRatio: '40 / 21',
            backgroundImage: `url("https://pathology.thinky.gg/api/level/image/${level._id}")`,
            borderColor: color,
          }}
          target='_blank'
        >
          <div
            className='text-xs absolute bottom-0 right-0 px-1 bg-black font-bold'
            style={{
              color: color ?? 'white',
            }}
          >
            {`${userMoves ?? ''}/${level.leastMoves}`}
          </div>
          {userMoves === level.leastMoves &&
          <div className='absolute top-0 right-0 rounded-bl-md' style={{
            // using theme-modern bg-1 because all images are generated using the modern theme
            backgroundColor: 'rgb(38, 38, 38)',
          }}>
            <Solved />
          </div>
          }
        </a>
        <div className='flex justify-between'>
          <div className='flex gap-3 overflow-hidden'>
            <a aria-label='hi19hi19&apos;s profile' className='h-fit' href={getProfileSlug(user.name)} rel='noreferrer' target='_blank'>
              <ProfileAvatar userId={user._id} />
            </a>
            <h2 className='flex flex-col gap-0.5 overflow-hidden break-words'>
              <a
                className='font-bold line-clamp-2 w-fit max-w-full'
                href={`https://pathology.thinky.gg/level/${level.slug}`}
                rel='noreferrer'
                style={{
                  color: color,
                }}
                target='_blank'
              >
                {level.name}
              </a>
              <FormattedUser
                className='font-medium text-sm gray'
                userName={user.name}
              />
              <div className='flex text-xs items-center gap-1 pt-0.5'>
                <div className='flex justify-center difficultyText truncate'>
                  <div className='truncate'>
                    <span className='pr-1'>📚</span>
                    <span className='italic pr-1' style={{
                      color: 'rgb(253, 241, 2)',
                      textShadow: '1px 1px black',
                    }}>
                      Highschool
                    </span>
                  </div>
                </div>
              </div>
            </h2>
          </div>
          {/* prevent clicking parent level link */}
          <div className='flex flex-col items-center gap-2'>
            <div onClick={e => e.stopPropagation()}>
              <LevelDropdown />
            </div>
            {level.isRanked && <>
              <span className='font-normal text-lg cursor-pointer'>
              🏅
              </span>
            </>}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 p-4 border border-neutral-300 dark:border-neutral-700 rounded-xl'>
        <button
          className={classNames(
            'px-4 py-2 rounded-md font-medium border transition',
            userMoves === undefined ?
              'border-emerald-500 bg-emerald-400 hover:bg-emerald-300 dark:border-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500' :
              'border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
          )}
          onClick={() => { setUserMoves(undefined);}}
        >
          Unattempted
        </button>
        <button
          className={classNames(
            'px-4 py-2 rounded-md font-medium border transition',
            userMoves === 45 ?
              'border-emerald-500 bg-emerald-400 hover:bg-emerald-300 dark:border-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500' :
              'border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
          )}
          onClick={() => { setUserMoves(45);}}
        >
          Unoptimized
        </button>
        <button
          className={classNames(
            'px-4 py-2 rounded-md font-medium border transition',
            userMoves === 33 ?
              'border-emerald-500 bg-emerald-400 hover:bg-emerald-300 dark:border-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500' :
              'border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
          )}
          onClick={() => { setUserMoves(33);}}
        >
          Solved
        </button>
      </div>
    </div>
  );
}
