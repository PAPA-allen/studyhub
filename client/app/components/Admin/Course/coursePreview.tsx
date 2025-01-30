import CoursePlayer from '@/app/utils/coursePlayer';
import React, { FC } from 'react'

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
}

const coursePreview:FC<Props> = ({active,setActive,courseData,handleCourseCreate}) => {

  return (
      <div className="w-[90%] md:w-[90%] m-auto py-5 mb-5">
          <div className="w-full relative">
              <div className="w-full mt-10">
                  <CoursePlayer
                      videoUrl={courseData?.demoUrl}
                      title={courseData?.title} />
              </div>
          </div>
    </div>
  )
}

export default coursePreview