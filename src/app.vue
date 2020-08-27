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
                    SYBIL_PUBLIC_KEYS: [ sybilKeys ],
                }
            }
        });

        PANDORA_PROTOCOL.init({});

        const node = new PANDORA_PROTOCOL.PandoraProtocolNode( '' );

        node.start( { } ).then((out)=>{

            this.$store.dispatch('pandoraProtocolChangeOptions', KAD_OPTIONS )
            this.$store.dispatch('pandoraProtocolChangeContact', node.contact )
            this.$store.dispatch('pandoraProtocolChangeReady', true)

        })

        window.PANDORA_PROTOCOL_NODE = node;


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