/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("calendar",function(e,t){function b(){b.superclass.constructor.apply(this,arguments)}var n=e.ClassNameManager.getClassName,r="calendar",i=40,s=38,o=37,u=39,a=13,f=32,l=n(r,"day-selected"),c=n(r,"day-highlighted"),h=n(r,"day"),p=n(r,"prevmonth-day"),d=n(r,"nextmonth-day"),v=n(r,"grid"),m=e.DataType.Date,g=n(r,"pane"),y=e.UA.os;e.Calendar=e.extend(b,e.CalendarBase,{_keyEvents:[],_highlightedDateNode:null,_lastSelectedDate:null,initializer:function(){this.plug(e.Plugin.CalendarNavigator),this._keyEvents=[],this._highlightedDateNode=null,this._lastSelectedDate=null},_bindCalendarEvents:function(){var e=this.get("contentBox"),t=e.one("."+g);t.on("selectstart",this._preventSelectionStart),t.delegate("click",this._clickCalendar,"."+h+", ."+p+", ."+d,this),t.delegate("keydown",this._keydownCalendar,"."+v,this),t.delegate("focus",this._focusCalendarGrid,"."+v,this),t.delegate("focus",this._focusCalendarCell,"."+h,this),t.delegate("blur",this._blurCalendarGrid,"."+v+",."+h,this)},_preventSelectionStart:function(e){e.preventDefault()},_highlightDateNode:function(e){this._unhighlightCurrentDateNode();var t=this._dateToNode(e);t.focus(),t.addClass(c)},_unhighlightCurrentDateNode:function(){var e=this.get("contentBox").all("."+c);e&&e.removeClass(c)},_getGridNumber:function(e){var t=e.get("id").split("_").reverse();return parseInt(t[0],10)},_blurCalendarGrid:function(){this._unhighlightCurrentDateNode()},_focusCalendarCell:function(e){this._highlightedDateNode=e.target,e.stopPropagation()},_focusCalendarGrid:function(){this._unhighlightCurrentDateNode(),this._highlightedDateNode=null},_keydownCalendar:function(e){var t=this._getGridNumber(e.target),n=this._highlightedDateNode?this._nodeToDate(this._highlightedDateNode):null,r=e.keyCode,c=0,h="",p,d,v,g,y;switch(r){case i:c=7,h="s";break;case s:c=-7,h="n";break;case o:c=-1,h="w";break;case u:c=1,h="e";break;case f:case a:e.preventDefault();if(this._highlightedDateNode){p=this.get("selectionMode");if(p==="single"&&!this._highlightedDateNode.hasClass(l))this._clearSelection(!0),this._addDateToSelection(n);else if(p==="multiple"||p==="multiple-sticky")this._highlightedDateNode.hasClass(l)?this._removeDateFromSelection(n):this._addDateToSelection(n)}}if(r===i||r===s||r===o||r===u)n||(n=m.addMonths(this.get("date"),t),c=0),e.preventDefault(),d=m.addDays(n,c),v=this.get("date"),g=m.addMonths(this.get("date"),this._paneNumber-1),y=new Date(g),g.setDate(m.daysInMonth(g)),m.isInRange(d,v,g)?this._highlightDateNode(d):m.isGreater(v,d)?m.isGreaterOrEqual(this.get("minimumDate"),v)||(this.set("date",m.addMonths(v,-1)),this._highlightDateNode(d)):m.isGreater(d,g)&&(m.isGreaterOrEqual(y,this.get("maximumDate"))||(this.set("date",m.addMonths(v,1)),this._highlightDateNode(d)))},_clickCalendar:function(e){var t=e.currentTarget,n=t.hasClass(h)&&!t.hasClass(p)&&!t.hasClass(d),r=t.hasClass(l),i;switch(this.get("selectionMode")){case"single":n&&(r||(this._clearSelection(!0),this._addDateToSelection(this._nodeToDate(t))));break;case"multiple-sticky":n&&(r?this._removeDateFromSelection(this._nodeToDate(t)):this._addDateToSelection(this._nodeToDate(t)));break;case"multiple":n&&(!e.metaKey&&!e.ctrlKey&&!e.shiftKey?(this._clearSelection(!0),this._lastSelectedDate=this._nodeToDate(t),this._addDateToSelection(this._lastSelectedDate)):(y==="macintosh"&&e.metaKey||y!=="macintosh"&&e.ctrlKey)&&!e.shiftKey?r?(this._removeDateFromSelection(this._nodeToDate(t)),this._lastSelectedDate=null):(this._lastSelectedDate=this._nodeToDate(t),this._addDateToSelection(this._lastSelectedDate)):(y==="macintosh"&&e.metaKey||y!=="macintosh"&&e.ctrlKey)&&e.shiftKey?this._lastSelectedDate?(i=this._nodeToDate(t),this._addDateRangeToSelection(i,this._lastSelectedDate),this._lastSelectedDate=i):(this._lastSelectedDate=this._nodeToDate(t),this._addDateToSelection(this._lastSelectedDate)):e.shiftKey&&(this._lastSelectedDate?(i=this._nodeToDate(t),this._clearSelection(!0),this._addDateRangeToSelection(i,this._lastSelectedDate),this._lastSelectedDate=i):(this._clearSelection(!0),this._lastSelectedDate=this._nodeToDate(t),this._addDateToSelection(this._lastSelectedDate))))}n?this.fire("dateClick",{cell:t,date:this._nodeToDate(t)}):t.hasClass(p)?this.fire("prevMonthClick"):t.hasClass(d)&&this.fire("nextMonthClick")},subtractMonth:function(e){return this.set("date",m.addMonths(this.get("date"),-1)),e&&e.halt(),this},subtractYear:function(e){return this.set("date",m.addYears(this.get("date"),-1)),e&&e.halt(),this},addMonth:function(e){return this.set("date",m.addMonths(this.get("date"),1)),e&&e.halt(),this},addYear:function(e){return this.set("date",m.addYears(this.get("date"),1)),e&&e.halt(),this}},{NAME:"calendar",ATTRS:{selectionMode:{value:"single"},date:{value:new Date,lazyAdd:!1,setter:function(e){var t=this._normalizeDate(e),n=m.addMonths(t,this._paneNumber-1),r=this.get("minimumDate"),i=this.get("maximumDate"),s;if((!r||m.isGreaterOrEqual(t,r))&&(!i||m.isGreaterOrEqual(i,n)))return t;if(r&&m.isGreater(r,t))return r;if(i&&m.isGreater(n,i))return s=m.addMonths(i,-1*(this._paneNumber-1)),s}},minimumDate:{value:null,setter:function(e){if(e){var t=this.get("date"),n=this._normalizeDate(e);return t&&!m.isGreaterOrEqual(t,n)&&this.set("date",n),n}return this._normalizeDate(e)}},maximumDate:{value:null,setter:function(e){if(e){var t=this.get("date"),n=this._normalizeDate(e);return t&&!m.isGreaterOrEqual(e,m.addMonths(t,this._paneNumber-1))&&this.set("date",m.addMonths(n,-1*(this._paneNumber-1))),n}return e}}}})},"3.9.1",{requires:["calendar-base","calendarnavigator"],lang:["de","en","es","es-AR","fr","it","ja","nb-NO","nl","pt-BR","ru","zh-HANT-TW"],skinnable:!0});