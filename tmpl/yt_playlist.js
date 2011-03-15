(function() {

     function init() {
	 bindThumbnails();
	 bindPager();    
     }

     function bindThumbnails() {
	 var playlist = document.getElementById('yt-playlistitems');
	 var i = playlist.children.length;
	 while(i--) {
	     var li = playlist.children[i];
	     var k = li.children.length;
	     while(k--) {
		 var child = li.children[k];
		 bind(child, 'click', loadVideo);
	     }
	 }
     }

     function bindPager() {
	 bindBack();
	 bindNext();
	 bindPage();
     }

     function bindBack() {
	 var back = document.getElementById('yt-paging').children[0];
	 bind(back, 'click', function() {
		  var pages = document.getElementById('yt-paging').children[1];
		  var i = pages.children.length;
		  while(i--) {
		      var child = pages.children[i];
		      if (child.getAttribute('class')==='active') {
			  setPage(parseInt(child.innerHTML) - 1);
			  child.setAttribute('class', '');
			  if (child.previousElementSibling) {
			      child.previousElementSibling.setAttribute('class', 'active');
			  }
			  break;
		      }
		  }
	      });
     }

     function bindNext() {
	 var next = document.getElementById('yt-paging').children[2];
	 bind(next, 'click', function() {
		  var pages = document.getElementById('yt-paging').children[1];
		  var i = pages.children.length;
		  while(i--) {
		      var child = pages.children[i];
		      if (child.getAttribute('class')==='active') {
			  setPage(parseInt(child.innerHTML) + 1);
			  child.setAttribute('class', '');
			  if (child.nextElementSibling) {
			      child.nextElementSibling.setAttribute('class', 'active');
			  }
		      }
		  }
	      });
     }

     function bindPage() {
	 var pages = document.getElementById('yt-paging').children[1];
	 var i = pages.children.length;
	 while(i--) {
	     var page = pages.children[i];
	     bind(page, 'click', gotoPage);
	 }
     }

     function gotoPage() {
	 var page_number = this.innerHTML;
	 var parent = this.parentNode;
	 var i = parent.children.length;
	 while (i--) {
	     var child = parent.children[i];
	     if (child == this) {
		 child.setAttribute('class', 'active');
	     } else {
		 child.setAttribute('class', '');
	     }
	 }
	 setPage(page_number);
     }

     var page_length = false;
     function setPage(num) {
	 var ul = document.getElementById('yt-playlistitems');
	 var total = ul.children.length;

	 var pages = document.getElementById('yt-paging').children[1];
	 var num_pages = pages.children.length;

	 if (!page_length) {
             page_length = 0;
             var i = total;
             while(i--) {
		 var li = ul.children[i];
		 if (li.getAttribute('style') !== 'display:none;') {
                     page_length++;
		 }
             }
	 }

	 var i = total;
	 var active = 0;
	 var first = true;
	 while (i--) {
	     var child = ul.children[i];
	     var range = num * page_length;
	     if (num == num_pages && first) {
		 active = page_length - ((num_pages * page_length) - total);
	     } else if (i == range-1) {
		 active = page_length;
	     }
	     if (active > 0) {
		 child.setAttribute('style', '');
		 active--;
	     } else {
		 child.setAttribute('style', 'display:none;');
	     }
	     first = false;
	 }

	 var paging = document.getElementById('yt-paging');
	 if (num == 1) {
	     paging.children[0].children[0].setAttribute('style', 'display:none;');
	 } else {
	     paging.children[0].children[0].setAttribute('style', '');
	 }
	 if (num == num_pages) {
	     paging.children[2].children[0].setAttribute('style', 'display:none;');
	 } else {
	     paging.children[2].children[0].setAttribute('style', '');
	 }

     }

     function loadVideo() {
	 var parent = this.parentNode;
	 var yt_id = parent.attributes.getNamedItem('data-id').value;

	 var i = parent.parentNode.children.length;
	 while (i--) {
	     var child = parent.parentNode.children[i];
	     if (child == parent) {
		 child.setAttribute('class', 'active');
	     } else {
		 child.setAttribute('class', '');
	     }
	 }

	 var player_frame = document.getElementById('yt-player').children[0];
	 player_frame.src = 'http://www.youtube.com/embed/' + yt_id + '?wmode=transparent';

	 var title = document.getElementById('yt-player').children[1];
	 title.innerHTML = parent.children[0].children[0].children[1].innerHTML;

	 return false;
     }

     function bind(obj, evType, fn){ 
	 if (obj.addEventListener){ 
	     obj.addEventListener(evType, fn, false); 
	     return true; 
	 } else if (obj.attachEvent){ 
	     var r = obj.attachEvent("on"+evType, fn); 
	     return r; 
	 } else { 
	     return false; 
	 } 
     }

     bind(window, 'load', init);

 })();