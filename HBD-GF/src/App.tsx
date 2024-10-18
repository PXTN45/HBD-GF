import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pags1 from "./component/pags1";
import Description from "./component/Description";
import TypingEffect from "./component/TypingEffect ";

function App() {
  const [isOpenPage, setIsOpenPage] = useState<boolean>(false);
  const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);
  const [loading, setLoading] = useState(0);
  const [inputValue, setInputValue] = useState<string>("");
  const correctPassword = "191047"; // รหัสผ่านที่ต้องการ

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
  useEffect(() => {
    if (loading < 100) {
      const timer = setInterval(() => {
        setLoading((prev) => prev + 10); // เพิ่ม 10% ทุก ๆ 1000ms
      }, 1000);

      return () => clearInterval(timer); // ล้าง interval เมื่อ component ถูก unmounted
    } else {
      // setStatus(true);
      setIsOpenPage(true);
    }
  }, [loading]);

  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("openVideo") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleNumberClick = (number: string) => {
    if (inputValue.length < 6) {
      // จำกัดจำนวนหลักที่ป้อน
      setInputValue((prev) => prev + number);
    }
  };

  const handleClear = () => {
    setInputValue(""); // ล้างค่ารหัสผ่าน
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการส่งฟอร์ม
    if (inputValue === correctPassword) {
      setIsOpenVideo(true); // ตั้งค่า isOpenVideo เป็น true
      closeModal(); // ปิดโมดอล
    } else {
      alert("รหัสผ่านไม่ถูกต้อง"); // แจ้งเตือนหากรหัสผ่านไม่ถูกต้อง
    }
  };

  return (
    <>
      <div className=" w-screen h-full bg-white flex justify-center py-10 ">
        <dialog id="openVideo" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">รหัสอะไรนะ ???</h3>
            <p className="py-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 border p-2 rounded text-lg">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="ใส่รหัสผ่านสิจ๊ะ"
                    className="input w-full max-w-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* ปุ่มกดตัวเลข */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <button
                      key={number}
                      className="btn"
                      onClick={() => handleNumberClick(number.toString())}
                    >
                      {number}
                    </button>
                  ))}
                  <button className="btn" onClick={handleClear}>
                    C
                  </button>{" "}
                  {/* ปุ่มล้าง */}
                  <button
                    className="btn"
                    onClick={() => handleNumberClick("0")}
                  >
                    0
                  </button>
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>{" "}
                  {/* ปุ่มส่ง */}
                </div>
              </div>
            </p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
        <div className=" w-[430px] border shadow-lg rounded-lg">
          {!isOpenPage ? (
            <div
              className="h-screen bg-white flex justify-center items-center flex-col"
              // onClick={OpenPage}
            >
              <div className="relative inline-block">
                <img src="../image/gift.gif" alt="" className="block" />
              </div>
              <div>
                <div
                  style={{
                    width: "400px",
                    height: "50px",
                    backgroundColor: "light",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${loading}%`,
                      backgroundColor: "pink",
                      transition: "width 1s",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                <div className="flex justify-center my-5">
                  <p className="text-pink-700 font-bold">Loading: {loading}%</p>
                </div>
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
                  <div className="p-5" onClick={() => openModal("openVideo")}>
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
