class historyJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    async initControl()
    {
        let history = await chrome.storage.sync.get("history");
        history = history["history"] || [];
        console.log(history)

    }
    initEvent()
    {
        
    }
};

