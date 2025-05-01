import React from 'react';
import ScheduleHeader from '../components/ScheduleHeader';
import ScheduleGameList from '../components/ScheduleGameList';
export default function Schedule() {
    return (
      <div className='schedule' style={{height: '100%'}}>
        <ScheduleHeader />
        <ScheduleGameList />
      </div>
        
      );
}