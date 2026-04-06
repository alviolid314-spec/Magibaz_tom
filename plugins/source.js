const axios = require('axios');

module.exports = {
  config: {
    name: 'sc',
    aliases: ['source', 'github'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by TOM-PRIME-X',
    usages: [
      `${global.config.PREFIX}sc - Show detailed GitHub repo info.`,
      `${global.config.PREFIX}source - Alias for sc.`,
      `${global.config.PREFIX}github - Alias for sc.`
    ]
  },
  start: async ({ event, api }) => {
    // এখানে আপনার নিজের গিটহাব ইউজারনেম এবং রিপোজিটরি নাম বসানো হয়েছে
    const repoOwner = 'alviolid314-spec';
    const repoName = 'Magibaz_tom';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    

    try {
      const response = await axios.get(apiUrl);
      const repo = response.data;

      const text = 
        `🤖 *Bot Connected Successfully!*\n\n` +
        `⏰ *Time:* 4/6/2026, 4:29:25 PM\n` +
        `✅ *Status:* Online and Ready!\n\n` +
        `Start Follow ⭐ to our github:\n` +
        `https://github.com/${repoOwner}\n\n` +
        `Give a Star\n` +
        `https://github.com/${repoOwner}/${repoName}\n\n` +
        `📺 *Subscribe YouTube:* \n` +
        `https://youtube.com/@saycotom\n\n` +
        `📦 *Repository Info*\n` +
        `*Name:* 𝐓𝐎𝐌 𝐏𝐎𝐖𝐄𝐑 𝐁𝐎𝐓\n` +
        `*Stars:* ⭐ ${repo.stargazers_count}\n` +
        `*Forks:* 🍴 ${repo.forks_count}\n` +
        `*Language:* ${repo.language || 'N/A'}\n\n` +
        `🔗 [View on GitHub](${repo.html_url})`;

      await api.sendMessage(event.threadId, { text }, { quoted: event.message });

    } catch (error) {
      console.error(error);
      const errorText = 
        `🤖 *Bot Connected Successfully!*\n\n` +
        `✅ *Status:* Online and Ready!\n\n` +
        `📺 *YouTube:* https://youtube.com/@saycotom\n` +
        `🔗 *GitHub:* https://github.com/alviolid314-spec\n\n` +
        `Failed to fetch latest repo stats.`;
      
      await api.sendMessage(event.threadId, { text: errorText }, { quoted: event.message });
    }
  }
};
