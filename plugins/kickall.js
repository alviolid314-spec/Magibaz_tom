const isAdmin = global.isAdmin;

module.exports = {
  config: {
    name: 'kickall',
    aliases: ['remove'],
    permission: 3,
    prefix: true,
    categorie: 'Moderation',
    credit: 'Developed by Mohammad Nayan
    description: 'Kick users or all members from the group.',
    usages: [
      `${global.config.PREFIX}kick @user`,
      `${global.config.PREFIX}kick (reply)`,
      `${global.config.PREFIX}kickall`,
    ]
  },

  start: async ({ event, api }) => {
    const { threadId, senderId, mentions, body, message } = event;
    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

    if (!isBotAdmin) {
      return api.sendMessage(threadId, { text: 'Please make the bot an admin first.' });
    }

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: 'Only group admins can use this command.' });
    }

    const replyMessage = message?.extendedTextMessage?.contextInfo;

    // 🔥 KICK ALL
    if (body.toLowerCase() === `${global.config.PREFIX}kickall`) {
      const groupInfo = await api.groupMetadata(threadId);
      const participants = groupInfo.participants;

      const botID = api.getCurrentUserID();

      const toKick = participants
        .filter(user => !user.admin) // keep admins safe
        .map(user => user.id)
        .filter(id => id !== botID); // don't kick bot

      if (toKick.length === 0) {
        return api.sendMessage(threadId, { text: 'No members to kick.' });
      }

      await api.groupParticipantsUpdate(threadId, toKick, 'remove');
      return api.sendMessage(threadId, { text: 'All non-admin members have been kicked.' });
    }

    // ✅ REPLY KICK
    if (replyMessage && replyMessage.participant) {
      await api.groupParticipantsUpdate(threadId, [replyMessage.participant], 'remove');
      return api.sendMessage(threadId, { text: 'User has been kicked.' });
    }

    // ✅ MENTION KICK
    if (mentions.length > 0) {
      await api.groupParticipantsUpdate(threadId, mentions, 'remove');
      return api.sendMessage(threadId, { text: 'User(s) have been kicked.' });
    }

    return api.sendMessage(threadId, { text: 'Reply or mention users to kick.' });
  },
};
