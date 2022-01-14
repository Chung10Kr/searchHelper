class historyJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    async initControl()
    {
        await this.getHistory();
        this.renderHistory();
    }
    initEvent()
    {
        let self = this;
        $(document).on("click",".move",function(e){
            let l = $(this).attr('data-key');
            chrome.tabs.create({ url: l, active: true }); 
        });
        $("#initHistory").click(async function(e){
            await self.initHistory();
        });
        $("#searchHistory").keyup(function(e){
            let txt = $(this).val();
            !txt ? self.renderHistory() : self.searchHistory( txt );
        })
    }
    async getHistory()
    {
        let history = await chrome.storage.sync.get("history");
        if( JSON.stringify(history) == "{}" ) return false;
        this.history = history['history'];
    }
    renderHistory()
    {
        let self = this;
        $("#historyList").empty();
        let history = this.history;
        history.reverse();
        history.map((data)=>{
            let str = self.getHtml(data);
            $("#historyList").append(str);
        });
    }
    searchHistory(txt)
    {
        let self = this;
        $("#historyList").empty();
        let history = this.history;
        
        history.reverse();
        history.map((data)=>{
            if( data['txt'].indexOf(txt) != -1 ) return false;
            let str = self.getHtml(data);
            $("#historyList").append(str);
        });
    }
    getHtml(data)
    {
        let self = this;

        return `<div class="historyItem">
                    <span class="move" data-key="${data['url']}" style="cursor: pointer;">
                    ${data['create_date']}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src="../resource/images/${self.getIcon(data['searchType'])}"></img>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ${ data['txt'].substr(0, 50) }... &nbsp;&nbsp;-&nbsp; ${data['searchType']} Search
                    </span>
                </div>`;
    }
    getIcon(type)
    {
        switch(type){
            case "google": return "google.svg"; 
            case "youtube": return "youtube.svg";
            case "github": return "github.svg";
            case "naver": return "naver.png";
            case "daum": return "daum.webp";
            case "yahoo": return "yahoo.jpeg";
        };
    }
    async initHistory()
    {
         await chrome.storage.sync.clear();
         $("#historyList").empty();
    }
};

