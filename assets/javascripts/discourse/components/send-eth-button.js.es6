import showModal from "discourse/lib/show-modal";
import computed from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
  tagName: "span",

  @computed("model.can_do_eth_transaction")
  disabled(canDoTransaction) {
    return ( !canDoTransaction || (typeof window.web3 == "undefined") || !web3.eth.accounts.includes(this.currentUser.get("ethereum_address")) );
  },

  actions: {
    showSendEthModal() {
      if (this.get("disabled")) return;
      showModal("send-eth", { model: this.get("model") });

      if (this.get("close")) this.sendAction("close");
    }
  }
});