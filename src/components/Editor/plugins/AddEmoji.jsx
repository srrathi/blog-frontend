/* eslint-disable implicit-arrow-linebreak */
import EMOJIS from "../../../utils/emojis";

const emojiPlugin = {
    name: "emoji",
    title: "Add Emoji",
    display: "submenu",
    dataDisplay: "command",
    innerHTML: `<div style="font-size: 18px">🙂</div>`,
    add(core, targetElement) {
        const context = core.context;
        context.customSubmenu = {
            targetButton: targetElement,
        };

        // Generate submenu HTML
        // Always bind "core" when calling a plugin function
        const listDiv = this.setSubmenu(core);

        // You must bind "core" object when registering an event.
        /** add event listeners */
        listDiv
            .querySelector(".emoji-btn")
            .addEventListener("click", this.onClick.bind(core));

        // @Required
        // You must add the "submenu" element using the "core.initMenuTarget" method.
        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);
    },

    setSubmenu(core) {
        const listDiv = core.util.createElement("DIV");
        // @Required
        // A "se-submenu" class is required for the top level element.
        listDiv.className = "se-menu-container se-submenu se-list-layer";
        listDiv.innerHTML = `
      <div class="se-list-inner emoji-btn">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(25px, 1fr)); gap: 5px; width: 300px; height: 250px; overflow-y: scroll; overflow-x: hidden; background-color: white;">
        ${EMOJIS.map(
            (emoji) =>
                `<span key="${emoji}" style="cursor: pointer;" data-emoji="${emoji}">${emoji}</span>`
        ).join("")}
    </div> 
    </div>`;

        return listDiv;
    },

    // @Override core
    // Plugins with active methods load immediately when the editor loads.
    // Called each time the selection is moved.
    active(element) {
        // If no tag matches, the "element" argument is called with a null value.
        if (!element) {
            this.util.removeClass(this.context.customSubmenu.targetButton, "active");
        }

        return false;
    },

    onClick(evt) {
        const emoji = evt?.target?.dataset?.emoji;
        if (!emoji) return;

        this.functions.insertHTML(
            `<span>${emoji}</span>`,
            true
        );

        this.submenuOff();
        this.focus();
    },
};

export default emojiPlugin;