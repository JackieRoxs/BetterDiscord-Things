/**
 * @name Discord Experiments
 * @author JackieRoxs
 * @description Legit just enables discord experiments. Code is from https://gist.github.com/MeguminSama/2cae24c9e4c335c661fa94e72235d4c4 I was just too lazy to open console everytime
 * @version 0.0.1
 */

module.exports = class DiscordExperiments {
  constructor(meta) {
    // Do stuff in here before starting
	
  }

  start() {
    // Do stuff when enabled
	const code = `
            webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=Object.values(r.c)]);
            var UserStore = cache.find(m => m?.exports?.default?.getCurrentUser).exports.default;
            var actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
            var user = UserStore.getCurrentUser();
            actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
                type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
            });
            actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
            webpackChunkdiscord_app.pop();
            user.flags &= ~1;
        `;

        // Create a <script> element and inject the code
        const script = document.createElement("script");
        script.appendChild(document.createTextNode(code));
        document.head.appendChild(script);
  }

  stop() {
    // Cleanup when disabled
  }
};