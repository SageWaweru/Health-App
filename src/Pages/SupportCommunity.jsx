import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { fetchUserSupport } from "../Components/SupportManager";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useTheme } from "../Context/ThemeContext"; // Import theme context
import { div } from "framer-motion/client";

const SupportCommunity = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme context

  const forums = [
    {
      name: "Reddit - Mental Health & Fitness",
      description:
        "Join subreddits like r/mentalhealth, r/fitness, and r/DecidingToBeBetter for support on mental health and fitness.",
      url: "https://www.reddit.com/",
    },
    {
      name: "7 Cups",
      description:
        "Free, anonymous conversations with trained listeners and online therapy options.",
      url: "https://www.7cups.com/",
    },
    {
      name: "Mental Health Forum",
      description:
        "A dedicated forum with discussions on anxiety, PTSD, and other mental health topics.",
      url: "https://www.mentalhealthforum.net/",
    },
    {
      name: "Bodybuilding.com Forums",
      description:
        "Covers fitness topics, workout routines, diet advice, and motivational subforums.",
      url: "https://forum.bodybuilding.com/",
    },
    {
      name: "MyFitnessPal Community",
      description:
        "Forums on fitness, nutrition, and mental well-being for beginners and pros alike.",
      url: "https://community.myfitnesspal.com/",
    },
    {
      name: "Beyond Blue (Australia-based)",
      description:
        "Australian mental health forums covering resilience and youth support.",
      url: "https://www.beyondblue.org.au/forums",
    },
    {
      name: "DailyStrength",
      description:
        "Offers support groups for both mental and physical health topics.",
      url: "https://www.dailystrength.org/",
    },
    {
      name: "NAMI (National Alliance on Mental Illness) Discussion Groups",
      description:
        "A resource for local support groups and mental health resources.",
      url: "https://www.nami.org",
    },
    {
      name: "HealthForum Online",
      description:
        "A resource that offers approved CE courses for mental health professionals on various topics, such as ethics, HIV/AIDS, suicide prevention, and pain management..",
      url: "https://www.healthforumonline.com/",
    },
  ];

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [reply, setReply] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserName(currentUser.displayName || currentUser.email);
        fetchUserSupport(currentUser.uid)
          .then((groups) => {
            setGroupName(groups);
          })
          .catch((error) => {
            console.error("Error fetching support groups", error);
          });
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCreateGroup = () => setIsCreatingGroup(true);

  const handleSubmitGroup = (e) => {
    e.preventDefault();
    if (groupName && groupDescription) {
      const newGroup = { id: Date.now(), name: groupName, description: groupDescription, members: [] };
      setGroups([...groups, newGroup]);
      setGroupName("");
      setGroupDescription("");
      setIsCreatingGroup(false);
    }
  };

  const handleJoinGroup = (groupId) => {
    if (userName.trim() === "") {
      alert("Please enter your name to join the group.");
      return;
    }
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return { ...group, members: [...group.members, userName] };
      }
      return group;
    });
    setGroups(updatedGroups);
    setUserName("");
  };

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    setPosts(savedPosts);
  }, []);

  const savePostsToLocalStorage = (updatedPosts) => {
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPostObj = { userName: userName, content: newPost, replies: [] };
    const updatedPosts = [newPostObj, ...posts];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
    setNewPost("");
  };

  const handleReplySubmit = (e, index) => {
    e.preventDefault();
    const updatedPosts = [...posts];
    updatedPosts[index].replies.push({ content: reply, userName: userName });
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
    setReply("");
  };

  return (
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-stone-50 text-black'}`}>
        <h2 className="text-4xl font-semibold mb-4 border-b-2 border-b-cyan-800">SUPPORT & COMMUNITY</h2>
        <button onClick={toggleTheme} className="mt-4 p-2 bg-blue-500 rounded">
          Toggle Theme
        </button>
    
        <section>
          <h2 className="text-3xl mt-8 font-semibold mb-4">Join Existing Forums</h2>
          <p className="mb-4 font-bold text-base">
            Find support and join discussions on mental health, fitness, and wellness topics through the following forums:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {forums && forums.length > 0 ? (
              forums.map((forum, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md bg-white transition transform hover:scale-105 hover:shadow-lg">
                  <h3 className="text-xl font-bold mb-2">
                    <a href={forum.url} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
                      {forum.name}
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-4">{forum.description}</p>
                  <a href={forum.url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-cyan-800 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-white transition-colors">
                    Visit Forum
                  </a>
                </div>
              ))
            ) : (
              <p>No forums available</p>
            )}
          </div>
        </section>
    
        {/* Forum Posts Section */}
        <h3 className="text-3xl font-semibold mb-2">Our Forum</h3>
        <div className="mx-24 p-6 grid grid-cols-2 gap-5">
          <form onSubmit={handlePostSubmit} className="mb-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share a new topic..."
              className={`w-full p-3 border rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
              rows="4"
              required
            />
            <button type="submit" className={`w-full mt-2 py-2 ${theme === "dark" ? "bg-cyan-600" : "bg-cyan-800"} text-white font-bold rounded-lg transition-colors`}>
              Post
            </button>
          </form>
    
          <div className="space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className={`p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} border rounded-lg shadow-sm`}>
                  <p className="text-lg mb-2">{post.content}</p>
                  <p className="text-sm text-gray-500">Posted by: {post.userName}</p>
    
                  {selectedPostIndex === index ? (
                    <form onSubmit={(e) => handleReplySubmit(e, index)} className="mb-4">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write a reply..."
                        className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
                        rows="3"
                        required
                      />
                      <button type="submit" className={`mt-2 py-1 px-4 ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} text-white rounded-lg`}>
                        Reply
                      </button>
                    </form>
                  ) : (
                    <button onClick={() => setSelectedPostIndex(selectedPostIndex === index ? null : index)} className="text-blue-500 hover:text-blue-700">
                      {post.replies.length > 0 ? "View/Reply" : "Reply"}
                    </button>
                  )}
    
                  <div className="ml-4 mt-2 space-y-2">
                    {post.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className={`p-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} rounded-lg`}>
                        <p className="text-sm text-gray-500">Replied by: {reply.userName}</p>
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>
    
        {/* Support Groups */}
        <div className="support-groups-section">
          <h2 className="text-2xl mt-9 font-bold mb-4">Support Groups</h2>
          <p className="mb-2 font-bold text-base">
            Create and join groups with like-minded people and support each other in your wellness journey:
          </p>
          <button onClick={handleCreateGroup} className="py-2 px-4 bg-cyan-800 hover:bg-cyan-700 text-white rounded-lg mb-4">
            Create a New Group
          </button>
    
          {isCreatingGroup && (
            <form onSubmit={handleSubmitGroup} className="mb-4">
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mx-auto block w-3/4 p-2 rounded-lg mb-2 border-2 border-cyan-800 text-gray-600"
                required
              />
              <textarea
                placeholder="Group Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="mx-auto block w-3/4 p-2 mb-2 rounded-lg border-2 border-cyan-800 text-gray-600"
                required
              ></textarea>
              <button type="submit" className="py-2 px-4 bg-cyan-800 hover:bg-cyan-700 text-white rounded-lg">
                Create Group
              </button>
            </form>
          )}
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups && groups.length > 0 ? (
              groups.map((group) => (
                <div key={group.id} className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl text-gray-600 font-semibold">{group.name}</h3>
                  <p className="text-gray-600">{group.description}</p>
                  <button onClick={() => handleJoinGroup(group.id)} className="mt-2 py-1 px-3 bg-cyan-800 text-white rounded-lg hover:bg-cyan-600">
                    Join Group
                  </button>
    
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full p-2 my-4 border rounded"
                  />
                  <div className="mt-2">
                    <h4 className="font-semibold">Members:</h4>
                    <ul className="list-none ml-4">
                      {group.members.length > 0 ? (
                        group.members.map((member, index) => (
                          <li key={index} className="text-gray-700">{member}</li>
                        ))
                      ) : (
                        <li className="text-gray-700">No members yet</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No groups available</p>
            )}
          </div>
        </div>
      </div>
    );
    };
    

export default SupportCommunity;


