import { Post } from "@/atoms/postsAtom";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PageContent from "@/components/Layout/PageContent";
import Loader from "@/components/Posts/Loader";
import PostItem from "@/components/Posts/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onSelectPost, onVote } = usePosts();
  const buildUserHomeFeed = () => { };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);

      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))

    } catch (error: any) {
      console.log("BuildNoUserHomeFeed Error", error.message)
    }
    setLoading(false)

  };

  const getUserPostVotes = () => { };

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <Loader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDeletePost={onDeletePost}
                onSelectsPost={onSelectPost}
                onVote={onVote}
                userVoteValue={postStateValue.postVotes.find(
                  (item) => item.postId === post.id
                )?.voteValue}
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>

      <>

      </>
    </PageContent>
  )
};

export default Home;