import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
    communityId: string;
    creatorDisplayName: string;
    creatorId: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    communityImageURL?: string;
    createdAt?: Timestamp;
    editedAt?: Timestamp;
};

interface PostState {
    selectedPost: Post | null,
    posts: Post[];
    //postVotes
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
};

export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState
})