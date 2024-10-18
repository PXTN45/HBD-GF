import React, { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string[]; // รับเป็น array ของ string
}

const TypingEffect: React.FC<TypingAnimationProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isDeleting) {
          // ถ้าอยู่ในโหมดลบ
          setDisplayText((prev) => prev.slice(0, -1));
          if (displayText === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % text.length);
          }
        } else {
          // ถ้าอยู่ในโหมดพิมพ์
          if (displayText.length < text[index].length) {
            setDisplayText((prev) => prev + text[index][displayText.length]);
          } else {
            setIsDeleting(true);
          }
        }
      },
      isDeleting ? 100 : 200
    ); // ความเร็วในการพิมพ์และลบ

    return () => clearInterval(interval);
  }, [displayText, isDeleting, index, text]);

  return (
    <div>
      <span className="text-2xl font-bold">{displayText}</span>
    </div>
  );
};

export default TypingEffect;
