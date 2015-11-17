$(function(){
    $.post("/wx/portal/wxconfig/",{
		"url":location.href
	},function(data){
		wx.config(data);
        var share = function() {
            shareJson = {
                link:"http://fordact.qingdianer.com",
                imgUrl:"http://fordact.qingdianer.com/static/image/share-image.jpg",
                title:"长安福特2015广州车展",
                desc:"长安福特2015广州车展"

            };
			wx.onMenuShareTimeline(shareJson);
			wx.onMenuShareAppMessage(shareJson);
        };
		wx.ready(function(){
            share();    
        });
		wx.error(function(res){
			$.get("/wx/portal/update_access_token/",function(data){
				$.post("/wx/portal/wxconfig/",{
					"url":location.href
				},function(data){
					wx.config(data);
					wx.ready(function(){
		                share();
                    });
		        });
		    });
        });
    });
});
