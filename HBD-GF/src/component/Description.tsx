import TypingEffect from "./TypingEffect ";

const messages = ["สุขสันต์วันเกิด", "เด็กกาโปก ❤️"];

const Description = () => {
  return (
    <div className="p-5">
      <div className="flex justify-center items-center text-blue-400 my-5 h-[30px]">
        <TypingEffect text={messages} />
      </div>
      <div className="border rounded-lg h-[250px] p-5 shadow-lg">
        <span className="text-pink-600">
          สุขสันต์วันเกิดนะคุณแฟน! 🎂💖 ขอให้วันนี้และทุกๆ วันเต็มไปด้วยความสุข
          ความรัก และเสียงหัวเราะ ขอบคุณที่เป็นคนพิเศษของเรา
          และที่อยู่เคียงข้างกันเสมอ ขอให้ทุกความฝันของคุณเป็นจริง
          และเราจะอยู่ข้างๆ คุณเสมอในทุกช่วงเวลาของชีวิต รักคุณมากๆ นะ 💕😊🎉
        </span>
      </div>
    </div>
  );
};

export default Description;
