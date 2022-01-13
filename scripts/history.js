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
        let history = this.history;

        for( let key in history ){
            let data = history[key];
            let str = `<tr>
                        <td>${data['create_date']}</td>
                        <td class="move" data-key="${data['url']}" style="cursor: pointer;">${data['searchType']} - >${data['txt']}</a></td>
                       </tr>`;
            $("#historyList").append(str);
        };
    }
    async initHistory()
    {
         await chrome.storage.sync.clear();
         $("#historyList").empty();
    }
};

