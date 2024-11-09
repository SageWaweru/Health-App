
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import Footer from '../Components/Footer'


function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const cardData = [
    {
      imgSrc: "src/images/MH.PNG",
      title: "Mental Health Resources",
      description:
        "Utilize a mood tracker and journaling tools to support your mental well-being.",
      link:'./auth'
    },
    {
      imgSrc: "src/images/pexels-pixabay-262438.jpg",
      title: "Goal Setting",
      description:
        "Set actionable goals, track your progress, and stay motivated on your journey to personal growth.",
      link:'./auth'
    },
    {
      imgSrc: "src/images/pexels-john-tekeridis-21837-14843494.jpg",
      title: "Fitness Programs",
      description:
        "Discover fitness plans tailored to your goals and start your journey to a healthier lifestyle.",
      link:'./auth'
    },
    {
      imgSrc: "src/images/pexels-anastasia-shuraeva-9501978.jpg",
      title: "Community Support",
      description:
        "Join a community of like-minded individuals to share and support one another.",
      link:'./auth'
    },
  ];
  return (

    <div className="flex flex-col w-full items-center bg-cyan-900 min-h-screen">
      <div className="text-white font-bold text-2xl mt-10">
        <TypeAnimation
          sequence={[
            "Welcome to Mental and Fitness Wellness",
            1000,
            "Spreading mental awareness",
            1000,
            "Encouraging physical fitness",
            1000,
            "Walking you through a self-growth journey",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-16 w-9/12">
  {cardData.map((card, index) => (
   <a href={card.link} key={index} className="block">
    <motion.div
      key={index}
      className="p-4 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={card.imgSrc}
        alt={card.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-xl font-semibold mt-4 text-cyan-800">
        {card.title}
      </h3>
      <p className="text-gray-600 mt-2">{card.description}</p>
    </motion.div>
    </a>
  ))}
</section>


      <TypeAnimation
        sequence={[
          "Explore our platform for personalized mental health and fitness tools designed to improve your well-being.",
          1000,
        ]}
        wrapper="span"
        speed={50}
        className="text-xl text-white max-w-2xl"
        repeat={Infinity}
      />

      <section className="my-16 w-full md:w-8/12 lg:w-6/12">
        <div className="p-6 w-full bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-4 text-cyan-800">
            About Us
          </h2>
          <p className="font-medium text-gray-600">
          Our platform is dedicated to helping you achieve a 
          balanced and healthy lifestyle by providing tools and 
          resources for both mental and physical wellness. With our
           mood tracker and journaling platform, you can track
            your emotional well-being, reflect on your daily 
            experiences, and identify patterns that promote 
            self-awareness and growth. Our fitness section offers
             a variety of resources, workout plans, and guidance to
              help you improve your physical health and stay active. 
              Additionally, our goal-setting platform allows you to 
              set clear, achievable objectives, track your progress, 
              and stay motivated, ensuring that every step of your wellness
               journey is supported. Whether you are working on mental clarity, physical fitness, 
               or personal goals, our platform provides the tools you
                need to thrive in all aspects of your life.
          </p>
        </div>
      </section>

      <div className="relative inline-block">
        <button className=" text-white p-6 font-bold  mb-28 text-1xl rounded relative z-10" onClick={handleLogin}>
          Login
        </button>
        <div className="absolute inset-0 border-2 border-orange-700 rounded mb-28 animate-border-spin"></div>
      </div>

     

    <div className="mb-7 text-white">
      <Footer/>

    </div>
    </div>
  );
}

export default Home;
