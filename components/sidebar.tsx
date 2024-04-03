import classNames from 'classnames';
import React from 'react';

interface SidebarLink {
  id: string;
  text: string;
}

interface SidebarProps {
  activeId?: string;
  links: SidebarLink[];
}

export default function Sidebar({ activeId, links }: SidebarProps) {
  return (
    <div className='flex flex-col gap-2 font-medium' id='sidebar'>
      {links.map(link => {
        return (
          <a
            className={classNames('hover:text-rose-500 w-fit', { 'text-rose-500': activeId === link.id })}
            href={`#${link.id}`}
            key={`sidebar-link-${link.id}`}
          >
            {link.text}
          </a>
        );
      })}
    </div>
  );
}
