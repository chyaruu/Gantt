gantt.locale.labels.section_description = "專案名稱";
  gantt.locale.labels.section_split = "分標";
  gantt.locale.labels.section_priority = "欄顏色";
  gantt.locale.labels.section_textColor = "字顏色";
  gantt.locale.labels.section_time = "專案開始時間";
  //欄顏色
  var colors = [
	{key: "#3DB9D3", label: "水藍(預設)"},
    {key: "#FFF", label: "白"},
    {key: "#000", label: "黑"},
	{key: "#808A87", label: "灰"},
    {key: "#8A2BE2", label: "紫"},
	{key: "#E3170D", label: "紅"},
    {key: "#FF6100", label: "澄"},
    {key: "#FFA500", label: "黃"},
	{key: "#F0E68C", label: "淡黃"},
	{key: "#DA70D6", label: "淡紫"}
	]

  //字顏色
  var color = [
  {key: "#FFF", label: "白"},
  {key: "#000", label: "黑"}
  ]
  //跳出的框框設定
 	gantt.config.lightbox.sections = [
		{name: "description", height: 30, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[{key:"split", label:"分標"}]},
    {name: "priority", height: 22, map_to: "color", type: "select", options: colors},
		{name: "textColor", height: 22, map_to: "textColor", type: "select", options: color},
		{name: "time", height: 20,type: "time", map_to: "auto"}
	];
  //左邊設定
  gantt.config.columns = [
    {name: "text", label: '項目', resize: true, tree: true, align: 'left' },
    {name: "start_date", label: '專案開始時間', resize: true, align: 'center' },
    {name: "duration", label: '天數', resize: false, align: 'center' },
    {name:"add",        label:"",           width:40 }
  ];
  //+號隱藏
  gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
     return "nested_task"
    }
     return "";
  };


  gantt.config.open_split_tasks = true;
  gantt.locale.labels.section_split = "Display";

  //觀看設定
  gantt.config.scale_unit = 'month'; //"minute", "hour", "day", "week", "quarter", "month", "year"
  gantt.config.scale_height = 60;

  gantt.config.server_utc = true;//換成當地時間

  gantt.config.grid_width = 400;//調整左側寬度

  gantt.config.row_height = 40;//項目空間高度
  gantt.config.task_height = 20;

  gantt.config.date_grid = "%Y/%m/%d";//顯示時間格式
  gantt.config.multiselect = true;
  gantt.config.multiselect_one_level=true;

  gantt.config.order_branch = true;//可以移動排序

	//gantt.locale.labels.section_priority = "Priority";

	gantt.config.date_format="%Y-%m-%d %H:%i";

  //onTaskClick
  gantt.attachEvent('onTaskClick', function (id, e) {
    let target = e.target || e.srcElement;
    if (target.className === 'gantt_tree_content') {
      console.log('點擊task項目區', id);
    }
    else {
      console.log('點擊task進度條區', id);
    }
    return true;
  });

  //onTemplatesReady
  gantt.attachEvent('onTemplatesReady', function () {
  //依照年月日顯示欄位
    gantt.templates.date_scale = function (date) {
        let y = gantt.date.date_to_str("%Y");
        y = y(date);
        let d = gantt.date.date_to_str("%n/%j");
        let md = d(date);
        let cy = '<div style="opacity:0.6; font-size:1.0em; height:15px; line-height:20px;">' + y + '</div>';
        let cd = '<div style="font-size:1.1em; height:15px; line-height:15px;">' + md + '</div>';
        return '<div style="padding:10px 0px;">' + cy + cd + '</div>';
    };

    //針對週末標注為灰色
    gantt.templates.scale_cell_class = function (date) {
        if (date.getDay() === 0 || date.getDay() === 6) {
            return 'dhtmlxgantt_weekend';
        }
    };

    });

	gantt.init("gantt_here");
