export default {

    setReady(state, value){
        state.ready = value;
    },

    setContact(state, contact){
        state.contact = PANDORA_PROTOCOL.KAD.library.bencode.encode( contact.toArray());
        state.contactJSON = contact.toJSON();
        state.contactHex = state.contact.toString('hex')
    }
}