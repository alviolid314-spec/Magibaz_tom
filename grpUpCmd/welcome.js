module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;
      const welcomeMessage = `🎉✨ *Hey ${username}, Welcome to ${groupName}!* ✨🎉\n\n` +
        `🚀 You just landed in an awesome group!\n` +
        `👥 *Total Members:* ${totalMembers}\n` +
        `📢 *Rules:* Be respectful, stay active & enjoy
        
        
        *╰─➤ Powered by* Mᴏʜᴀᴍᴍᴀᴅ ⎯͢⎯⃝ Rꫝʜɪ__Bʜꫝɪ__ᥫᩣ!`;


      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: welcomeMessage,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text: welcomeMessage,
          mentions: [member]
        });
      }
    }
  }
};
