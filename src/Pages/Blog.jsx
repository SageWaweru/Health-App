import { useTheme } from "../Context/ThemeContext";
import Footer from "../Components/Footer";

function Blog() {
  const { theme } = useTheme();

  const blogs = [
    {
      name: "15 benefits of drinking water",
      description:
        "Drinking water has numerous benefits. Water is crucial for many bodily functions, such as lubricating the joints, delivering oxygen throughout the body, preventing kidney damage, and more...",
      url: "https://www.medicalnewstoday.com/articles/290814",
    },
    {
        name: "Exercise: 7 benefits of regular physical activity",
        description:
          "You know exercise is good for you, but do you know how good? From boosting your mood to improving your sex life, find out how exercise can improve your life...",
        url: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise/art-20048389",
      },
      {
        name: "The Importance of Mental Health",
        description:
          "Your mental health is an important part of your well-being. This aspect of your welfare determines how you’re able to operate psychologically, emotionally, and socially among others...",
        url: "https://www.verywellmind.com/the-importance-of-mental-health-for-wellbeing-5207938",
      },
      {
        name: "15 benefits of drinking water",
        description:
          "Drinking water has numerous benefits. Water is crucial for many bodily functions, such as lubricating the joints, delivering oxygen throughout the body, preventing kidney damage, and more...",
        url: "https://www.medicalnewstoday.com/articles/290814",
      },
      {
        name: "15 benefits of drinking water",
        description:
          "Drinking water has numerous benefits. Water is crucial for many bodily functions, such as lubricating the joints, delivering oxygen throughout the body, preventing kidney damage, and more...",
        url: "https://www.medicalnewstoday.com/articles/290814",
      },
      {
        name: "15 benefits of drinking water",
        description:
          "Drinking water has numerous benefits. Water is crucial for many bodily functions, such as lubricating the joints, delivering oxygen throughout the body, preventing kidney damage, and more...",
        url: "https://www.medicalnewstoday.com/articles/290814",
      }, 
];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-stone-50 text-black'}`}>
      <h2 className="text-4xl font-semibold mb-4 border-b-2 border-b-cyan-800">HEALTH ARTICLES</h2>

      <section>
        <h2 className="text-3xl mt-8 font-semibold mb-4">
          Learn More About Health With These Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white transition transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:underline"
                >
                  {blog.name}
                </a>
              </h3>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-cyan-800 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-white transition-colors"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Blog;

