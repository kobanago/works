Vue.createApp({
    created() {
        this.interval = setInterval(() => {
            this.current = (this.current + 1) % this.components.length;
        },3000);
    },
    brforeUnmount() {
        clearInterval(this.interval);
    },
    computed : {
        currentBanner(){
            return "banner-" + this.components[this.current];
        }
    },
    data() {
        return {
            current : 0,
            components : ["member", "new", "envs"]
        }
    }
})
.component("tab-member", {
        template : `
        <div class="tab">
            <h3>WINGSメンバー募集</h3>
            <p>あなたもプロジェクトに参加しませんか？<br>
            現在、WINGSプロジェクトでは一緒に仕事ができる仲間を募集中です</p>
        </div>`
})
.component("tab-new", {
    template : `
    <div class="tab">
        <h3>新規プロジェクト稼働</h3>
        <p>この夏新たなプロジェクトが始動しました！<br>
        現在、WINGSプロジェクトでは一緒に仕事ができる仲間を募集中です</p>
    </div>`
})
.component("tab-envs", {
    template : `
    <div class="tab">
        <h3>環境構築設定</h3>
        <p>この度のプロジェクトにて設定された環境にて<br>
        現在、WINGSプロジェクトでは一緒に仕事ができる仲間を募集中です</p>
    </div>`
})
.mount("#app");
