import React from 'react';

export default function Background() {
  return (<>
    {/* radial gradient background */}
    <div className='absolute w-full opacity-70' style={{
      height: '100lvh',
      zIndex: -1,
    }}>
      {/* green */}
      <div className='absolute h-full w-full opacity-80' style={{
        backgroundImage: 'radial-gradient(at 90% 90%, rgb(144, 230, 103), transparent)',
      }} />
      {/* red */}
      <div className='absolute h-full w-full opacity-90' style={{
        backgroundImage: 'radial-gradient(at 90% 20%, rgb(255, 50, 0), transparent)',
      }} />
      {/* blue */}
      <div className='absolute h-full w-full opacity-50' style={{
        backgroundImage: 'radial-gradient(at 0% 10%, rgb(146, 215, 225), transparent, transparent)',
      }} />
      {/* pink */}
      <div className='absolute h-full w-full' style={{
        backgroundImage: 'radial-gradient(at 0% 90%, rgb(255, 172, 200), transparent, transparent)',
      }} />
      {/* orange */}
      <div className='absolute h-full w-full opacity-30' style={{
        backgroundImage: 'radial-gradient(at 30% 50%, rgb(255, 172, 0), transparent)',
      }} />
      {/* beige */}
      <div className='absolute h-full w-full opacity-30' style={{
        backgroundImage: 'radial-gradient(at 20% 10%, rgb(255, 197, 104), transparent)',
      }} />
      {/* black */}
      <div className='absolute h-full w-full opacity-80 background-radial' />
      <div className='absolute h-full w-full background-bottom' />
    </div>
    {/* noise layer above bg gradient */}
    <div className='fixed w-full opacity-20 bg-repeat' style={{
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 80px, black 80px)',
      backgroundImage: 'url(noise.png)',
      height: '100lvh',
      maskImage: 'linear-gradient(to bottom, transparent 80px, black 80px)',
      zIndex: -1,
    }} />
  </>);
}
