import actions from "./pandora-protocol-actions"
import mutations from "./pandora-protocol-mutations"

export default {

    state: {

        ready: false,

        options: null,

        contact: null,
        contactJSON: null,
        contactHex: '',
    },

    mutations,
    actions,

}