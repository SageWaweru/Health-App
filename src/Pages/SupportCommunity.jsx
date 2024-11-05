{/* <h1>
Community Forum: Community forum homepage with categories, user posts, and comments.
</h1> */}
import {useState} from "react"

const SupportCommunity = ()=> {
    const [forums, setForums] = useState([]);
    const [groups, setGroups] = useState([]);
    const [peerSupportRequests, setPeerSupportRequests] = useState([]);
    const [qaSessions, setQaSessions] = useState([]);
    const [challenges, setChallenges] = useState([]);

    const handleNewPost= (post)=>{
        setForums([...setForums, post]);
    };

    const handleNewGroup = (group)=>{
        setGroups([...groups, group]);
    };

    const handlePeerSupportRequest = (request)=>{
        setPeerSupportRequests([...peerSupportRequests, request]);
    };
    const handleNewQaSession= (session)=>{
        setQaSessions([...qaSessions, session ]);
    };
    const handleNewChallenge = (challenge)=>{
        setChallenges([...challenges, challenge]);
    };

    return(
        <div className="">
            <h2 className="text-3xl font-semibold mb-4">Support & Community</h2>
            <section>
                <h3 className="text-2xl font-semibold mb-2">Forums</h3>
                <div>
                    {forums.map((post, index)=>(
                        <div key={index} className="post">
                           <p>{post.content}</p>
                           <small>{post.author}</small>
                        </div>
                    ))}
                    <button onClick={()=>handleNewPost({content:"New Post", author:"user"})} className="w-60 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Add Post
                    </button>
                </div>
            </section>
            <section className="support-groups">
                <h3 className="text-2xl font-semibold mb-2">Support Groups</h3>
                <div>
                    {groups.map((group, index)=>(
                       <div key={index} className="group">
                        <h4>{group.name}</h4>
                        <p>{group.description}</p>
                       </div>
                    ))}
                    <button onClick={()=> handleNewGroup({name:"New Group", description:"Group Description"})} className="w-60 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Create Group
                    </button>
                </div>

            </section>
            <section>
                <h3 className="text-2xl font-semibold mb-2">Peer Support</h3>
                <div>
                    {peerSupportRequests.map((request, index)=>(
                        <div key={index} className="request">
                            <p>{request}</p>
                        </div>
                    ))}
                    <button onClick={()=> handlePeerSupportRequest("New Peer Support Request")}className="w-60 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Request Peer Support
                    </button>
                </div>
            </section>
            {/* Q&A */}
            <section className="qa-session">
                <h3 className="text-2xl font-semibold mb-2">Expert Q&A</h3>
                <div>
                    {qaSessions.map((session, index)=>(
                        <div key={index} className="qa-session">
                            <h4>{session.title}</h4>
                            <p>{session.expert}</p>
                            <p>{session.date}</p>
                        </div>
                    ))}
                    <button onClick={()=> handleNewQaSession({title:"New Q&A Session", expert:"Expert Name", date:"Date"})} className="w-60 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Schedule Q&A
                    </button>
                </div>
            </section>
            {/* Community Challenges */}
            <section className="community-challenges">
                <h3 className="text-2xl font-semibold mb-2">Community Challenges</h3>
                <div>
                    {challenges.map((challenge, index)=>(
                        <div key={index} className="challenge">
                            <h4>{challenge.title}</h4>
                            <p>{challenge.description}</p>
                            <p>{challenge.duration}</p>
                        </div>
                    ))}
                    <button onClick={()=> handleNewChallenge({title:"New Challenge", description:"Challenge Description", duration:"Duration"})} className="w-60 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Create Challenge
                    </button>
                </div>
            </section>

        </div>

    );
};
export default SupportCommunity;