import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pags1 from "./component/pags1";
import Description from "./component/Description";
import TypingEffect from "./component/TypingEffect ";

function App() {
  const [isOpenPage, setIsOpenPage] = useState<boolean>(false);
  const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);
  const OpenPage = () => {
    setIsOpenPage(!isOpenPage);
  };
  const OpenVideo = () => {
    setIsOpenVideo(!isOpenVideo);
  };

  const sectionRefs = useRef<(HTMLElement | null)[]>([]); // Ref สำหรับทุก section
  const [visibleSections, setVisibleSections] = useState<number[]>([]); // เก็บ section ที่มองเห็นได้

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleSections.includes(index)) {
            setVisibleSections((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 } // เริ่มแสดงเมื่อ 10% ของ section เข้าสู่มุมมอง
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visibleSections]);
  const messages = ["เปิดเร็วๆสิ", "มีของขวัญจะให้"];

  return (
    <>
      <div className=" w-screen h-full bg-white flex justify-center py-10 ">
        <div className=" w-[430px] border shadow-lg rounded-lg">
          {!isOpenPage ? (
            <div
              className="h-screen bg-white flex justify-center items-center"
              onClick={OpenPage}
            >
              <div className="relative inline-block">
                <img src="../image/gift.gif" alt="" className="block" />
              </div>
            </div>
          ) : (
            <div className="bg-white h-screen overflow-y-auto py-10">
              <div className="flex justify-center w-full items-center">
                <div className="flex flex-col text-blue-500 font-bold gap-2">
                  <div>
                    <span className="text-7xl">สุขสันต์</span>
                  </div>
                  <div>
                    <span className="text-7xl">วันเกิด</span>
                  </div>
                  <div>
                    <span className="text-3xl">น้องไอซ์ ❤️🧊</span>
                  </div>
                </div>
              </div>
              <div></div>
              <div className="flex flex-row justify-center items-center w-full p-5">
                <Pags1 />
              </div>
              <div>
                <Description />
              </div>
              {isOpenVideo === true ? (
                <div className="p-5">
                  {/* เพิ่มวิดีโอต่อจากข้อความ */}
                  <div className="mt-5">
                    <video
                      className="rounded-lg"
                      autoPlay
                      controls
                      src="../../image/img-gf/HBD.mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ) : (
                isOpenVideo === false && (
                  <div className="p-5" onClick={OpenVideo}>
                    <div className="border w-full rounded-lg h-[250px] p-5 shadow-lg flex flex-col justify-center items-center relative">
                      <TypingEffect text={messages} />
                      <img
                        src="../image/valentines-day.gif"
                        alt=""
                        className="w-[100px] h-[100px]"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
