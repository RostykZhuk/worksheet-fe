import { WorksheetTasksData } from "../../utils/DAL/api";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { WorksheetTask } from "./WorksheetTask";

SwiperCore.use([Navigation, Pagination]);

export const MainContent = ({ tasks }: { tasks: WorksheetTasksData }) => {
  return (
    <main>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        {tasks.tasks.map((task, index) => (
          <SwiperSlide key={task.id}>
            <WorksheetTask task={task} number={index + 1}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};
