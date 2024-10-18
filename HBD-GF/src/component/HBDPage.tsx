import Lottie from 'lottie-react';
import birthdayAnimation from '../assets/birthday-animation.json'; // เส้นทางนำเข้าที่ถูกต้อง

const HBDPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">
      <Lottie animationData={birthdayAnimation} loop={true} className="w-60 h-60" />
      <h1 className="text-white text-5xl font-bold mt-5">สุขสันต์วันเกิด!</h1>
    </div>
  );
};

export default HBDPage;
