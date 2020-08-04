<template>
    <div>

        <h2>Demo Dashboard</h2>

        <div style="padding-bottom: 20px">
            <router-link to="/bootstrap">Bootstrap</router-link>
            <router-link to="/find">Find</router-link>
            <router-link to="/boxes">Boxes</router-link>
        </div>

        <router-view></router-view>

        <p>
            This source code is released for educational and research purposes only, with the intent of researching
            and studying a decentralized p2p protocol for binary data streams. You may not use this source code for
            any illegal or unethical purpose; including activities which would give rise to criminal or civil liability.
        </p>

    </div>
</template>

<script>
export default {

    created(){

        const sybilKeys = {
            privateKey: Buffer.from("b485c3728923b3cc3ad88d8b10c69b3c68818594ca0d213542caad212fa7c063", 'hex'),
            publicKey: Buffer.from("04e67b866b907ad108d1bb1fbddf2672dfe96c8f1e24a9f922f57e330eca7ab1af821a40e4a29594df1e014083ab2112c5a3d1f1333c7717b7e73d63cea7feeef8", 'hex'),
        }

        PANDORA_PROTOCOL.KAD.init({
            PLUGINS:{
                CONTACT_SYBIL_PROTECT: {
                    SYBIL_PUBLIC_KEYS: [ sybilKeys.publicKey ],
                }
            }
        });
        PANDORA_PROTOCOL.init({});

        const protocol = PANDORA_PROTOCOL.KAD.ContactAddressProtocolType.CONTACT_ADDRESS_PROTOCOL_TYPE_WEBSOCKET;
        const store = new PANDORA_PROTOCOL.KAD.storage.StoreMemory();

        const privateKey = PANDORA_PROTOCOL.KAD.helpers.ECCUtils.createPrivateKey();
        const publicKey = PANDORA_PROTOCOL.KAD.helpers.ECCUtils.getPublicKey(privateKey);

        const sybilSignature = PANDORA_PROTOCOL.KAD.helpers.ECCUtils.sign( sybilKeys.privateKey,  KAD.helpers.CryptoUtils.sha256( publicKey ) );
        const nonce = Buffer.concat([
            Buffer.from("00", "hex"),
            sybilSignature,
        ]);

        const contact = [
            KAD_OPTIONS.VERSION.APP,
            KAD_OPTIONS.VERSION.VERSION,
            Buffer.alloc( KAD_OPTIONS.NODE_ID_LENGTH ), //empty identity
            protocol,
            '127.0.0.1',
            80,
            '',
            publicKey,
            nonce,
            Math.floor(new Date().getTime() / 1000),
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
        //pandoraProtocolNode.contact.identity = KAD.helpers.BufferUtils.genBuffer(global.KAD_OPTIONS.NODE_ID_LENGTH);
        pandoraProtocolNode.contact.identity = pandoraProtocolNode.contact.computeContactIdentity();
        pandoraProtocolNode.contact.signature = pandoraProtocolNode.contact.sign( );

        pandoraProtocolNode.start();

        window.PANDORA_PROTOCOL_NODE = pandoraProtocolNode;


    }

}
</script>