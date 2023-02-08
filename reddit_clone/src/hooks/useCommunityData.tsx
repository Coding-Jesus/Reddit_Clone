import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/clientApp';
import { getDocs, collection, writeBatch, doc, increment } from 'firebase/firestore';
import { AuthModalState } from '@/atoms/authModalAtom';

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {
        // is the user signed in?
        // if not => open auth modal
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        setLoading(true);
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            //get users snippets
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );

            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }));

            console.log("here are my snippets", snippets)
        } catch (error: any) {
            console.log("getMySnippet error", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const joinCommunity = async (communityData: Community) => {
        // Batch write

        try {
            const batch = writeBatch(firestore);

            // Creating a new community snippet
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            };

            batch.set(
                doc(
                    firestore, `users/${user?.uid}/communitySnippets`, communityData.id
                ),
                newSnippet
            );

            // Updateing the numberOfMembers (+1)
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1),
            });

            await batch.commit();

            // update recoil state - communityState.mySnippets

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }));

        } catch (error: any) {
            console.log("joinCommunity error", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        // Batch write
        try {
            const batch = writeBatch(firestore);

            // Deleting the community snippet from user
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
            );
            // Updateing the numberOfMembers (-1)
            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1),
            });

            // update recoil state - communityState.mySnippets
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));

            await batch.commit();

        } catch (error: any) {
            console.log("leaveCommunity error", error);
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    };
};
export default useCommunityData;