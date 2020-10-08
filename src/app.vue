<template>
    <div>
        <div v-if="!$store.state.pandoraProtocol.ready">

            <span>Initializing Pandora Protocol...</span>

        </div>
        <div v-else>

            <h2>Demo Research Dashboard</h2>

            <div style="padding-bottom: 20px">
                <router-link to="/bootstrap">Bootstrap</router-link>
                <router-link to="/find">Find</router-link>
                <router-link to="/boxes">Boxes</router-link>
                <router-link to="/seed">Seed</router-link>
                <router-link to="/info">Info</router-link>
            </div>

            <router-view></router-view>

            <div style="padding-top: 20px">
                <span>
                    PandoraProtocol ({{$store.state.pandoraProtocol.options.VERSION.APP}}) - v{{$store.state.pandoraProtocol.options.VERSION.VERSION}} [ >= {{$store.state.pandoraProtocol.options.VERSION.VERSION_COMPATIBILITY}}]
                </span>
            </div>

            <div style="padding-top: 20px">
                <p style="color: gray; font-size: 10px">
                    Disclaimer:

                    This source code is released for educational and research purposes only, with the intent of researching
                    and studying a decentralized p2p protocol for binary data streams. You may not use this source code for
                    any illegal or unethical purpose; including activities which would give rise to criminal or civil liability.
                </p>
            </div>

        </div>

        <sybil-protect-sign-modal ref="refSybilProtectSignModal" />

    </div>
</template>

<script>

import SybilProtectSignModal from "src/components/sybil-protect-sign-modal/sybil-protect-sign.modal"
import Vue from "vue";

export default {

    components: {SybilProtectSignModal},

    async created(){

        const sybilKeys = {
            publicKey: Buffer.from("049cf62611922a64575439fd14e0a1190c40184c4d20a1c7179828693d574e84b94b70c3f3995b7a2cd826e1e8ef9eb8ccf90e578891ecfe10de6a4dc9371cd19a", 'hex'),
            uri: 'http://pandoraprotocol.ddns.net:9090/challenge/',
            origin: 'http://pandoraprotocol.ddns.net:9090',
        }

        PANDORA_PROTOCOL.KAD.init({
            PLUGINS:{
                CONTACT_SYBIL_PROTECT: {
                    SYBIL_PUBLIC_KEYS: [ sybilKeys ],
                }
            }
        });

        PANDORA_PROTOCOL.init({});

        const node = new PANDORA_PROTOCOL.PandoraProtocolNode( '' );

        node.sybilProtectSigner.openWindow = ({origin, uri, promise, message, resolve, reject}) => {
            this.$refs['refSybilProtectSignModal'].showModal(null, origin, uri, message, promise, resolve, reject);
        }

        node.sybilProtectSigner.onCloseWindow = () => {
            this.$refs['refSybilProtectSignModal'].hideModal();
        }

        await node.start();

        this.$store.dispatch('pandoraProtocolChangeOptions', KAD_OPTIONS )
        this.$store.dispatch('pandoraProtocolChangeContact', node.contact )
        this.$store.dispatch('pandoraProtocolChangeReady', true)

        window.PANDORA_PROTOCOL_NODE = node;

        for (const key in node.pandoraBoxes._boxesMap)
            this.$store.dispatch('pandoraBoxesAdd', {pandoraBox: node.pandoraBoxes._boxesMap[key], stored: true} )

        node.pandoraBoxes.on('pandora-box/added', pandoraBox => this.$store.dispatch('pandoraBoxesAdd', {pandoraBox, stored: true} ) )

        node.pandoraBoxes.on('pandora-box/chunks/total-available', ({pandoraBox}) => this.$store.dispatch('pandoraBoxesUpdatePercent', pandoraBox) )

        node.pandoraBoxes.on('pandora-box-meta/updated-sybil', pandoraBoxMeta => this.$store.dispatch('pandoraBoxMetasUpdate', pandoraBoxMeta) )

        node.pandoraBoxes.on('pandora-box-meta/crawler/store/count-operations', data => this.$store.dispatch('pandoraBoxMetasCrawlerStoringCountOperationsUpdate', data) )
        node.pandoraBoxes.on('pandora-box-meta/crawler/store/by-hash', data => this.$store.dispatch('pandoraBoxMetasCrawlerStoringOperationsIndexUpdate', data) )
        node.pandoraBoxes.on('pandora-box/crawler/store/by-hash', data => this.$store.dispatch('pandoraBoxMetasCrawlerStoringOperationsIndexUpdate', data) )
        node.pandoraBoxes.on('pandora-box-meta/crawler/store/merge-by-hash', data => this.$store.dispatch('pandoraBoxMetasCrawlerStoringOperationsIndexUpdate', data) )
        node.pandoraBoxes.on('pandora-box-meta/crawler/store/by-name', data => this.$store.dispatch('pandoraBoxMetasCrawlerStoringOperationsIndexUpdate', data) )

        node.pandoraBoxes.on('stream/chunk/done', ({stream})=> this.$store.dispatch('pandoraBoxStreamsUpdate', stream) );
        node.pandoraBoxes.on('stream/done', ({stream})=> this.$store.dispatch('pandoraBoxStreamsUpdate', stream) );


    }

}
</script>

<style>

    .bold{
        font-weight: bold;
    }

    .action{
        font-weight: bold;
        cursor: pointer;
    }

    .block{
        display: block;
        margin-bottom: 20px
    }

    span{
        font-size: 14px
    }

    p{
        font-size: 8px;
    }

    h1{
        font-size: 20px
    }

    h2{
        font-size: 18px;
    }

    h3{
        font-size: 15px;
    }

</style>