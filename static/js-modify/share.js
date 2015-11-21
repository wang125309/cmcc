$(function(){
    $.post("/wx/portal/wxconfig/",{
		"url":location.href
	},function(data){
		wx.config(data);
        var share = function() {
            shareJson = {
                link:"http://cmcc.qingdianer.com",
                imgUrl:"http://cmcc.qingdianer.com/static/image/share-image.jpg",
                title:'“一字千金”中国移动征名活动来啦~',
                desc:'“一字千金”中国移动征名活动来啦~'

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
