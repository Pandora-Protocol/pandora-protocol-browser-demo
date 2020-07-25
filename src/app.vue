<template>
    <div>

        <router-view></router-view>

    </div>
</template>

<script>
export default {

    mounted(){

        const protocol = PANDORA_PROTOCOL.KAD.ContactAddressProtocolType.CONTACT_ADDRESS_PROTOCOL_TYPE_WEBSOCKET;
        const store = new PANDORA_PROTOCOL.KAD.storage.StoreMemory();

        const privateKey = PANDORA_PROTOCOL.KAD.helpers.ECCUtils.createPrivateKey();
        const publicKey = PANDORA_PROTOCOL.KAD.helpers.ECCUtils.getPublicKey(privateKey);


        const contact = [
            0,
            Buffer.alloc( KAD_OPTIONS.NODE_ID_LENGTH ), //empty identity
            protocol,
            '127.0.0.1',
            80,
            '',
            publicKey,
            PANDORA_PROTOCOL.KAD.helpers.BufferUtils.genBuffer( 64 ),
            Buffer.alloc(64), //empty signature
            true,
        ]

        const pandoraProtocolNode = new PANDORA_PROTOCOL.PandoraProtocolNode(
            [ ],
            contact,
            store,
            undefined,
            '',
        )

        pandoraProtocolNode.contact.privateKey = privateKey
        pandoraProtocolNode.contact.identity = pandoraProtocolNode.contact.computeContactIdentity();
        pandoraProtocolNode.contact.signature = pandoraProtocolNode.contact.sign( );

        window.PANDORA_PROTOCOL_NODE = pandoraProtocolNode;

    }

}
</script>