import { Community } from '../../atoms/communitiesAtom';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';

type PostsProps = {
    communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [loading, setLoading] = useState(false);
    const { postStateValue, setPostStateValue } = usePosts();

    //useAuthState

    const getPosts = async () => {
        try {
            // get posts for this community 
            const postsQuery = query(
                collection(firestore, "posts"),
                where("communityId", "==", communityData.id),
                orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postsQuery);

            // store in post state
            const posts = postDocs.docs.map(
                (doc) => ({
                    id: doc.id, ...doc.data()
                })
            );
            console.log("posts", posts);
        } catch (error: any) {
            console.log("getPosts error", error.message);
        }
    };


    useEffect(() => {
        getPosts();
    }, []);

    return <div>Have a good coding</div>
}
export default Posts;