import React from 'react';
import SS from '../components/icons/ss';

export default function Index() {
  return (<>
    <div className='flex items-center justify-center text-center font-semibold text-7xl' style={{
      height: 'calc(100vh - 120px)',
      minHeight: 300,
    }}>
      <div className='flex w-48 h-48 animateSSPath text-transparent stroke-white' style={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 0.15,
      }}>
        <SS />
      </div>
    </div>
    <div className='flex flex-col items-center my-16 mx-8 gap-6 text-center'>
      <span className='text-5xl font-light'>Spencer Spenst</span>
      <span className='text-xl font-light'>Software Engineer</span>
      <span className='text-sm'>Vancouver, BC</span>
    </div>
  </>);
}
