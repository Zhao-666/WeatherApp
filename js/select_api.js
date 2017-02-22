window.onload = function() {
	var url = window.location;

	function getUrlParam(url, name) {
		var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
		var matcher = pattern.exec(url);
		var items = null;
		if(matcher != null) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch(e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch(e) {
					items = matcher[1];
				}
			}
		}
		return items;
	}
	var id1 = getUrlParam(url, 'id');
	var city = getUrlParam(url, 'city');

	$('#div2').append(city);
	$.ajax({
		url: 'https://free-api.heweather.com/v5/forecast',
		type: 'get',
		data: {
			'city': city,
			'key': '8f9d139fce8d40758cb328c84cda4156'
		},
		dataType: 'json',
		success: function(data) {
			if(data) {
				var html = '<table cellpadding="10" cellspacing="10" align="center"><tr height="5"><td>预报</td><td>明天预报</td><td>最高温</td><td>最低温</td></tr>';
				var dataList = data.HeWeather5[0].daily_forecast;
				for(var i = 0; i < dataList.length; i++) {
					var dataItem = dataList[i];
					var itemDate = dataItem.date;
					var itemCond = dataItem.cond.txt_d;
					var itemMax = dataItem.tmp.max;
					var itemMin = dataItem.tmp.min;
					html += '<tr height="10">';
					html += '<td>' + itemDate + '</td>';
					html += '<td>' + itemCond + '</td>';
					html += '<td>' + itemMax + '</td>';
					html += '<td>' + itemMin + '</td>';
					html += '</tr>';
				}
				html += '</table>';
				$('#div4').append(html);
			}
		},
		error: function() {
			alert("系统升级中");
		}
	});
}