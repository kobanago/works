Vue.createApp({
    data(){
        return{
            disp:"start",
            typingWord:"",
            wordsList:[
                'egg',
                'bag',
                'rose',
                'chair',
                'bat',
                'fish',
                'notebook',
                'pencil',
                'dog',
                'desk'
            ],
            solvedWordsList:[],
            limit:10,
            btnPushCntList:[],
            displays:[
                {
                    dispName:"start",
                    title:"START!",
                    btnVal:"タイピング開始",
                    path:"./img/figure_presentation.png"
                },
                {
                    dispName:"clear",
                    title:"CLEAR!!",
                    btnVal:"もう一度挑戦",
                    path:"./img/figure_goal.png"
                },
                {
                    dispName:"over",
                    title:"GAME OVER...",
                    btnVal:"リトライ",
                    path:"./img/figure_devastated.png"
                }
            ],
            playDispBgColer:"rgba(0, 255, 0, 0.6)"
        }
    },
    computed:{
        tgtWord(){
            const unsolvedWordsList = this.wordsList.filter((word) => {
                return (!this.solvedWordsList.includes(word));
            });
            const idx = Math.floor(Math.random() * unsolvedWordsList.length);
            return unsolvedWordsList[idx];
        },
        tgtWordNum(){
            return this.solvedWordsList.length + 1;
        },
        isCorrect(){
            if (this.typingWord !== this.tgtWord) {
                return (this.typingWord === this.tgtWord.slice(0, this.typingWord.length));
            }
            this.solvedWordsList.push(this.tgtWord);
            this.typingInit();    
            if (this.wordsList.length === this.solvedWordsList.length) {
                //最終問題のカウントダウンを終了させる
                this.stopCountDown();
                this.solvedWordsList = [];
                this.changeDisp("clear");
            }
            return true;
        }
    },
    methods:{
        start(){
            this.changeDisp("playing");
            this.solvedWordsList = [];

            this.$nextTick(() => {
                this.$refs.inputText.focus();
                this.typingInit();
            })
        },
        setCount(){
            const interval = 1000;
            this.limit = 10;
            this.playDispBgColer = "rgba(0, 255, 0, 0.6)"
            let timer;
            
            this.stopCountDown();
            const countDown = () =>{
                this.changeBgColor();
                this.limit--;
                
                if (this.limit <= 0) {
                    clearInterval(timer);
                    this.changeDisp("over");
                }
            }
            this.btnPushCntList.push(timer = setInterval(countDown,interval));
        },
        stopCountDown(){
            if(this.btnPushCntList.length !== 0){
                clearInterval(this.btnPushCntList.shift());
            }
        },
        changeBgColor(){
            const tgtColor = this.playDispBgColer.replace(/rgba|\(|\)/g, '').split(", "); 
            tgtColor[0] = Number(tgtColor[0]) + (255/10);
            tgtColor[1] = Number(tgtColor[1]) - (255/10);
            this.playDispBgColer = `rgba(${tgtColor[0]}, ${tgtColor[1]}, 0, 0.5)`;
            this.$refs.playDisp.style.backgroundColor = this.playDispBgColer;
        },
        typingInit(){
            this.typingWord = "";
            this.setCount();
            this.changeBgColor();
        },
        changeDisp(tgtDisp){
            this.disp = tgtDisp;
        }
    }
}).mount("#app")
