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
        $("#historyList").empty();
        let history = this.history;
        history.reverse();
        history.map((data)=>{
            let str = `<tr>
                        <td>${data['create_date']}</td>
                        <td class="move" data-key="${data['url']}" style="cursor: pointer;">${data['searchType']} - >${data['txt']}</a></td>
                       </tr>`;
            $("#historyList").append(str);
        });
    }
    searchHistory(txt)
    {
        $("#historyList").empty();
        let history = this.history;
        
        history.reverse();
        history.map((data)=>{
            if( data['txt'].indexOf(txt) == -1 ) return false;
            let str = `<tr>
                        <td>${data['create_date']}</td>
                        <td class="move" data-key="${data['url']}" style="cursor: pointer;">${data['searchType']} - >${data['txt']}</a></td>
                       </tr>`;
            $("#historyList").append(str);
        });
    }
    async initHistory()
    {
         await chrome.storage.sync.clear();
         $("#historyList").empty();
    }
};

