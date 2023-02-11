import { Post, postState } from '@/atoms/postsAtom';
import { firestore, storage } from '../firebase/clientApp';
import { useRecoilState } from 'recoil';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => { };

    const onSelectPost = () => { };

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            //Check if image, delete if exists
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            // Delete post document from storage
            const postDocRef = doc(firestore, "posts", post.id);
            await deleteDoc(postDocRef);

            // update recoil state
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id! == post.id)
            }))
            return true;
        } catch (error: any) {
            return false;
        }
    };

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
};

export default usePosts;