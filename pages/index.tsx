import React from 'react';
import SS from '../components/icons/ss';

export default function Index() {
  return (<>
    <div className='flex items-center justify-center text-center font-semibold text-7xl' style={{
      height: 'calc(100vh - 140px)',
      minHeight: 300,
    }}>
      <div className='flex w-48 h-48 relative'>
        <div className='absolute w-full h-full text-white ssoverlay' style={{
          mixBlendMode: 'overlay',
        }}>
          <SS />
        </div>
        <div className='absolute w-full h-full animateSSPath text-transparent stroke-white' style={{
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 0.25,
        }}>
          <SS />
        </div>
      </div>
    </div>
    <div className='flex flex-col items-center my-16 mx-8 gap-8 text-center'>
      <span className='text-6xl font-light'>Spencer Spenst</span>
      <span className='text-2xl font-light'>Software Engineer</span>
      <span className='text-md'>Vancouver, BC</span>
    </div>
  </>);
}
