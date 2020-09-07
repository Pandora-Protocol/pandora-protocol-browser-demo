<template>
    <div>

        <span>Contact: </span>
        <div class="block">
            <textarea rows="6" cols="100">{{$store.state.pandoraProtocol.contactHex}}</textarea>
        </div>

        <span>Contact JSON</span>
        <div class="block">
            <textarea rows="9" cols="100">{{$store.state.pandoraProtocol.contactJSON}}</textarea>
        </div>

        <span>Known Contacts</span> <button @click="refreshKnownContacts">Refresh Info!</button>
        <div class="block">
            <textarea rows="9" cols="100">{{knownContacts}}</textarea>
        </div>

        <span>Connected Contacts</span> <button @click="refreshConnectedContacts">Refresh Info!</button>
        <div class="block">
            <textarea rows="9" cols="100">{{connectedContacts}}</textarea>
        </div>

    </div>
</template>

<script>
export default {

    data(){
        return {
            knownContacts: '',
            connectedContacts: '',
        }
    },

    methods: {

        refreshKnownContacts(){

            const contacts = PANDORA_PROTOCOL_NODE.routingTable.array;
            this.knownContacts = contacts.map(it => it.contact.toJSON() );

        },

        refreshConnectedContacts(){

            const connected = {};

            for (const key in PANDORA_PROTOCOL_NODE.rules.alreadyConnected) {
                const node = PANDORA_PROTOCOL_NODE.rules.alreadyConnected[key];
                connected[key] = {
                    type: node.isWebRTC ? 'webrtc' : 'websocket',
                }
            }

            this.connectedContacts = connected;

        }

    },

}
</script>