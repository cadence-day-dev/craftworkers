"use client";

interface TimesliceData {
  id?: string;
  start_time: string;
  end_time?: string;
  duration_seconds?: number;
  note?: string;
  activity_id?: string;
}

interface WeeklyCalendarProps {
  timeslices: TimesliceData[];
}

export default function WeeklyCalendar({ timeslices }: WeeklyCalendarProps) {
  // Debug: Log all available timeslices and their activity IDs
  console.log('Total timeslices:', timeslices?.length || 0);
  console.log('All activity IDs:', [...new Set(timeslices?.map(t => t.activity_id) || [])]);
  
  // Filter timeslices to only include specific activity ID
  const targetActivityId = '15444261-b618-417a-9cf2-77f4744a92d4';
  const octoberTimeslices = timeslices.filter(timeslice => {
    const matches = timeslice.activity_id === targetActivityId;
    if (matches) {
      console.log('Found matching activity:', timeslice.activity_id, timeslice.start_time);
    }
    return matches;
  });
  
  console.log('Filtered timeslices count:', octoberTimeslices.length);
  const timeSlots = Array.from({ length: 26 }, (_, i) => {
    const hour = 7 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  });

  // Generate all 31 days of October 2025
  const getWeekDays = () => {
    const octoberDays = [];
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2025, 9, day); // October is month 9 (0-indexed)
      const dateStr = date.toISOString().split('T')[0];
      const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const dayName = dayNames[date.getDay()];
      const month = date.getMonth() + 1;
      const dayNum = date.getDate();
      
      octoberDays.push({
        label: `${dayName} ${month}/${dayNum}`,
        date: dateStr
      });
    }
    return octoberDays;
  };

  const weekDays = getWeekDays();

  // Debug output
  console.log('All timeslices:', timeslices?.length || 0);
  console.log('October timeslices:', octoberTimeslices?.length || 0);
  console.log('Generated week days:', weekDays);

  const analyzePatterns = () => {
    const activityPatterns = new Map<string, number>();
    const timeSlotPatterns = new Map<string, number>();
    const dayTimePatterns = new Map<string, number>();

    octoberTimeslices.forEach(timeslice => {
      const startDate = new Date(timeslice.start_time);
      const timeKey = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
      const dayOfWeek = startDate.getDay();
      const dayTimeKey = `${dayOfWeek}-${timeKey}`;
      
      const activityKey = timeslice.activity_id || timeslice.note || 'unnamed';
      
      activityPatterns.set(activityKey, (activityPatterns.get(activityKey) || 0) + 1);
      timeSlotPatterns.set(timeKey, (timeSlotPatterns.get(timeKey) || 0) + 1);
      dayTimePatterns.set(dayTimeKey, (dayTimePatterns.get(dayTimeKey) || 0) + 1);
    });

    return { activityPatterns, timeSlotPatterns, dayTimePatterns };
  };

  const { activityPatterns, timeSlotPatterns, dayTimePatterns } = analyzePatterns();

  const getTimeslicesForSlot = (dayDate: string, timeSlot: string) => {
    const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
    const slotStartMinutes = slotHour * 60 + slotMinute;
    const slotEndMinutes = slotStartMinutes + 30;

    return octoberTimeslices.filter(timeslice => {
      const startDate = new Date(timeslice.start_time);
      const startDateStr = startDate.toISOString().split('T')[0];
      
      // Check if dates match
      if (startDateStr !== dayDate) {
        return false;
      }

      const startHour = startDate.getHours();
      const startMinute = startDate.getMinutes();
      const startTotalMinutes = startHour * 60 + startMinute;

      // Calculate end time
      const endDate = timeslice.end_time ? 
        new Date(timeslice.end_time) : 
        new Date(startDate.getTime() + (timeslice.duration_seconds ? timeslice.duration_seconds * 1000 : 30 * 60 * 1000));
      
      const endHour = endDate.getHours();
      const endMinute = endDate.getMinutes();
      const endTotalMinutes = endHour * 60 + endMinute;

      // Check if timeslice overlaps with this slot
      return startTotalMinutes < slotEndMinutes && endTotalMinutes > slotStartMinutes;
    });
  };

  const getRepeatabilityLevel = (timeslice: TimesliceData) => {
    const activityKey = timeslice.activity_id || timeslice.note || 'unnamed';
    const startDate = new Date(timeslice.start_time);
    const timeKey = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const dayOfWeek = startDate.getDay();
    const dayTimeKey = `${dayOfWeek}-${timeKey}`;

    const activityCount = activityPatterns.get(activityKey) || 1;
    const timeSlotCount = timeSlotPatterns.get(timeKey) || 1;
    const dayTimeCount = dayTimePatterns.get(dayTimeKey) || 1;

    // Use different thresholds and combine multiple factors
    const totalOccurrences = activityCount + timeSlotCount + dayTimeCount;
    
    // More nuanced scoring
    if (activityCount >= 3 && timeSlotCount >= 2) return 'high';
    if (totalOccurrences >= 8) return 'high';
    if (totalOccurrences >= 5 || activityCount >= 2) return 'medium';
    return 'low';
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-[2400px]">
          <div className={`grid gap-0 border border-gray-200 overflow-hidden shadow-sm`} style={{gridTemplateColumns: `120px repeat(${weekDays.length}, 1fr)`}}>
          <div className="bg-white p-3 border-r border-gray-200 text-sm font-semibold text-gray-700"></div>
          {weekDays.map((day) => (
            <div key={day.date} className="bg-white p-3 border-r border-gray-200 text-sm font-normal text-gray-700 text-center">
              {day.label}
            </div>
          ))}
          
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="contents">
              <div className="p-3 border-r border-b border-gray-200 text-sm text-gray-500 font-medium">
                {timeSlot}
              </div>
              {weekDays.map((day) => {
                const dayTimeslices = getTimeslicesForSlot(day.date, timeSlot);
                if (dayTimeslices.length > 0) {
                  console.log(`Found ${dayTimeslices.length} timeslices for ${day.date} ${timeSlot}:`, dayTimeslices);
                }
                return (
                  <div key={`${day.date}-${timeSlot}`} className="border-r border-b border-gray-200 h-12 relative bg-white hover:bg-gray-50 transition-colors">
                    {dayTimeslices.map((timeslice, index) => (
                      <div
                        key={timeslice.id || index}
                        className={`absolute inset-1 bg-black cursor-pointer`}
                        title={`${timeslice.note || 'Activity'} - ${new Date(timeslice.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}