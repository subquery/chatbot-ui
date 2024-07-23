import { Conversation } from '@/types/chat';

import localforage from 'localforage';

export const updateConversation = async (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  await saveConversation(updatedConversation);
  await saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = async (conversation: Conversation) => {
  await localforage.setItem(
    'selectedConversation',
    JSON.stringify(conversation),
  );
  // localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = async (conversations: Conversation[]) => {
  // localStorage.setItem('conversationHistory', JSON.stringify(conversations));
  await localforage.setItem(
    'conversationHistory',
    JSON.stringify(conversations),
  );
};
